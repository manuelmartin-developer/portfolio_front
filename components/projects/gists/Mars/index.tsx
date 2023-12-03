import styles from "./Mars.module.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCursorStore } from "../../../../store/cursorStore";
import { useModalStore } from "../../../../store/modalStore";
import Modal from "../../../UI/Modal/Modal";
import { AnimatePresence, motion } from "framer-motion";

const Mars = () => {
  // Constants
  const zoom = 2;
  const baseLayer =
    "http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/viking_mdim21_global/{z}/{x}/{y}.png";
  const attribution =
    '<a href="https://www.openplanetary.org/">OpenPlanetary</a>';

  const roverIcon = L.icon({
    iconUrl: "/assets/img/others/rover.png",
    iconSize: [40, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  });

  // Component states
  const [perseverancePosition, setPerseverancePosition] = useState<any>({});
  const [curiosityPosition, setCuriosityPosition] = useState<any>({});
  const [gallery, setGallery] = useState<any>([]);
  const [nasaDailyImage, setNasaDailyImage] = useState<any>({});

  //   Store
  const { setCursorText, setCursorVariant } = useCursorStore();
  const { isModalOpen, setIsModalOpen } = useModalStore();

  //  Methods
  const getNasaDailyImage = async () => {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASSA_API_KEY}`
    );
    const data = await response.json();
    setNasaDailyImage(data);
  };
  const getPerseverancePosition = async () => {
    const response = await fetch(
      "https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_waypoints_current.json"
    );
    const data = await response.json();
    setPerseverancePosition(data);
  };

  const getCuriosityPosition = async () => {
    const response = await fetch(
      "https://mars.nasa.gov/mmgis-maps/MSL/Layers/json/MSL_waypoints_current.json"
    );
    const data = await response.json();
    setCuriosityPosition(data);
  };

  const getCuriosityPhotos = async () => {
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?&api_key=${process.env.NEXT_PUBLIC_NASSA_API_KEY}`
    );
    const data = await response.json();
    setGallery(data);
  };

  const getPerseverancePhotos = async () => {
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?&api_key=${process.env.NEXT_PUBLIC_NASSA_API_KEY}`
    );
    const data = await response.json();
    setGallery(data);
  };

  // Compoment lifecycle
  useEffect(() => {
    getNasaDailyImage();
    getPerseverancePosition();
    getCuriosityPosition();
  }, []);

  useEffect(() => {
    !isModalOpen && setGallery([]);
  }, [isModalOpen]);

  return (
    <div className={styles.container}>
      {nasaDailyImage && nasaDailyImage.url && (
        <div className={styles.container_daily_image}>
          Another cool thing of Nasa Open API is the daily image of the day.
          This is the image of today:
          <div className={styles.container_daily_image_img}>
            {nasaDailyImage.media_type === "video" && (
              <iframe
                onMouseEnter={() => {
                  setCursorVariant("hidden");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                }}
                src={nasaDailyImage.url}
                className={styles.iframe}
              />
            )}
            {nasaDailyImage.media_type === "image" && (
              <Link
                href={nasaDailyImage.hdurl || "#"}
                target="_blank"
                onMouseEnter={() => {
                  setCursorText("Click to see hd image");
                  setCursorVariant("link");
                }}
                onMouseLeave={() => {
                  setCursorText("");
                  setCursorVariant("default");
                }}
              >
                <img src={nasaDailyImage.url} alt={nasaDailyImage.title} />
              </Link>
            )}
            <p>
              <strong>{nasaDailyImage.title}</strong>
            </p>
          </div>
        </div>
      )}
      <div className={styles.container_description}>
        <p>
          Nasa open API is a great way to get information about the space. In
          this case I have used to track the rovers in Mars. You can see{" "}
          <i>Perseverance</i> and <i>Curiosity</i> position and the last photos
          they have taken.
        </p>
        <p>
          Click on the rover icon to see the popup with the sol and the button
          to get the photos.
        </p>
      </div>
      <MapContainer
        center={[20, 100]}
        zoom={zoom}
        minZoom={zoom}
        maxZoom={7}
        scrollWheelZoom={true}
        className={styles.container_map}
      >
        <TileLayer attribution={attribution} url={baseLayer} tms={true} />
        {curiosityPosition && curiosityPosition.features && (
          <Marker
            icon={roverIcon}
            position={[
              curiosityPosition.features[0].geometry.coordinates[1],
              curiosityPosition.features[0].geometry.coordinates[0]
            ]}
          >
            <Popup>
              <h3>Curiosity</h3>
              <p>
                <strong>Sol: </strong>
                {curiosityPosition.features[0].properties.sol}
              </p>
              <button
                onMouseEnter={() => {
                  setCursorVariant("dot");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                }}
                className={styles.btn}
                onClick={() => {
                  getCuriosityPhotos();
                  setIsModalOpen(true);
                }}
              >
                Get photos
              </button>
            </Popup>
          </Marker>
        )}
        {perseverancePosition && perseverancePosition.features && (
          <Marker
            icon={roverIcon}
            position={[
              perseverancePosition.features[0].geometry.coordinates[1],
              perseverancePosition.features[0].geometry.coordinates[0]
            ]}
          >
            <Popup>
              <h3>Perseverance</h3>
              <p>
                <strong>Sol: </strong>
                {perseverancePosition.features[0].properties.sol}
              </p>
              <button
                className={styles.btn}
                onClick={() => {
                  getPerseverancePhotos();
                  setIsModalOpen(true);
                }}
                onMouseEnter={() => {
                  setCursorVariant("dot");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                }}
              >
                Get photos
              </button>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <Modal>
            <div className={styles.container_modal}>
              <div className={styles.container_modal__content}>
                {gallery &&
                  gallery.latest_photos &&
                  gallery.latest_photos.length > 0 &&
                  gallery.latest_photos.map((photo: any) => (
                    <motion.div
                      className={styles.container_modal__content__img}
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <Link target="_blank" href={photo.img_src}>
                        <img src={photo.img_src} alt={photo.id} />
                        <p>{photo.earth_date}</p>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mars;
