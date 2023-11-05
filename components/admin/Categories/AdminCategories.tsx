import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";

import styles from "./AdminCategories.module.scss";
import { useEffect, useState } from "react";
import CategoriesList from "./List/CategoriesList";
import CategoriesForm from "./Form/CategoriesForm";

export enum CategoryType {
  POST = "post",
  PROJECT = "project"
}

export interface Category {
  code: string;
  id_category: number;
  name: string;
  type: CategoryType;
  createdAt: Date;
  updatedAt: Date;
  project_count?: number;
  post_count?: number;
}

const AdminCategories = () => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();

  // Component states
  const [categories, setCategories] = useState<Category[]>([]);

  // Methods
  const onGetCategories = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
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
      const err = error as AxiosError;
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  // Component Lifecycle
  useEffect(() => {
    onGetCategories();
  }, []);
  return (
    <div className={styles.container}>
      <CategoriesForm setCategories={setCategories} />
      <CategoriesList categories={categories} setCategories={setCategories} />
    </div>
  );
};

export default AdminCategories;
