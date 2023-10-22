import { motion } from "framer-motion";
import { useAdminStore } from "../../store/adminStore";
import styles from "./AdminPanel.module.scss";
import { useState } from "react";
import { MdPostAdd } from "react-icons/md";
import { GrClose } from "@react-icons/all-files/gr/GrClose";
import { useCursorStore } from "../../store/cursorStore";

const AdminPanel = () => {
  // Store
  const { setAdminLoggedIn } = useAdminStore();
  const { setCursorVariant } = useCursorStore();

  // Component states
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDraggingBtn, setIsDraggingBtn] = useState<boolean>(false);

  // Methods
  const onEnterButton = () => {
    setCursorVariant("dot");
  };

  const onLeaveAdminButton = () => {
    setCursorVariant("default");
  };

  return (
    <div className={styles.adminPanel_container}>
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
        onMouseLeave={onLeaveAdminButton}
      >
        {!isMenuOpen && <MdPostAdd size={"1.5rem"} />}
        {isMenuOpen && <GrClose size={"1.5rem"} />}
      </motion.div>
      <div
        className={`${styles.adminPanel_content} ${
          isMenuOpen ? styles.adminPanel_content_open : ""
        }`}
      >
        ffff
        <div className={styles.adminPanel_content_footer}>
          <button
            className={styles.adminPanel_content_footer__btn}
            onClick={() => {
              localStorage.removeItem("admin_token");
              setAdminLoggedIn(false);
            }}
            onMouseEnter={onEnterButton}
            onMouseLeave={onLeaveAdminButton}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
