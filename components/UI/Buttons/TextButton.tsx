import { useCursorStore } from "../../../store/cursorStore";
import styles from "./TextButton.module.scss";
type ButtonProps = {
  onClick?: () => void;
  text: string;
  isDisabled?: boolean;
};

const TextButton: React.FC<ButtonProps> = ({
  onClick,
  text,
  isDisabled
}: ButtonProps) => {
  // Store
  const { setCursorVariant } = useCursorStore();

  // Methods
  const onEnterButton = () => {
    setCursorVariant("dot");
  };

  const onLeave = () => {
    setCursorVariant("default");
  };

  return (
    <button
      className={`${styles.btn} ${isDisabled ? styles.btn_disabled : ""}`}
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={onEnterButton}
      onMouseLeave={onLeave}
    >
      {text}
    </button>
  );
};

export default TextButton;
