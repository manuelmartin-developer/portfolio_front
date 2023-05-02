import Link from "next/link";
import styles from "./Footer.module.scss";
import { CiLinkedin } from "react-icons/ci";
import { RiGithubLine } from "@react-icons/all-files/ri/RiGithubLine";
import { useCursorStore } from "../../store/cursorStore";

const Footer: React.FC = () => {
  // Store
  const { setCursorVariant } = useCursorStore();

  // Methods
  const onEnterLink = () => {
    setCursorVariant("link");
  };

  const onLeaveLink = () => {
    setCursorVariant("default");
  };
  const onEnterFooter = () => {
    setCursorVariant("default");
  };
  return (
    <footer className={styles.footer} onMouseEnter={onEnterFooter}>
      <div className={styles.footer_container}>
        <div className={styles.footer_container_social}>
          <Link
            href="https://www.linkedin.com/in/manuel-martin-developer/"
            aria-label="Ir a mi perfil de LinkedIn"
            className={styles.footer_container_social__link}
            target="_blank"
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
          >
            <CiLinkedin size={30} color="#3e3e3e" />
          </Link>
          <Link
            href="https://github.com/manuelmartin-developer"
            aria-label="Ir a mi perfil de LinkedIn"
            className={styles.footer_container_social__link}
            target="_blank"
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
          >
            <RiGithubLine size={30} color="#3e3e3e" />
          </Link>
        </div>
        <div className={styles.footer_container_copy}>
          <p className={styles.footer_container_copy__text}>
            {`© ${new Date().getFullYear()} made with effort by Manuel Martín`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
