import Head from "next/head";
import { forwardRef, useEffect, useState } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";

import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

import styles from "@/styles/Layout.module.scss";

import Hero from "../components/layout/Hero";
import { useCursorStore } from "../store/cursorStore";
import { CiLinkedin } from "react-icons/ci";
import { RiGithubLine } from "@react-icons/all-files/ri/RiGithubLine";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosRefresh } from "@react-icons/all-files/io/IoIosRefresh";
import PageTransition from "../components/transitions/PageTransition";

type IndexPageProps = {
  codingStats: any;
};
type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

function Home(props: IndexPageProps, ref: IndexPageRef) {
  // Component states
  const [songName, setSongName] = useState<string>("");
  const [albumImage, setAlbumImage] = useState<{
    height: number;
    url: string;
    width: number;
  }>();
  const [artistName, setArtistName] = useState<string>("");
  const [songUrl, setSongUrl] = useState<string>("");
  const [isLoadingSong, setIsLoadingSong] = useState<boolean>(true);

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

  const onGetSpotifyRandomSong = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/spotify/song/`;

    setIsLoadingSong(true);
    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        setSongName(response.data.song.name);
        setAlbumImage({
          height: response.data.song.album.images[0].height,
          url: response.data.song.album.images[0].url,
          width: response.data.song.album.images[0].width
        });
        setArtistName(response.data.song.artists[0].name);
        setSongUrl(response.data.song.preview_url);
        setIsLoadingSong(false);
      }
    } catch (error) {
      setIsLoadingSong(false);
      console.log(error);
    }
  };

  // Component Lifecycle
  useEffect(() => {
    onGetSpotifyRandomSong();
  }, []);

  return (
    <>
      <Head>
        <title>Manuel Martín | Portfolio</title>
        <meta
          name="description"
          content="Manuel Martín | Fullstack web and mobile developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Manuel Martín",
            alternateName: "Manuel Martín",
            url: "https://manuelmartin.dev",
            image: "https://manuelmartin.dev/assets/img/commons/me.jpeg",
            sameAs: [
              "https://www.linkedin.com/in/manuel-martin-developer/",
              "https://github.com/manuelmartin-developer",
              "https://twitter.com/ManuelMartinDia"
            ],
            jobTitle: "Fullstack web and mobile developer",
            worksFor: {
              "@type": "Organization",
              name: "Earscloud"
            },
            alumniOf: {
              "@type": "Organization",
              name: "The Bridge | Digital Talent Accelerator"
            }
          })}
        </script>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Manuel Martín" />
        <meta
          name="keywords"
          content="Manuel Martín, Portfolio, developer, web, mobile, fullstack, javascript, typescript, react, nextjs, nodejs, express"
        />
        <meta property="og:title" content="Manuel Martín | Portfolio" />
        <meta
          property="og:description"
          content="Manuel Martín | Fullstack web and mobile developer"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manuelmartin.dev" />
        <meta
          property="og:image"
          content="https://manuelmartin.dev/assets/img/commons/logo.png"
        />
        <meta property="og:site_name" content="Manuel Martín | Portfolio" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Manuel Martín | Portfolio" />
        <meta
          name="twitter:description"
          content="Manuel Martín | Fullstack web and mobile developer"
        />
        <meta
          name="twitter:image"
          content="https://manuelmartin.dev/assets/img/commons/logo.png"
        />
        <meta name="twitter:site" content="@ManuelMartinDia" />
        <meta name="twitter:creator" content="@ManuelMartinDia" />
        <link rel="canonical" href="https://manuelmartin.dev" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/assets/img/commons/me.jpeg" as="image" />
      </Head>
      <PageTransition ref={ref} layoutId="index">
        <div className={styles.container}>
          <Hero title="Info" nextUnderscore="FN: Manuel" right="LN: Martín" />
          <div className={styles.container_content}>
            <motion.div
              className={styles.container_content_title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2>
                Hi there! I&apos;m{" "}
                <motion.span
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 20 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className={styles.container_content_title__name}
                  onMouseEnter={() => setCursorVariant("image")}
                  onMouseLeave={onLeaveLink}
                >
                  Manuel Martin
                </motion.span>
                , a fullstack web and mobile developer. I&apos;m advocate of
                clean, efficient and scalable code. I love to learn new
                technologies and to share my knowledge with others.
              </h2>
            </motion.div>
            <motion.div
              className={styles.container_content_description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                My work currently consist of a full time job as a fullstack
                software engineer at{" "}
                <Link
                  className={styles.container_content_description__link}
                  href="https://earscloud.io/"
                  onMouseEnter={() => onEnterLink("Earscloud")}
                  onMouseLeave={onLeaveLink}
                  target="_blank"
                >
                  Earscloud
                </Link>
              </p>
              <p>
                But...always working on side projects, learning new technologies
                and trying to improve my skills.
              </p>
              <p>
                I&apos;m also a music lover, surely you&apos;ll find me
                listening to music while coding. Here&apos;s a random song from
                my Spotify playlist:
              </p>
              <div className={styles.container_content_description__song}>
                <AnimatePresence mode="wait">
                  {!isLoadingSong && songName && albumImage && artistName && (
                    <motion.div
                      key={songName}
                      className={
                        styles.container_content_description__song__info
                      }
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className={
                          styles.container_content_description__song__info_data
                        }
                        style={{
                          backgroundImage: `url(${albumImage.url})`
                        }}
                      >
                        <div
                          className={
                            styles.container_content_description__song__info_data__text
                          }
                        >
                          <h3>{songName}</h3>
                          <h4>{artistName}</h4>
                        </div>
                      </div>
                      <audio controls src={songUrl} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.button
                  className={styles.container_content_description__song__button}
                  aria-label="Next song"
                  onClick={onGetSpotifyRandomSong}
                  onMouseEnter={() => onEnterLink("Next song")}
                  onMouseLeave={onLeaveLink}
                  whileTap={{ rotate: 360, transition: { duration: 0.5 } }}
                >
                  <IoIosRefresh />
                </motion.button>
                <p
                  className={
                    styles.container_content_description__song__disclaimer
                  }
                >
                  *Songs are randomly selected with the Spotify API. May song is
                  not available in your country, in that case, refresh!.
                </p>
              </div>
              <h3>
                Coding is a passion for me, so I spend a lot of time doing it.
                Here you have some facts about my coding activity from the last
                year...
              </h3>

              <motion.table
                className={styles.container_content_description__table}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>Fact</th>
                  </tr>
                </thead>
                <tbody>
                  <motion.tr
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <td>Total last year</td>
                    <td>{props.codingStats.stats.total}</td>
                  </motion.tr>
                  <motion.tr
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td>Daily average</td>
                    <td>{props.codingStats.stats.dayly_average}</td>
                  </motion.tr>
                  <motion.tr
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <td>Craziest day</td>
                    <td>
                      {props.codingStats.stats.best_day.date} with{" "}
                      {props.codingStats.stats.best_day.text}
                    </td>
                  </motion.tr>
                  <motion.tr
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <td>Top language</td>
                    <td>
                      {props.codingStats.stats.top_language.name} with{" "}
                      {props.codingStats.stats.top_language.percent}% of total
                      time
                    </td>
                  </motion.tr>
                  <motion.tr
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <td>This portfolio back</td>
                    <td>{props.codingStats.stats.portfolio_back.text}*</td>
                  </motion.tr>
                  <motion.tr
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <td>This portfolio front</td>
                    <td>{props.codingStats.stats.portfolio_front.text}*</td>
                  </motion.tr>
                  <motion.tr
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <td colSpan={2}>
                      *People say that frontend is easier than backend... 😏
                    </td>
                  </motion.tr>
                </tbody>
              </motion.table>
            </motion.div>
            <motion.div
              className={styles.container_content_social}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Find me on:</h3>
              <div className={styles.container_content_social__links}>
                <Link
                  href="https://github.com/manuelmartin-developer"
                  onMouseEnter={() => onEnterLink("Github")}
                  onMouseLeave={onLeaveLink}
                  target="_blank"
                >
                  <RiGithubLine size={30} color="#94a3b8" aria-label="Github" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/manuel-martin-developer/"
                  aria-label="Linkedin"
                  onMouseEnter={() => onEnterLink("Linkedin")}
                  onMouseLeave={onLeaveLink}
                  target="_blank"
                >
                  <CiLinkedin size={30} color="#94a3b8" />
                </Link>
                <Link
                  href="https://twitter.com/ManuelMartinDia"
                  aria-label="Twitter"
                  onMouseEnter={() => onEnterLink("Twitter")}
                  onMouseLeave={onLeaveLink}
                  target="_blank"
                >
                  <RiTwitterXFill size={30} color="#94a3b8" />
                </Link>
                <Link
                  href="mailto:hola@manuelmartin.dev"
                  aria-label="Email"
                  onMouseEnter={() => onEnterLink("Email")}
                  onMouseLeave={onLeaveLink}
                  target="_blank"
                >
                  <MdOutlineEmail size={30} color="#94a3b8" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}

export default forwardRef(Home);

export const getStaticProps: GetStaticProps = async () => {
  const getCodingStats = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/coding/stats/`;
    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const codingStats = await getCodingStats();

  return {
    props: {
      codingStats
    },
    revalidate: 60 * 60 * 24 // 24 hours
  };
};
