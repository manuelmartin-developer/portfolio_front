import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const PageTransition: React.FC<Props> = ({ children }) => {
  // Constants
  const { asPath } = useRouter();

  const variants = {
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        delay: 0.2
      }
    },
    out: {
      opacity: 0,
      scale: 1,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={asPath}
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
