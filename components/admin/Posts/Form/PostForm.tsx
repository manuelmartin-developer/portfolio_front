import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import styles from "./PostForm.module.scss";

import ConfirmTooltip from "../../../UI/Tooltips/ConfirmTooltip";
import PostEditor from "../Editor/PostEditor";
import { useCursorStore } from "../../../../store/cursorStore";
import axios, { AxiosError } from "axios";
import { Post, PostImage, User } from "../AdminPosts";
import { useSnackbar } from "notistack";
import { Category } from "../../Categories/AdminCategories";

enum FileType {
  GALLERY = "gallery",
  FEATURED = "featuredImage"
}

const PostForm: React.FC<{
  isEditingPost: boolean;
  setIsEditingPost: React.Dispatch<React.SetStateAction<boolean>>;
  postInFocus: Post | null;
  isAddingPost: boolean;
  setIsAddingPost: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  isEditingPost,
  setIsEditingPost,
  postInFocus,
  isAddingPost,
  setIsAddingPost
}) => {
  // Component states
  const [users, setUsers] = useState<User[]>([]);
  const [featuredImage, setFeaturedImage] = useState<PostImage>();
  const [gallery, setGallery] = useState<PostImage[]>([]);
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [content, setContent] = useState<string>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    {
      label: string;
      value: number;
    }[]
  >();
  const [author, setAuthor] = useState<{
    value: string;
    label: string;
  }>();

  //   Store
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

  // Methods
  const onGetUsers = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        enqueueSnackbar(errorData?.message || "Ha ocurrido un error", {
          variant: "error"
        });
      }
    }
  };

  const onGetPostsCategories = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories/?type=post`;
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

  const onUpdatePost = async (data: any) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/${postInFocus?.code}`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const payload = {
      ...data,
      categories: selectedCategories,
      author: author?.label,
      content,
      isDraft
    };

    try {
      const response = await axios.put(URL, payload, config);
      if (response.status === 200) {
        enqueueSnackbar("Post actualizado", { variant: "success" });
        setIsAddingPost(false);
        setIsEditingPost(false);
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
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/files/posts/${postInFocus?.code}/`;
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
        enqueueSnackbar(
          errorData.errorData?.message || "Ha ocurrido un error",
          {
            variant: "error"
          }
        );
      }
    }
  };

  const onHandleCancel = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/${postInFocus?.code}`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.delete(URL, config);
      if (response.status === 200) {
        enqueueSnackbar("Post eliminado", { variant: "success" });
        setIsAddingPost(false);
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
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/files/posts/${postInFocus?.code}/`;
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

  // Component Lifecycle
  useEffect(() => {
    if (!isAddingPost && !isEditingPost) return;
    onGetUsers();
    onGetPostsCategories();
  }, [isAddingPost, isEditingPost]);

  useEffect(() => {
    const title = watch("title");
    setValue(
      "slug",
      title
        .toLocaleLowerCase()
        .replace(/\s/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
    );
  }, [watch("title")]);

  useEffect(() => {
    if (!isEditingPost || !postInFocus) return;
    setValue("title", postInFocus.title);
    setValue("excerpt", postInFocus.excerpt);
    setValue("slug", postInFocus.slug);
    setValue("categories", postInFocus.categories.join(","));
    setValue("author", postInFocus.author);
    setContent(postInFocus.content);
    setIsDraft(postInFocus.isDraft);
    setFeaturedImage(postInFocus.featuredImage);
    setGallery(postInFocus.gallery);
    setSelectedCategories(
      postInFocus.categories.map((category) => {
        return {
          label: category.label,
          value: category.value
        };
      })
    );
    setAuthor({
      value: postInFocus.author,
      label: postInFocus.author
    });
  }, [isEditingPost, postInFocus]);

  return (
    <div className={styles.postForm}>
      <div className={styles.postForm_form}>
        <form
          className={styles.postForm_form__form}
          onSubmit={handleSubmit(onUpdatePost)}
        >
          <div className={styles.formContainer}>
            <input
              type="text"
              className={styles.input}
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
            <input
              type="text"
              className={`${styles.input} ${styles.input_disabled}`}
              {...register("slug", { required: true })}
              disabled
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
                  El slug es obligatorio
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.formContainer}>
            <textarea
              className={`${styles.textarea} ${
                errors.excerpt ? styles.textarea_error : ""
              }`}
              placeholder="Extracto"
              {...register("excerpt", { required: true })}
            />
            <AnimatePresence mode="wait">
              {errors.excerpt && (
                <motion.p
                  key="error"
                  className={styles.formContainer__error}
                  initial={{ opacity: 0, y: -10 }}
                  exit={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  El extracto es obligatorio
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
              value={selectedCategories}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id_category
              }))}
              placeholder="Categorías"
              onChange={(selected: any) => {
                setSelectedCategories(selected);
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
          <div className={styles.formContainer}>
            <Select
              className={`multi-select ${
                isSubmitted && !author ? "error" : ""
              }`}
              classNamePrefix="multi-select"
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={
                author && {
                  label: author.label,
                  value: author.value
                }
              }
              options={users.map((user: User) => ({
                label: user.name,
                value: user.code
              }))}
              placeholder="Autor"
              onChange={(selected: any) => {
                setAuthor(selected);
              }}
            />
            <AnimatePresence mode="wait">
              {isSubmitted && !author && (
                <motion.p
                  key="error"
                  className={styles.formContainer__error}
                  initial={{ opacity: 0, y: -10 }}
                  exit={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Selecciona un autor
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="isDraft"
              onChange={(e) => setIsDraft(e.target.checked)}
              checked={isDraft}
            />
            <label htmlFor="isDraft">Borrador</label>
          </div>
          <div className={styles.postForm_form__form__footer}>
            {isAddingPost && (
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
            {isEditingPost && (
              <button
                className={styles.btn}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditingPost(false);
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
              {isAddingPost ? "Agregar" : "Guardar"}
            </button>
          </div>
        </form>
        <div className={styles.postForm_form__dropzones}>
          <div className={styles.postForm_form__dropzones__gallery}>
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
          <div className={styles.postForm_form__gallery}>
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
          <div className={styles.postForm_form__dropzones__featured}>
            <h4>Imagen destacada</h4>
            <div
              className={styles.postForm_form__dropzones__featured__dropzone}
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
              <div className={styles.postForm_form__featured}>
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
      <div className={styles.postForm__editor}>
        <PostEditor content={content} setContent={setContent} />
      </div>
    </div>
  );
};

export default PostForm;
