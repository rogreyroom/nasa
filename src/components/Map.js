import React, { useContext } from 'react';
import { LocationContext } from '../context/LocationContext';
import styled from 'styled-components';

// INFO: the below imports are commented due to the comment on line 61

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// import 'leaflet/dist/leaflet.css';

const StyledMapWrapper = styled.div`
  --span-font-color: #acacac;
  --wrapper-bg-color: #f5f5f5;
  --wrapper-border-color: #e7e7e7;
  --wrapper-border-size: 1px;
  --wrapper-border-radius: 5px;
  background: var(--wrapper-bg-color);
  border: solid var(--wrapper-border-size) var(--wrapper-border-color);
  border-radius: var(--wrapper-border-radius);
  width: 100%;
  min-height: 300px;
  max-height: 90vh;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  position: relative;

  & span {
    display: block;
    font-size: 1rem;
    color: var(--span-font-color);
  }

  & img {
    width: 100%;
    max-width: 880px;
    max-height: 70vw;
    height: auto;
  }
`;

// Demo key
const API_KEY = 'DEMO_KEY';

const Map = () => {
  // eslint-disable-next-line no-unused-vars
  const [cityLocation, setCityLocation] = useContext(LocationContext);
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDay();
  const myDate = `${y}-${m}-${d}`;
  const name = cityLocation?.name || '';
  const lon = cityLocation?.lon || 0;
  const lat = cityLocation?.lat || 0;
  const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${myDate}&api_key=${API_KEY}`;

  console.log(url);

  return (
    <StyledMapWrapper>
      {!cityLocation ? (
        <span>The map will be displayed here.</span>
      ) : (
        <img src={url} alt={name} />

        // INFO: Somehow the leaflet map is trying to create a matrix of images filling out the container for that reason the use of NASA imagery is useless as it provides only one thumbnail image of a given location.
        // INFO: Therefore I'm leaving the code here to change it with a better solution.

        // <MapContainer
        //   center={[lat, lon]}
        //   zoom={13}
        //   scrollWheelZoom={false}
        //   style={{ width: '100%', height: '900px' }}
        // >
        //   <TileLayer
        //     url={`https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${myDate}&api_key=${API_KEY}`}
        //   />
        //   <Marker
        //     position={[lat, lon]}
        //     icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
        //   >
        //     <Popup>{name}</Popup>
        //   </Marker>
        // </MapContainer>
      )}
    </StyledMapWrapper>
  );
};

export default Map;
