import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
};

type PageTransitionProps = HTMLMotionProps<"div">;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

const PageTransition = (
  { children, ...rest }: Props & PageTransitionProps,
  ref: PageTransitionRef
) => {
  const variants = {
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5
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
    <motion.div
      ref={ref}
      variants={variants}
      animate="in"
      initial="out"
      exit="out"
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default forwardRef(PageTransition);
