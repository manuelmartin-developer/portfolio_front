import Link from 'next/link';
import dynamic from 'next/dynamic';

import { motion } from 'framer-motion';
import { Gallery, Item } from 'react-photoswipe-gallery';

import 'photoswipe/dist/photoswipe.css';
import styles from './Projects.module.scss';

import { FiExternalLink } from 'react-icons/fi';
import { BsApple, BsGooglePlay } from 'react-icons/bs';
import { useCursorStore } from '../../store/cursorStore';
import { IoLogoIonic } from '@react-icons/all-files/io5/IoLogoIonic';
import { TbBrandNextjs } from 'react-icons/tb';
import { FaReact } from '@react-icons/all-files/fa/FaReact';
import { FaNodeJs } from '@react-icons/all-files/fa/FaNodeJs';
import { SiExpress, SiTensorflow } from 'react-icons/si';
import { RiFlutterFill } from 'react-icons/ri';
import { SiDart } from 'react-icons/si';
import { SiLeaflet } from 'react-icons/si';
import { SiUnity } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import {
  BiLogoTypescript,
  BiLogoAws,
  BiLogoJavascript,
  BiLogoCss3
} from 'react-icons/bi';
import { AiFillHtml5 } from '@react-icons/all-files/ai/AiFillHtml5';
import { TbBrandSass } from 'react-icons/tb';
import { DiMongodb } from 'react-icons/di';
import { BiLogoPostgresql } from 'react-icons/bi';
import { RiOpenaiFill } from 'react-icons/ri';
import { FaDocker } from '@react-icons/all-files/fa/FaDocker';
import { SiMapbox } from '@react-icons/all-files/si/SiMapbox';
import { SiVite } from 'react-icons/si';
import { useProjectsStore } from '../../store/projectsStore';
import Image from 'next/image';
// Dynamic imports
const Switch = dynamic(() => import('./gists/Switch'), { ssr: false });
const AirportsMap = dynamic(() => import('./gists/AirportsMap'), {
  ssr: false
});
const Mars = dynamic(() => import('./gists/Mars'), { ssr: false });
const Elf = dynamic(() => import('./gists/Elf'), { ssr: false });

