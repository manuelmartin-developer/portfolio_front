import { Category } from "../AdminCategories";
import styles from "./CategoriesList.module.scss";
import { AnimatePresence } from "framer-motion";
import { CategoryType } from "../AdminCategories";
import CategoryItem from "../Item/CategoryItem";

const CategoriesList: React.FC<{
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}> = ({ categories, setCategories }) => {
  return (
    <div className={styles.categories}>
      <div className={styles.categories_projects}>
        <h2>Categorías de proyectos</h2>
        <div className={styles.categories_projects_list}>
          <AnimatePresence mode="sync">
            {categories
              ?.filter((category) => category.type === CategoryType.PROJECT)
              .map((category) => (
                <CategoryItem
                  key={category.code}
                  category={category}
                  setCategories={setCategories}
                />
              ))}
          </AnimatePresence>
          {!categories.some(
            (category) => category.type === CategoryType.PROJECT
          ) && <p>No hay categorías de proyectos</p>}
        </div>
      </div>
      <div className={styles.categories_posts}>
        <h2>Categorías de posts</h2>
        <div className={styles.categories_posts_list}>
          <AnimatePresence mode="sync">
            {categories
              ?.filter((category) => category.type === CategoryType.POST)
              .map((category) => (
                <CategoryItem
                  key={category.code}
                  category={category}
                  setCategories={setCategories}
                />
              ))}
          </AnimatePresence>
          {!categories.some(
            (category) => category.type === CategoryType.POST
          ) && <p>No hay categorías de posts</p>}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
