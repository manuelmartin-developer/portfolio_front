import Tippy from "@tippyjs/react";
import styles from "./ConfirmTooltip.module.scss";
import { useCursorStore } from "../../../store/cursorStore";

type ConfirmTooltipProps = {
  children: React.ReactElement;
  onConfirm: () => void;
  confirmText: string;
  buttonText?: string;
};

const ConfirmTooltip: React.FC<ConfirmTooltipProps> = ({
  children,
  onConfirm,
  confirmText,
  buttonText = "Eliminar"
}: ConfirmTooltipProps) => {
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
    <Tippy
      content={
        <div className={styles.confirmTooltip}>
          <p>{confirmText}</p>
          <button
            className={styles.confirmTooltip__button}
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            onMouseEnter={onEnterButton}
            onMouseLeave={onLeave}
          >
            {buttonText}
          </button>
        </div>
      }
      interactive={true}
      placement="top"
      trigger="click"
    >
      {children}
    </Tippy>
  );
};

export default ConfirmTooltip;
