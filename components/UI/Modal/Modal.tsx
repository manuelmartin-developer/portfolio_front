import { motion } from "framer-motion";
import { useModalStore } from "../../../store/modalStore";
import styles from "./Modal.module.scss";
import { CgClose } from "@react-icons/all-files/cg/CgClose";

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  // Store
  const { setIsModalOpen } = useModalStore();

  return (
    <motion.div
      className={styles.modal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        className={styles.closeBtn}
        onClick={() => setIsModalOpen(false)}
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{
          scale: 0.8,
          rotate: -90,
          borderRadius: "100%"
        }}
      >
        <CgClose color={"rgba(255, 255, 255, 0.5)"} />
      </motion.button>
      <motion.div
        className={styles.modal_content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
