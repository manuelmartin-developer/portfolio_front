import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.scss";
import { useEffect, useState } from "react";
import { TbDeviceHeartMonitor } from "react-icons/tb";
// Dynamic imports
const Monitor = dynamic(() => import("../components/layout/monitor/Monitor"), {
  ssr: false
});

export default function Home() {
  // Component states
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isMonitorOpen, setIsMonitorOpen] = useState<boolean>(false);

  // Life cycle
  useEffect(() => {
    // Set a countdown to my 2023/06/01 00:00:00
    const countDownDate = new Date("Jun 1, 2023 00:00:00").getTime();

    // Update the count down every 1 second
    const x = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for years, days, hours, minutes and seconds
      const days = Math.floor(
        (distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Manuel Martín | Portfolio</title>
        <meta
          name="description"
          content="Portfolio de Manuel Martín, desarrollador web fullstack."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.container__title}>Manuel Martin__</h1>
        <p className={styles.container__description}>
          Desarrollador web fullstack
        </p>
        <div className={styles.container__clock}>
          <div>
            <span className={`${styles.count} ${styles.day}`}>{days}</span>
            <span>DAY</span>
          </div>
          <div>
            <span className={`${styles.count} ${styles.hours}`}>{hours}</span>
            <span>HRS</span>
          </div>
          <div>
            <span className={`${styles.count} ${styles.minutes}`}>
              {minutes}
            </span>
            <span>MIN</span>
          </div>
          <div>
            <span className={`${styles.count} ${styles.seconds}`}>
              {seconds}
            </span>
            <span>SEC</span>
          </div>
        </div>
        <button
          aria-label="Abrir monitor"
          className={styles.container_monitorButton}
          onClick={() => setIsMonitorOpen(!isMonitorOpen)}
        >
          <TbDeviceHeartMonitor
            className={styles.container_monitorButton__icon}
            size={30}
            color="#fff"
          />
        </button>
        {isMonitorOpen && (
          <Monitor isOpen={isMonitorOpen} setIsOpen={setIsMonitorOpen} />
        )}
      </div>
    </>
  );
}
