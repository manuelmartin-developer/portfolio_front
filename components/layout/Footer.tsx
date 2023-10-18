import Link from "next/link";
import styles from "./Footer.module.scss";
import { CiLinkedin } from "react-icons/ci";
import { RiGithubLine } from "@react-icons/all-files/ri/RiGithubLine";
import { useCursorStore } from "../../store/cursorStore";

const Footer: React.FC = () => {
  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

  // Methods
  const onEnterLink = (text: string) => {
    setCursorVariant("link");
    setCursorText(text);
  };

  const onLeaveLink = () => {
    setCursorText("");
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
            onMouseEnter={() => onEnterLink("LinkedIn")}
            onMouseLeave={onLeaveLink}
          >
            <CiLinkedin size={30} color="#94a3b8" />
          </Link>
          <Link
            href="https://github.com/manuelmartin-developer"
            aria-label="Ir a mi perfil de GitHub"
            className={styles.footer_container_social__link}
            target="_blank"
            onMouseEnter={() => onEnterLink("GitHub")}
            onMouseLeave={onLeaveLink}
          >
            <RiGithubLine size={30} color="#94a3b8" />
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