const ProjectComponent = () => {
  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();
  const { projectSelected } = useProjectsStore();

  // Methods
  const onEnterLink = (text: string) => {
    setCursorText(text);
    setCursorVariant('link');
  };

  const onLeaveLink = () => {
    setCursorText('');
    setCursorVariant('default');
  };

  return (
    <>
      <div className={styles.title}>
        <h1>{projectSelected?.title}</h1>
        {projectSelected?.url && (
          <Link
            className={styles.linkBtn}
            href={projectSelected?.url || '#'}
            target="_blank"
            onMouseEnter={() => onEnterLink('Visit')}
            onMouseLeave={onLeaveLink}
          >
            <FiExternalLink />
          </Link>
        )}
        {projectSelected?.title === 'Touryme' && (
          <img
            src="https://wakatime.com/badge/user/8020e9ee-e306-42d1-badf-114217fce27c/project/8666cd1b-8fca-4ad1-acda-7d011ae56b53.svg?style=plastic"
            alt="Touryme coding time"
            title="Coding time"
          />
        )}
        {projectSelected?.title === 'ConBdeBoda' && (
          <img
            src="https://wakatime.com/badge/user/8020e9ee-e306-42d1-badf-114217fce27c/project/01397791-c904-4c43-afd7-103efc209dc0.svg?style=plastic"
            alt="ConBdeBoda coding time"
            title="Coding time"
          />
        )}
        {projectSelected?.title === 'No+vello' && (
          <img
            src="https://wakatime.com/badge/user/8020e9ee-e306-42d1-badf-114217fce27c/project/f3937d8d-34d9-4607-9ec3-2575308ed517.svg?style=plastic"
            alt="No+vello coding time"
            title="Coding time"
          />
        )}
      </div>
      {!projectSelected?.isSideProject && (
        <h3 className={styles.subtitle}>
          Client project carried out in{' '}
          <Link
            onMouseEnter={() => onEnterLink('')}
            onMouseLeave={onLeaveLink}
            className={styles.link}
            href="https://roymo.es"
            target="_blank"
          >
            Rommel & Montgommery
          </Link>{' '}
          agency
        </h3>
      )}
      {projectSelected?.isSideProject && (
        <h3 className={styles.subtitle}>Side project</h3>
      )}
      <motion.div
        className="line"
        initial={{ width: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        style={{
          backgroundColor: projectSelected?.color,
          height: '1px',
          marginBottom: '1rem'
        }}
      ></motion.div>
      {projectSelected?.paragraphs?.map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
      {projectSelected?.hasComponent &&
        projectSelected.title === 'Fun-with-CSS' && <Switch />}
      {projectSelected?.hasComponent &&
        projectSelected.title === 'Airports' && <AirportsMap />}
      {projectSelected?.hasComponent &&
        projectSelected.title === 'A-walk-on-Mars' && <Mars />}
      {projectSelected?.hasComponent && projectSelected.title === 'Elf' && (
        <Elf />
      )}

      {projectSelected?.title === 'Touryme' && (
        <motion.div
          className={styles.icons}
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="https://apps.apple.com/es/app/touryme/id6443578378"
            onMouseEnter={() => onEnterLink('App Store')}
            onMouseLeave={onLeaveLink}
            target="_blank"
          >
            <BsApple size="2rem" />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.touryme.app"
            onMouseEnter={() => onEnterLink('Google Play')}
            onMouseLeave={onLeaveLink}
            target="_blank"
          >
            <BsGooglePlay size="2rem" />
          </Link>
        </motion.div>
      )}
      {projectSelected?.gallery && projectSelected?.gallery.length > 0 && (
        <>
          <h3 className={styles.subtitle}>Gallery</h3>
          <motion.div
            className={`${styles.imgContainer} ${
              styles[`project_${projectSelected?.id_project}`]
            }`}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            style={{
              position: 'relative'
            }}
          >
            <Gallery
              options={{
                loop: false
              }}
            >
              {projectSelected?.gallery.map((image, index) => (
                <Item
                  key={index}
                  original={image.url}
                  thumbnail={image.url}
                  width={image.width || 626}
                  height={image.height || 825}
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref as React.RefObject<HTMLImageElement>}
                      onClick={open}
                      className={styles.img}
                      src={image.url}
                      alt={`${projectSelected?.title} image ${index}`}
                      onMouseEnter={() => onEnterLink('Zoom')}
                      onMouseLeave={onLeaveLink}
                      width={image.width || 626}
                      height={image.height || 825}
                    />
                  )}
                </Item>
              ))}
            </Gallery>
          </motion.div>
        </>
      )}
      {projectSelected?.role && (
        <>
          <h3 className={styles.subtitle}>Role</h3>
          <p className={styles.paragraph}>{projectSelected?.role}</p>
        </>
      )}
      <h3 className={styles.subtitle}>Technologies</h3>
      <motion.div
        className={styles.chipTechnologies}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {projectSelected?.technologies &&
          projectSelected?.technologies.map((technology, index) => (
            <motion.div
              key={index}
              className={styles.chip}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.25 * index }}
              style={{
                backgroundColor: '#000',
                color: '#fff'
              }}
            >
              {technology.name === 'React' && <FaReact size="1.5rem" />}
              {technology.name === 'Next.js' && <TbBrandNextjs size="1.5rem" />}
              {technology.name === 'Node.js' && <FaNodeJs size="1.5rem" />}
              {technology.name === 'Express' && <SiExpress size="1.5rem" />}
              {technology.name === 'TypeScript' && (
                <BiLogoTypescript size="1.5rem" />
              )}
              {technology.name === 'Ionic' && <IoLogoIonic size="1.5rem" />}
              {technology.name === 'JavaScript' && (
                <BiLogoJavascript size="1.5rem" />
              )}
              {technology.name === 'CSS' && <BiLogoCss3 size="1.5rem" />}
              {technology.name === 'HTML' && <AiFillHtml5 size="1.5rem" />}
              {technology.name === 'Sass' && <TbBrandSass size="1.5rem" />}
              {technology.name === 'MongoDB' && <DiMongodb size="1.5rem" />}
              {technology.name === 'PostgreSQL' && (
                <BiLogoPostgresql size="1.5rem" />
              )}
              {technology.name === 'AWS' && <BiLogoAws size="1.5rem" />}
              {technology.name === 'TensorFlow' && (
                <SiTensorflow size="1.5rem" />
              )}
              {technology.name === 'OpenAI' && <RiOpenaiFill size="1.5rem" />}
              {technology.name === 'Docker' && <FaDocker size="1.5rem" />}
              {technology.name === 'Mapbox' && <SiMapbox size="1.5rem" />}
              {technology.name === 'Flutter' && <RiFlutterFill size="1.5rem" />}
              {technology.name === 'Dart' && <SiDart size="1.5rem" />}
              {technology.name === 'Leaflet' && <SiLeaflet size="1.5rem" />}
              {technology.name === 'Unity' && <SiUnity size="1.5rem" />}
              {technology.name === 'C#' && <TbBrandCSharp size="1.5rem" />}
              {technology.name === 'Vite' && <SiVite size="1.5rem" />}
              <p
                style={{
                  position: 'relative',
                  top: '1px'
                }}
              >
                {technology.name}
              </p>
            </motion.div>
          ))}
      </motion.div>
    </>
  );
};

export default ProjectComponent;
