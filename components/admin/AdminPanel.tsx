import { useState } from "react";
import dynamic from "next/dynamic";

import { motion } from "framer-motion";

import styles from "./AdminPanel.module.scss";

import { useAdminStore } from "../../store/adminStore";
import { MdPostAdd } from "react-icons/md";
import { GrClose } from "@react-icons/all-files/gr/GrClose";
import { useCursorStore } from "../../store/cursorStore";
import ConfirmTooltip from "../UI/Tooltips/ConfirmTooltip";
// Dynamic imports
const AdminPosts = dynamic(() => import("./Posts/AdminPosts"), { ssr: false });
const AdminProjects = dynamic(() => import("./Projects/AdminProjects"), {
  ssr: false
});
const AdminCategories = dynamic(() => import("./Categories/AdminCategories"), {
  ssr: false
});

const AdminPanel = () => {
  // Store
  const { setAdminLoggedIn } = useAdminStore();
  const { setCursorVariant } = useCursorStore();

  // Component states
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDraggingBtn, setIsDraggingBtn] = useState<boolean>(false);
  const [menuContent, setMenuContent] = useState<
    "selector" | "posts" | "projects" | "categories"
  >("selector");
  const [isAddingPost, setIsAddingPost] = useState<boolean>(false);
  const [isAddingProject, setIsAddingProject] = useState<boolean>(false);

  // Methods

  const onEnterButton = () => {
    setCursorVariant("dot");
  };

  const onLeave = () => {
    setCursorVariant("default");
  };

  return (
    <div className={styles.adminPanel_container} onMouseEnter={onLeave}>
      <motion.div
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.2 }}
        onDragStart={() => setIsDraggingBtn(true)}
        onDragEnd={() => setTimeout(() => setIsDraggingBtn(false), 100)}
        className={styles.menuBtn}
        id="adminPanelBtn"
        onClick={() => !isDraggingBtn && setIsMenuOpen(!isMenuOpen)}
        role="button"
        onMouseEnter={onEnterButton}
        onMouseLeave={onLeave}
      >
        {!isMenuOpen && <MdPostAdd size={"1.5rem"} />}
        {isMenuOpen && <GrClose size={"1.5rem"} />}
      </motion.div>
      <div
        className={`${styles.adminPanel_content} ${
          isMenuOpen ? styles.adminPanel_content_open : ""
        }`}
      >
        <div className={`${styles.adminPanel_content_container}`}>
          {menuContent !== "selector" && (
            <div className={styles.adminPanel_content_header}>
              <h2 className={styles.adminPanel_content_header__title}>
                {menuContent === "posts" && "Posts"}
              </h2>
              <button
                className={styles.btn}
                onClick={() => setMenuContent("selector")}
                onMouseEnter={onEnterButton}
                onMouseLeave={onLeave}
              >
                Atrás
              </button>
            </div>
          )}
          {menuContent === "selector" && (
            <div className={styles.adminPanel_content_selector}>
              <button
                className={styles.btn}
                onClick={() => setMenuContent("categories")}
                onMouseEnter={onEnterButton}
                onMouseLeave={onLeave}
              >
                Categorías
              </button>
              <button
                className={styles.btn}
                onClick={() => setMenuContent("posts")}
                onMouseEnter={onEnterButton}
                onMouseLeave={onLeave}
              >
                Posts
              </button>
              <button
                className={styles.btn}
                onClick={() => setMenuContent("projects")}
                onMouseEnter={onEnterButton}
                onMouseLeave={onLeave}
              >
                Proyectos
              </button>
            </div>
          )}
          {menuContent === "posts" && (
            <AdminPosts
              isAddingPost={isAddingPost}
              setIsAddingPost={setIsAddingPost}
            />
          )}
          {menuContent === "projects" && (
            <AdminProjects
              isAddingProject={isAddingProject}
              setIsAddingProject={setIsAddingProject}
            />
          )}
          {menuContent === "categories" && <AdminCategories />}
          <div className={styles.adminPanel_content_footer}>
            <ConfirmTooltip
              confirmText="¿Estás seguro de salir?"
              onConfirm={() => {
                localStorage.removeItem("admin_token");
                setAdminLoggedIn(false);
              }}
              buttonText="Salir"
            >
              <button
                className={styles.btn}
                onMouseEnter={onEnterButton}
                onMouseLeave={onLeave}
              >
                Salir
              </button>
            </ConfirmTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
