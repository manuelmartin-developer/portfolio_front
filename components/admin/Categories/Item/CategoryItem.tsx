import styles from "./CategoryItem.module.scss";
import { Category } from "../AdminCategories";
import { AnimatePresence, motion } from "framer-motion";
import ConfirmTooltip from "../../../UI/Tooltips/ConfirmTooltip";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useCursorStore } from "../../../../store/cursorStore";
import { AiFillEdit } from "@react-icons/all-files/ai/AiFillEdit";
import { AiFillDelete } from "@react-icons/all-files/ai/AiFillDelete";
import { AiFillSave } from "@react-icons/all-files/ai/AiFillSave";

const CategoryItem: React.FC<{
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}> = ({ category, setCategories }) => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();

  // Component states
  const [isEditing, setIsEditing] = useState<boolean>(false);

  //   Store
  const { setCursorVariant } = useCursorStore();

  // Form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  // Methods
  const onEditCategory = async (data: any) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories/${category.code}/`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.put(URL, data, config);
      if (response.status === 200) {
        enqueueSnackbar("Categoría actualizada", { variant: "success" });
        setIsEditing(false);
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

  const onDeleteCategory = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories/${category.code}/`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.delete(URL, config);
      if (response.status === 200) {
        enqueueSnackbar("Categoría eliminada", { variant: "success" });
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

  //   Component lifecycle
  useEffect(() => {
    setValue("name", category.name);
    setValue("type", category.type);
  }, [category]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.category}
    >
      <form
        onSubmit={handleSubmit(onEditCategory)}
        autoComplete="off"
        className={styles.category__form}
      >
        <input
          className={`${styles.input} ${errors.name ? styles.error : ""}
            ${!isEditing ? styles.disabled : ""}
          `}
          disabled={!isEditing}
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        <select
          className={`
            ${styles.select}
            ${!isEditing ? styles.disabled : ""}`}
          id="type"
          disabled={!isEditing}
          {...register("type", { required: true })}
        >
          <option value="post">Post</option>
          <option value="project">Proyecto</option>
        </select>
        <div className={styles.category__actions}>
          <button
            type="button"
            className={styles.category__actions__button}
            onMouseEnter={() => setCursorVariant("dot")}
            onMouseLeave={() => setCursorVariant("default")}
            onClick={() => {
              if (!isEditing) {
                setIsEditing(true);
              } else {
                handleSubmit(onEditCategory)();
              }
            }}
          >
            <AnimatePresence mode="wait">
              {!isEditing && <AiFillEdit key="edit" />}
              {isEditing && <AiFillSave key="save" />}
            </AnimatePresence>
          </button>

          <ConfirmTooltip
            confirmText="¿Eliminar categoría?"
            onConfirm={onDeleteCategory}
          >
            <button
              type="button"
              className={styles.category__actions__button}
              onMouseEnter={() => setCursorVariant("dot")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <AiFillDelete />
            </button>
          </ConfirmTooltip>
        </div>
      </form>
    </motion.div>
  );
};

export default CategoryItem;
