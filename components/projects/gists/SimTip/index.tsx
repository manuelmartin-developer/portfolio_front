import { Tooltip } from 'react-simtip';
import styles from './SimTip.module.scss';
import confetti from 'canvas-confetti';

const SimTip = () => {
  const onHandleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  return (
    <>
      <p className={styles.paragraph}>
        Lorem ipsum{' '}
        <Tooltip
          content="Auch! 🤕"
          fontSize={20}
          offset={10}
          animation="fade"
          padding={8}
        >
          <span className={styles.span}>dolor</span>
        </Tooltip>{' '}
        sit, amet consectetur{' '}
        <Tooltip
          content={
            <p>
              You can also use a custom component as content. This is a{' '}
              <strong>React Component</strong>!
            </p>
          }
          fontSize={20}
          offset={10}
          animation="scale"
          padding={8}
          hasArrow
          variant="info"
        >
          <span className={styles.span}>adipisicing</span>
        </Tooltip>{' '}
        elit. Sequi ipsum sit veniam. Aliquam distinctio consequuntur, vel
        temporibus{' '}
        <Tooltip
          placement="right"
          content={
            <p>
              Custom <strong>placement</strong>!
            </p>
          }
          fontSize={16}
          offset={10}
          animation="flicker"
          animationDuration={800}
          padding={8}
          hasArrow
          variant="error"
        >
          <span className={styles.span}>voluptate</span>
        </Tooltip>{' '}
        reprehenderit ratione dolorem iure{' '}
        <Tooltip
          placement="bottom"
          content={
            <>
              <p>You can wrap the content that you can imagine.</p>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <button onClick={onHandleConfetti} className={styles.btn}>
                  🎉
                </button>
              </div>
            </>
          }
          fontSize={16}
          offset={10}
          animation="slide"
          padding={8}
          variant="success"
        >
          <span className={styles.span}>voluptates</span>
        </Tooltip>{' '}
        culpa soluta. Molestiae animi delectus id ea?
      </p>
      <p className={styles.paragraph}>
        Download the package from{' '}
        <a
          href="https://www.npmjs.com/package/react-simtip"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          NPM
        </a>
      </p>
      <p className={styles.paragraph}>
        You can also check the code in{' '}
        <a
          href="https://github.com/manuelmartin-developer/react-simtip?tab=readme-ov-file"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
      </p>
    </>
  );
};
export default SimTip;
