import {useContext, useEffect, useState} from "react";
import {LocationContext} from '../context/LocationContext'
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet'
import styled from 'styled-components';
import axios from 'axios'

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
  min-height: 900px;
  max-height: 80vh;
  padding: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;

  & span {
    display: block;
    font-size: 1rem;
    color: var( --span-font-color);
  }
`


// Demo key
const API_KEY = 'DEMO_KEY'

const Map = () => {
  const [cityLocation, setCityLocation] = useContext(LocationContext)
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDay()
    const myDate = `${y}-${m}-${d}`

  return (
    <StyledMapWrapper>
    {
    !cityLocation
      ?
      <span>The map will be displayed here.</span>
      :
        <MapContainer center={[cityLocation.lat, cityLocation.lon]} zoom={20} scrollWheelZoom={false} style={{ width: '100%', height: '900px'}}>
          <TileLayer
            url={`https://api.nasa.gov/planetary/earth/imagery?lon=${cityLocation.lon}&lat=${cityLocation.lat}&date=${myDate}&api_key=${API_KEY}`}
          />
          <Marker position={[cityLocation.lat, cityLocation.lon]}>
            <Popup>
              { cityLocation.name }
            </Popup>
          </Marker>
        </MapContainer>
      }
    </StyledMapWrapper>
  )
}

export default Map
