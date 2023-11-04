import styles from "./CategoriesForm.module.scss";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import axios, { AxiosError } from "axios";
import { useCursorStore } from "../../../../store/cursorStore";
import { Category } from "../AdminCategories";
import { AnimatePresence, motion } from "framer-motion";

const CategoriesForm: React.FC<{
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}> = ({ setCategories }) => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();

  // Store
  const { setCursorVariant } = useCursorStore();

  // Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  //   Methods
  const onAddCategory = async (data: any) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories/`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.post(URL, data, config);
      if (response.status === 201) {
        setCategories(response.data.categories);
        enqueueSnackbar("Categoría creada", { variant: "success" });
        setValue("name", "");
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

  return (
    <div className={styles.container}>
      <h1>Añadir categoría</h1>
      <form onSubmit={handleSubmit(onAddCategory)} autoComplete="off">
        <div className={styles.formContainer}>
          <input
            className={`${styles.input} ${errors.name ? styles.error : ""}`}
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
          <AnimatePresence mode="wait">
            {errors.name && (
              <motion.p
                key="error"
                className={styles.formContainer__error}
                initial={{ opacity: 0, y: -10 }}
                exit={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                El nombre es obligatorio
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <select
          className={styles.select}
          id="type"
          {...register("type", { required: true })}
        >
          <option value="post">Post</option>
          <option value="project">Proyecto</option>
        </select>
        <button
          className={styles.btn}
          onMouseEnter={() => setCursorVariant("dot")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          Añadir
        </button>
      </form>
    </div>
  );
};

export default CategoriesForm;
