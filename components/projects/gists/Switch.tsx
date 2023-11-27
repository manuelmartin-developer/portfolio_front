import { useRef } from "react";
import styles from "./Switch.module.scss";
import { useCursorStore } from "../../../store/cursorStore";

const Switch = () => {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const homeButtonRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const screenFrameRef = useRef<HTMLDivElement>(null);

  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

  // Methods
  const playVideo = () => {
    const video = videoRef.current;
    const homeButton = homeButtonRef.current;
    if (!video || !homeButton) return;
    if (video.paused) {
      video.style.opacity = "1";
      video.style.visibility = "visible";
      homeButton.style.backgroundColor = "chartreuse";
      video.play();
    } else {
      video.style.visibility = "hidden";
      video.style.opacity = "0";
      homeButton.style.backgroundColor = "#e9e7e7";
      video.pause();
      video.currentTime = 0;
    }
  };

  const deleteAllStyles = () => {
    const container = document.querySelector(".container");
    if (!container) return;
    const divs = container.querySelectorAll("div");
    const section = container.querySelector("section");
    if (!section || !divs) return;

    section.classList.toggle(styles.unstyled_container);
    divs.forEach((div) => {
      div.classList.toggle(styles.unstyled);
    });
  };

  const onRandomizeColor = () => {
    if (!frameRef.current || !screenFrameRef.current) return;
    const frame = frameRef.current;
    const screenFrame = screenFrameRef.current;
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    frame.style.backgroundColor = `#${randomColor}`;
    screenFrame.style.backgroundColor = `#${randomColor}`;
  };

  const onEnterHomeButton = () => {
    setCursorVariant("link");
    setCursorText("Play");
  };

  const onEnterColorButton = () => {
    setCursorVariant("link");
    setCursorText("Randimize Color");
  };

  const onEnterCheckbox = () => {
    setCursorVariant("link");
    setCursorText("Magic");
  };

  const onLeave = () => {
    setCursorVariant("default");
    setCursorText("");
  };

  return (
    <>
      <div
        className="checkbox-wrapper"
        style={{
          marginTop: "2rem"
        }}
        onMouseEnter={onEnterCheckbox}
        onMouseLeave={onLeave}
      >
        <input id="cbx" type="checkbox" onChange={deleteAllStyles} />
        <label className="cbx" htmlFor="cbx"></label>
        <label className="lbl" htmlFor="cbx">
          Make some magic!
        </label>
      </div>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          height: "fit-content",
          position: "relative",
          margin: "2rem"
        }}
      >
        <section
          ref={frameRef}
          className={`${styles.switch} ${styles.unstyled_container}`}
        >
          <div
            className={`${styles.screen_frame} ${styles.unstyled}`}
            ref={screenFrameRef}
          >
            <div className={`${styles.screen} ${styles.unstyled}`}>
              <video
                ref={videoRef}
                src="/assets/video/miitopia.mp4"
                id="video"
                width="100%"
              ></video>
            </div>
          </div>
          <div className={`${styles.l_button} ${styles.unstyled}`}></div>
          <div className={`${styles.r_button} ${styles.unstyled}`}></div>
          <div className={`${styles.minus_button} ${styles.unstyled}`}></div>
          <div className={`${styles.small_group} ${styles.unstyled}`}>
            <div
              className={`${styles.small_group_shadow} ${styles.unstyled}`}
            ></div>

            <div className={`${styles.plus_button_1} ${styles.unstyled}`}></div>
            <div className={`${styles.plus_button_2} ${styles.unstyled}`}></div>
          </div>
          <div className={`${styles.l_pad} ${styles.unstyled}`}>
            <div className={`${styles.l_pad_circle} ${styles.unstyled}`}></div>
          </div>
          <div className={`${styles.x_button} ${styles.unstyled}`}>X</div>
          <div className={`${styles.y_button} ${styles.unstyled}`}>Y</div>
          <div className={`${styles.a_button} ${styles.unstyled}`}>A</div>
          <div className={`${styles.b_button} ${styles.unstyled}`}>B</div>
          <div className={`${styles.big_group} ${styles.unstyled}`}>
            <div
              className={`${styles.big_group_shadow} ${styles.unstyled}`}
            ></div>
            <div
              className={`${styles.big_group_control_1} ${styles.unstyled}`}
            ></div>
            <div
              className={`${styles.big_group_control_2} ${styles.unstyled}`}
            ></div>
            <div className={`${styles.bottom_arrow} ${styles.unstyled}`}></div>
            <div className={`${styles.top_arrow} ${styles.unstyled}`}></div>
            <div className={`${styles.left_arrow} ${styles.unstyled}`}></div>
            <div className={`${styles.right_arrow} ${styles.unstyled}`}></div>
          </div>
          <div
            className={`${styles.left_square_button} ${styles.unstyled}`}
            onClick={onRandomizeColor}
            onMouseEnter={onEnterColorButton}
            onMouseLeave={onLeave}
          >
            <div
              className={`${styles.left_square_button_shadow} ${styles.unstyled}`}
            ></div>
          </div>
          <div className={`${styles.r_pad} ${styles.unstyled}`}>
            <div className={`${styles.r_pad_circle} ${styles.unstyled}`}></div>
          </div>
          <div
            ref={homeButtonRef}
            className={`${styles.home_button} ${styles.unstyled}`}
            onClick={playVideo}
            onMouseEnter={onEnterHomeButton}
            onMouseLeave={onLeave}
          >
            <div
              className={`${styles.home_button_shadow} ${styles.unstyled}`}
            ></div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Switch;
