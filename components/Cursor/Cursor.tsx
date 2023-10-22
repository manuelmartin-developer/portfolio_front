import { useEffect } from "react";
import {
  m,
  useMotionValue,
  useSpring,
  LazyMotion,
  domAnimation
} from "framer-motion";
import { useCursorStore } from "../../store/cursorStore";

const Cursor: React.FC = () => {
  // Constants
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const cursorVariants = {
    default: {
      scale: 1,
      width: "1.5rem",
      height: "1.5rem",
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "2px solid #fff",
      transition: {
        type: "spring",
        mass: 0.3
      }
    },
    link: {
      scale: 3,
      width: "1.5rem",
      height: "1.5rem",
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "2px solid #fff",
      transition: {
        type: "spring",
        mass: 0.3
      }
    },
    link_small: {
      scale: 2,
      width: "1.5rem",
      height: "1.5rem",
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "2px solid #fff",
      transition: {
        type: "spring",
        mass: 0.3
      }
    },
    dot: {
      scale: 1,
      width: "0.5rem",
      height: "0.5rem",
      backgroundColor: "#fff",
      border: "10px solid #fff",
      transition: {
        type: "spring",
        mass: 0.3
      }
    },
    server: {
      scale: 3,
      width: "2rem",
      height: "2rem",
      backgroundColor: "#eff1f6",
      border: "1px solid #eff1f6",
      borderRadius: "0",
      transition: {
        type: "spring",
        mass: 0.3
      }
    },
    hidden: {
      scale: 0,
      transition: {
        duration: 0.3,
        delay: 1
      },
      backgroundColor: "rgba(0, 0, 0, 0)",
      x: 0,
      y: 0
    }
  };

  // Store
  const { cursorVariant, cursorText } = useCursorStore();

  useEffect(() => {
    const moveCursor = (e: any) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={cursorVariants}
        className="cursor"
        animate={cursorVariant}
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring
        }}
      >
        <span className="cursorText">{cursorText}</span>
      </m.div>
    </LazyMotion>
  );
};

export default Cursor;
