import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const PageTransition: React.FC<Props> = ({ children }) => {
  // Constants
  const { asPath } = useRouter();
  const isProject: boolean = asPath.split("/")[1] === "projects";

  const variants = {
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    },
    out: {
      opacity: 0,
      scale: 1,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    // If next page is like /projects/1, no transition
    isProject ? (
      <>{children}</>
    ) : (
      <AnimatePresence mode="popLayout">
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
    )
  );
};

export default PageTransition;
