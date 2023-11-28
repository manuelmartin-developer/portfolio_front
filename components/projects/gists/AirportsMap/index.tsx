import styles from "./AirportsMap.module.scss";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import DeckGL from "@deck.gl/react";
import { ArcLayer } from "@deck.gl/layers/typed";
import { useState } from "react";
import { Map } from "react-map-gl";
import { useCursorStore } from "../../../../store/cursorStore";

const AirportsMap = () => {
  // Constants
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const AIR_PORTS =
    "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

  const INITIAL_VIEW_STATE = {
    latitude: 51.47,
    longitude: 0.45,
    zoom: 3,
    bearing: 0,
    pitch: 30,
    minZoom: 2
  };

  const MAP_STYLE =
    "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

  // Component states
  const [sourceLng, setSourceLng] = useState(2.078003349812917);
  const [sourceLat, setSourceLat] = useState(41.30315527974634);

  //   Store
  const { setCursorVariant } = useCursorStore();

  // Methods
  const onEnterAirport = () => {
    setCursorVariant("dot");
  };
  const onLeaveAirport = () => {
    setCursorVariant("default");
  };

  const onAirportClick = (airport: any) => {
    if (!airport.object) return;
    setSourceLng(airport.object.geometry.coordinates[0]);
    setSourceLat(airport.object.geometry.coordinates[1]);
  };

  // Layers
  const layers = [
    new GeoJsonLayer({
      id: "airports",
      data: AIR_PORTS,
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: (feature: any) => 11 - feature.properties.scalerank,
      getFillColor: [253, 158, 2, 180],
      pickable: true,
      autoHighlight: true,
      onClick: onAirportClick,
      onHover: (info: any) => {
        if (info.object) {
          onEnterAirport();
        } else {
          onLeaveAirport();
        }
      }
    }),
    new ArcLayer({
      id: "arcs",
      data: AIR_PORTS,
      dataTransform: (data: any) =>
        data.features.filter(
          (feature: any) => feature.properties.scalerank < 4
        ),
      getSourcePosition: () => [sourceLng, sourceLat],
      getTargetPosition: (feature: any) => feature.geometry.coordinates,
      getSourceColor: [33, 158, 188],
      getTargetColor: [253, 158, 2],
      getWidth: 1,
      updateTriggers: {
        getSourcePosition: [sourceLng, sourceLat]
      }
    })
  ];
  return (
    <div className={styles.airportsMap}>
      <DeckGL
        width={"100%"}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        // @ts-ignore
        layers={layers}
      >
        <Map
          mapStyle={MAP_STYLE}
          {...INITIAL_VIEW_STATE}
          mapboxAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  );
};

export default AirportsMap;
