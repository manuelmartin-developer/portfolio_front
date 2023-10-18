import {
  getAllDistinctProjectsCategories,
  getCategoryCount
} from "../../public/assets/data/data";
import { projectsData } from "../../public/assets/data/data";
import Card from "./Card";
import styles from "./Card.module.scss";
import { useProjectsStore } from "../../store/projectsStore";
import { useCursorStore } from "../../store/cursorStore";
import { AnimatePresence } from "framer-motion";

const ListCards: React.FC = () => {
  // Constants
  const categories = [
    {
      params: {
        category: "All"
      }
    },
    ...getAllDistinctProjectsCategories()
  ];

  // Store
  const { projects, setProjects, categorySelected, setCategorySelected } =
    useProjectsStore();
  const { setCursorVariant } = useCursorStore();

  // Methods
  const filterProjects = (category: string) => {
    setCategorySelected(category);

    category === "All"
      ? setProjects(projectsData)
      : setProjects(
          projectsData.filter((item) => item.category.includes(category))
        );
  };

  // Methods
  const onEnterLink = () => {
    setCursorVariant("link");
  };

  const onLeaveLink = () => {
    setCursorVariant("default");
  };

  return (
    <>
      <div className={styles.filters}>
        {categories.map((category, index) => (
          <button
            aria-label="Filter projects"
            className={`${styles.filters_item} ${
              category.params.category === categorySelected
                ? styles.filters_item_active
                : ""
            }`}
            key={index}
            onClick={() => {
              filterProjects(category.params.category);
            }}
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
          >
            {category.params.category}
            <span className={styles.filters_item__count}>
              {category.params.category !== "All"
                ? getCategoryCount(category.params.category)
                : projectsData.length}
            </span>
          </button>
        ))}
      </div>
      <ul className={styles.card_list}>
        {projects.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </ul>
    </>
  );
};

export default ListCards;
