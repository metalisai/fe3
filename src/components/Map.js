import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap, Marker} from "react-leaflet";
import L from "leaflet";
import Icon from "../Assets/Images/icon-location.svg";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const myIcon = L.icon({
  iconUrl: Icon,
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

export default function Map(props) {
  return (
    <MapContainer 
      center={[props.lat, props.lng]}
      zoom={13}   
      scrollWheelZoom={false}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}>
      <ChangeView center={[props.lat+0.01, props.lng]} zoom={13} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[props.lat, props.lng]} icon={myIcon} />
    </MapContainer>
  );
}
