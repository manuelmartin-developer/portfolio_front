import Link from "next/link";
import styles from "./Nav.module.scss";
import { useRouter } from "next/router";
import { useCursorStore } from "../../store/cursorStore";

const Nav: React.FC = () => {
  // Constants
  const { asPath } = useRouter();

  // Store
  const { setCursorVariant } = useCursorStore();

  // Methods
  const onEnterLink = () => {
    setCursorVariant("link");
  };

  const onLeaveLink = () => {
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
          onMouseEnter={onEnterLink}
          onMouseLeave={onLeaveLink}
          style={{
            pointerEvents: asPath !== "/" ? "all" : "none"
          }}
          scroll={false}
        >
          <img src="/assets/img/commons/logo.png" alt="logo image" width={40} />
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
            scroll={false}
          >
            Work_
          </Link>
          <Link
            href="/info"
            aria-current="page"
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
            className={`${styles.nav_menu__item} ${
              asPath === "/info" ? styles.nav_menu__item_active : ""
            }`}
            scroll={false}
          >
            Info_
          </Link>
          <Link
            href="/blog"
            aria-current="page"
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
            className={`${styles.nav_menu__item} ${
              asPath === "/blog" ? styles.nav_menu__item_active : ""
            }`}
            scroll={false}
          >
            Blog_
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
