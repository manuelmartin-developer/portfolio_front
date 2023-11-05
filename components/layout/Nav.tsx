import Link from "next/link";
import styles from "./Nav.module.scss";
import { useRouter } from "next/router";
import { useCursorStore } from "../../store/cursorStore";
import Image from "next/image";

const Nav: React.FC = () => {
  // Constants
  const { asPath } = useRouter();

  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

  // Methods
  const onEnterLink = () => {
    setCursorVariant("link");
  };
  const onEnterLogo = () => {
    setCursorText("Home");
    setCursorVariant("link");
  };

  const onLeaveLink = () => {
    setCursorText("");
    setCursorVariant("default");
  };
  const onEnterNav = () => {
    setCursorVariant("default");
  };

  return (
    <nav className={styles.nav} onMouseEnter={onEnterNav}>
      <div className={styles.nav_container}>
        <Link
          href="/"
          aria-current="page"
          className={styles.nav__logo}
          onMouseEnter={onEnterLogo}
          onMouseLeave={onLeaveLink}
          style={{
            pointerEvents: asPath !== "/" ? "all" : "none"
          }}
          prefetch={false}
        >
          <Image
            src="/assets/img/commons/logo.png"
            alt="logo image"
            width={40}
            height={40}
            priority
          />
        </Link>
        <div className={styles.nav_menu}>
          <Link
            href="/"
            aria-current="page"
            className={`${styles.nav_menu__item} ${
              asPath === "/" ? styles.nav_menu__item_active : ""
            }`}
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
            prefetch={false}
          >
            Info_
          </Link>
          <Link
            href="/work"
            aria-current="page"
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
            className={`${styles.nav_menu__item} ${
              asPath.startsWith("/work") ? styles.nav_menu__item_active : ""
            }`}
            prefetch={false}
          >
            Work_
          </Link>
          <Link
            href="/blog"
            aria-current="page"
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
            className={`${styles.nav_menu__item} ${
              asPath.startsWith("/blog") ? styles.nav_menu__item_active : ""
            }`}
            prefetch={false}
          >
            Blog_
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
