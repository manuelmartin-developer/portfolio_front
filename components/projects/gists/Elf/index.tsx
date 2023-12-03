import { useCursorStore } from "../../../../store/cursorStore";
import styles from "./Elf.module.scss";

const Elf = () => {
  // Store
  const { setCursorVariant } = useCursorStore();
  return (
    <div className={styles.container}>
      <p>Elf is a simple, lightweight, and fast game for kids.</p>
      <p>
        This was my first game ever, and I made it for my son. He was 4 years
        old...now he is taller than me 😅
      </p>
      <p>Video game development is incredible funny, and I love it.</p>
      <p>
        You just to jump poison bottles. You can play with space bar or tap on
        mobile devices.
      </p>
      <iframe
        onMouseEnter={() => setCursorVariant("hidden")}
        onMouseLeave={() => setCursorVariant("default")}
        src="https://i.simmer.io/@manuelmartin/elf"
        className={styles.iframe}
      ></iframe>
    </div>
  );
};

export default Elf;
