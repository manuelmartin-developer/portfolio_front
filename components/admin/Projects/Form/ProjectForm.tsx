import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import styles from "./ProjectForm.module.scss";

import ConfirmTooltip from "../../../UI/Tooltips/ConfirmTooltip";
import { useCursorStore } from "../../../../store/cursorStore";
import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { Project, ProjectImage } from "../AdminProjects";
import { Category } from "../../Categories/AdminCategories";

enum FileType {
  GALLERY = "gallery",
  FEATURED = "featuredImage"
}

const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "Ionic",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Sass",
  "Material UI",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "TensorFlow",
  "OpenAI",
  "Docker",
  "Mapbox"
];

const ProjectForm: React.FC<{
  isEditingProject: boolean;
  setIsEditingProject: React.Dispatch<React.SetStateAction<boolean>>;
  projectInFocus: Project | null;
  isAddingProject: boolean;
  setIsAddingProject: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  isEditingProject,
  setIsEditingProject,
  projectInFocus,
  isAddingProject,
  setIsAddingProject
}) => {
  // Component states
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    {
      name: string;
      code: number;
    }[]
  >();
  const [selectedTechnologies, setSelectedTechnologies] = useState<
    {
      name: string;
      code: string;
    }[]
  >();
  const [featuredImage, setFeaturedImage] = useState<ProjectImage>();
  const [gallery, setGallery] = useState<ProjectImage[]>([]);
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [isSideProject, setIsSideProject] = useState<boolean>(true);
  const [hasComponent, setHasComponent] = useState<boolean>(false);
  const [paragraphsCount, setParagraphsCount] = useState<number>(1);

  //Store
  const { setCursorVariant } = useCursorStore();

  // Hooks
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const animatedComponents = makeAnimated();

  const {
    getRootProps: getRootPropsGallery,
    getInputProps: getInputPropsGallery,
    isDragAccept: isDragAcceptImage,
    isDragActive: isDragActiveImage
  } = useDropzone({
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      onUploadFile(FileType.GALLERY, undefined, acceptedFiles);
    }
  });

  const {
    getRootProps: getRootPropsFeaturedImage,
    getInputProps: getInputPropsFeaturedImage,
    isDragAccept: isDragAcceptFeaturedImage,
    isDragActive: isDragActiveFeaturedImage
  } = useDropzone({
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: false,
    disabled: featuredImage ? true : false,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file: File) => {
        onUploadFile(FileType.FEATURED, file);
      });
    }
  });

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm();

  //   Methods
  const onGetProjectCategories = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories/?type=project`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        enqueueSnackbar(errorData.message || "Ha ocurrido un error", {
          variant: "error"
        });
      }
    }
  };

  const onUpdateProject = async (data: any) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectInFocus?.code}`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const payload = {
      ...data,
      categories: selectedCategories,
      paragraphs: Array.from(
        { length: paragraphsCount },
        (_, index) => data.paragraphs[index]
      ),
      technologies: selectedTechnologies,
      isDraft,
      isSideProject,
      hasComponent
    };

    try {
      const response = await axios.put(URL, payload, config);
      if (response.status === 200) {
        enqueueSnackbar("Proyecto actualizado", { variant: "success" });
        setIsAddingProject(false);
        setIsEditingProject(false);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        enqueueSnackbar(
          errorData.errorData?.message || "Ha ocurrido un error",
          { variant: "error" }
        );
      }
    }
  };

  const onUploadFile = async (type: FileType, file?: File, files?: File[]) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/files/projects/${projectInFocus?.code}/`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    enqueueSnackbar("Subiendo archivos...", {
      variant: "info",
      persist: true,
      key: "uploading"
    });
    try {
      const formData = new FormData();
      formData.append("type", type);
      type === FileType.FEATURED &&
        file &&
        formData.append("featuredImage", file as File);
      type === FileType.GALLERY &&
        files &&
        files.length > 0 &&
        files.forEach((f) => formData.append("gallery", f));
      const response = await axios.post(URL, formData, config);

      if (response.status === 201) {
        closeSnackbar("uploading");
        enqueueSnackbar("Archivo subido", {
          variant: "success"
        });
        type === FileType.GALLERY && setGallery(response.data.file.gallery);
        type === FileType.FEATURED &&
          setFeaturedImage(response.data.file.featuredImage);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        closeSnackbar("uploading");
        enqueueSnackbar(errorData?.message || "Ha ocurrido un error", {
          variant: "error"
        });
      }
    }
  };

  const onHandleCancel = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectInFocus?.code}`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.delete(URL, config);
      if (response.status === 200) {
        enqueueSnackbar("Proyecto eliminado", { variant: "success" });
        setIsAddingProject(false);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        enqueueSnackbar(
          errorData.errorData?.message || "Ha ocurrido un error",
          { variant: "error" }
        );
      }
    }
  };

  const onDeleteFile = async (type: FileType, url: string) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/files/projects/${projectInFocus?.code}/`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const payload = {
      url,
      type
    };
    enqueueSnackbar("Eliminando archivo...", {
      variant: "info",
      persist: true,
      key: "deleting"
    });

    try {
      const response = await axios.delete(URL, { ...config, data: payload });

      if (response.status === 200) {
        closeSnackbar("deleting");
        enqueueSnackbar("Archivo eliminado", {
          variant: "success"
        });
        type === FileType.GALLERY && setGallery(response.data.file.gallery);
        type === FileType.FEATURED &&
          setFeaturedImage(response.data.file.featuredImage);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        closeSnackbar("deleting");
        enqueueSnackbar(
          errorData.errorData?.message || "Ha ocurrido un error",
          {
            variant: "error"
          }
        );
      }
    }
  };

  const onEnterButton = () => {
    setCursorVariant("dot");
  };

  const onLeave = () => {
    setCursorVariant("default");
  };

  // Component lifecycle
  useEffect(() => {
    if (!isEditingProject || !projectInFocus) return;
    setValue("title", projectInFocus.title);
    setSelectedCategories(projectInFocus.categories);
    setValue("backgroundColor", projectInFocus.backgroundColor);
    setValue("color", projectInFocus.color);
    setValue("url", projectInFocus.url);
    setValue("role", projectInFocus.role);
    setParagraphsCount(projectInFocus.paragraphs.length);
    Array.from({ length: projectInFocus.paragraphs.length }).forEach(
      (_, index) => {
        setValue(`paragraphs.${index}`, projectInFocus.paragraphs[index]);
      }
    );
    setSelectedTechnologies(projectInFocus.technologies);
    setIsDraft(projectInFocus.isDraft);
    setIsSideProject(projectInFocus.isSideProject);
    setHasComponent(projectInFocus.hasComponent);
    setFeaturedImage(projectInFocus.featuredImage);
    setGallery(projectInFocus.gallery);
  }, [isEditingProject, projectInFocus]);

  useEffect(() => {
    onGetProjectCategories();
  }, []);

  return (
    <div className={styles.projectForm}>
      <div className={styles.projectForm_form}>
        <form
          className={styles.projectForm_form__form}
          onSubmit={handleSubmit(onUpdateProject)}
        >
          <div className={styles.formContainer}>
            <input
              type="text"
              className={`${styles.input} ${errors.title ? styles.error : ""}`}
              placeholder="Título"
              {...register("title", { required: true })}
            />
            <AnimatePresence mode="wait">
              {errors.title && (
                <motion.p
                  key="error"
                  className={styles.formContainer__error}
                  initial={{ opacity: 0, y: -10 }}
                  exit={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  El título es obligatorio
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.formContainer}>
            <Select
              className={`multi-select ${
                isSubmitted && !selectedCategories?.length ? "error" : ""
              }`}
              classNamePrefix="multi-select"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              value={
                selectedCategories &&
                selectedCategories.length > 0 &&
                selectedCategories?.map((category) => ({
                  label: category.name,
                  value: category.code
                }))
              }
              options={categories.map((category) => ({
                label: category.name,
                value: category.id_category
              }))}
              placeholder="Categorías"
              onChange={(selected) => {
                const categories = selected.map((category: any) => {
                  return {
                    name: category.label,
                    code: category.value
                  };
                });
                setSelectedCategories(categories);
              }}
            />
            <AnimatePresence mode="wait">
              {isSubmitted &&
                (!selectedCategories || selectedCategories?.length === 0) && (
                  <motion.p
                    key="error"
                    className={styles.formContainer__error}
                    initial={{ opacity: 0, y: -10 }}
                    exit={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Selecciona al menos una categoría
                  </motion.p>
                )}
            </AnimatePresence>
          </div>
          <div className={`${styles.formGroup} ${styles.formGroup__color}`}>
            <div className={`${styles.formGroup} ${styles.formGroup__color}`}>
              <h4>
                Background <span>({watch("backgroundColor") || "#000"})</span>
              </h4>
              <input
                type="color"
                className={styles.color}
                placeholder="Color de fondo"
                {...register("backgroundColor", { required: true })}
              />
              <AnimatePresence mode="wait">
                {errors.backgroundColor && (
                  <motion.p
                    key="error"
                    className={styles.formContainer__error}
                    initial={{ opacity: 0, y: -10 }}
                    exit={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    El color de fondo es obligatorio
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className={`${styles.formGroup} ${styles.formGroup__color}`}>
              <h4>
                Texto <span>({watch("color") || "#fff"})</span>
              </h4>
              <input
                type="color"
                className={styles.color}
                placeholder="Color de texto"
                {...register("color", { required: true })}
              />
              <AnimatePresence mode="wait">
                {errors.color && (
                  <motion.p
                    key="error"
                    className={styles.formContainer__error}
                    initial={{ opacity: 0, y: -10 }}
                    exit={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    El color de texto es obligatorio
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className={styles.formContainer}>
            <input
              type="text"
              className={`${styles.input} ${errors.url ? styles.error : ""}`}
              placeholder="URL"
              {...register("url", { pattern: /^https?:\/\//i })}
            />
            <AnimatePresence mode="wait">
              {errors.url && errors.url.type === "pattern" && (
                <motion.p
                  key="error"
                  className={styles.formContainer__error}
                  initial={{ opacity: 0, y: -10 }}
                  exit={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  La URL debe empezar por http:// o https://
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <input
            type="text"
            className={styles.input}
            placeholder="Rol"
            {...register("role")}
          />
          <div className={styles.formGroup__paragraphs}>
            <div className={styles.formGroup__paragraphs__buttons}>
              <button
                className={styles.btn}
                type="button"
                onClick={() => {
                  setParagraphsCount(paragraphsCount + 1);
                }}
              >
                +
              </button>
              <button
                className={styles.btn}
                type="button"
                onClick={() => {
                  if (paragraphsCount > 1) {
                    setParagraphsCount(paragraphsCount - 1);
                  }
                }}
              >
                -
              </button>
            </div>
            <div className={styles.formGroup__paragraphs__inputs}>
              <AnimatePresence mode="sync">
                {[...Array(paragraphsCount)].map((_, index) => {
                  return (
                    <motion.textarea
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      key={index}
                      className={styles.input}
                      placeholder="Párrafo"
                      {...register(`paragraphs.${index}`)}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
          <Select
            className={`multi-select ${
              isSubmitted && !selectedTechnologies?.length ? "error" : ""
            }`}
            classNamePrefix="multi-select"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={selectedTechnologies?.map((technology) => ({
              label: technology.name,
              value: technology.code
            }))}
            options={technologies.map((technology) => ({
              label: technology,
              value: technology
            }))}
            placeholder="Tecnologías"
            onChange={(selected) => {
              const technologies = selected.map((technology: any) => {
                return {
                  name: technology.label,
                  code: technology.value
                };
              });
              setSelectedTechnologies(technologies);
            }}
          />
          <div className={styles.formGroup}>
            <div className={styles.formGroup__checkbox}>
              <input
                type="checkbox"
                id="isDraft"
                {...register("isDraft")}
                checked={isDraft}
                onChange={() => {
                  setIsDraft(!isDraft);
                }}
              />
              <label htmlFor="isDraft">Borrador</label>
            </div>
            <div className={styles.formGroup__checkbox}>
              <input
                type="checkbox"
                id="isSideProject"
                {...register("isSideProject")}
                checked={isSideProject}
                onChange={() => {
                  setIsSideProject(!isSideProject);
                }}
              />
              <label htmlFor="isSideProject">Proyecto personal</label>
            </div>
            <div className={styles.formGroup__checkbox}>
              <input
                type="checkbox"
                id="hasComponent"
                {...register("hasComponent")}
                checked={hasComponent}
                onChange={() => {
                  setHasComponent(!hasComponent);
                }}
              />
              <label htmlFor="hasComponent">¿Tiene componente?</label>
            </div>
          </div>
          <div className={styles.projectForm_form__form__footer}>
            {isAddingProject && (
              <ConfirmTooltip
                onConfirm={() => onHandleCancel()}
                confirmText="¿Estás seguro?"
              >
                <button
                  className={styles.btn}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  onMouseEnter={onEnterButton}
                  onMouseLeave={onLeave}
                >
                  Borrar
                </button>
              </ConfirmTooltip>
            )}
            {isEditingProject && (
              <button
                className={styles.btn}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditingProject(false);
                }}
                onMouseEnter={onEnterButton}
                onMouseLeave={onLeave}
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className={styles.btn}
              onMouseEnter={onEnterButton}
              onMouseLeave={onLeave}
            >
              {isAddingProject ? "Agregar" : "Guardar"}
            </button>
          </div>
        </form>
        <div className={styles.projectForm_form__dropzones}>
          <div className={styles.projectForm_form__dropzones__gallery}>
            <h4>Galería</h4>
            <div
              {...getRootPropsGallery({
                className: "blog_dropzone",
                style: {
                  transition: "all 0.3s ease",
                  border:
                    isDragActiveImage && isDragAcceptImage
                      ? "2px dashed rgba(147, 213, 0, 1)"
                      : isDragActiveImage && !isDragAcceptImage
                      ? "2px dashed #ff4b26"
                      : "0px dashed #fff"
                }
              })}
            >
              <input {...getInputPropsGallery()} />
              <p>Arrastra una imagen o haz click para seleccionar una</p>
            </div>
          </div>
          <div className={styles.projectForm_form__gallery}>
            <AnimatePresence mode="popLayout">
              {gallery &&
                gallery.length > 0 &&
                gallery.map((file: any) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={file.url}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(file.url);
                      enqueueSnackbar("URL copiada", { variant: "info" });
                    }}
                    style={{
                      backgroundImage: `url(${file.url})`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundColor: "#fff",
                      backgroundRepeat: "no-repeat",
                      position: "relative",
                      width: "100px",
                      minWidth: "100px",
                      height: "100px",
                      borderRadius: "8px"
                    }}
                  >
                    <button
                      onMouseEnter={onEnterButton}
                      onMouseLeave={onLeave}
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        width: "20px",
                        minWidth: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        zIndex: 99999
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFile(FileType.GALLERY, file.url);
                      }}
                    >
                      X
                    </button>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
          <div className={styles.projectForm_form__dropzones__featured}>
            <div className={styles.formContainer}>
              <h4>Imagen destacada</h4>
              <AnimatePresence mode="wait">
                {isSubmitted && !featuredImage && (
                  <motion.p
                    key="error"
                    className={styles.formContainer__error}
                    style={{ bottom: 0 }}
                    initial={{ opacity: 0, y: -10 }}
                    exit={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    La imagen destacada es obligatoria
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div
              className={styles.projectForm_form__dropzones__featured__dropzone}
            >
              <div
                {...getRootPropsFeaturedImage({
                  className: "blog_dropzone",
                  style: {
                    transition: "all 0.3s ease",
                    border:
                      isDragActiveFeaturedImage && isDragAcceptFeaturedImage
                        ? "2px dashed rgba(147, 213, 0, 1)"
                        : isDragActiveFeaturedImage &&
                          !isDragAcceptFeaturedImage
                        ? "2px dashed #ff4b26"
                        : "0px dashed #fff",
                    opacity: featuredImage ? 0.5 : 1
                  }
                })}
              >
                <input {...getInputPropsFeaturedImage()} />
                <p>Arrastra una imagen o haz click para seleccionar una</p>
              </div>
              <div className={styles.projectForm_form__featured}>
                <AnimatePresence mode="popLayout">
                  {featuredImage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={featuredImage.url}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(featuredImage.url);
                        enqueueSnackbar("URL copiada", { variant: "info" });
                      }}
                      style={{
                        backgroundImage: `url(${featuredImage.url})`,
                        backgroundSize: "cover",
                        backgroundColor: "#fff",
                        backgroundPosition: "center",
                        position: "relative",
                        width: "150px",
                        minWidth: "150px",
                        height: "150px",
                        borderRadius: "8px"
                      }}
                    >
                      <button
                        onMouseEnter={onEnterButton}
                        onMouseLeave={onLeave}
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          width: "20px",
                          minWidth: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#000",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          zIndex: 99999
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteFile(FileType.FEATURED, featuredImage.url);
                        }}
                      >
                        X
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
