import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {states} from './data';
const MapComponent = () => {
    return(
    <MapContainer center={[-17.8466275, -57.0664407]} zoom={4} style={{width:"100%",height:"30rem"}} scrollWheelZoom={false}>
   <TileLayer
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />
   {states.features.map((state)=>{
    const coordinate = state.geometry.coordinates[0].map((item)=> [item[1],item[0]]);

    return(
      <Polygon pathOptions={{
        fillColor:'#666',
        fillOpacity: 0.7,
        weight: 2,
        opacity: 1,
        dashArray: 3,
        color: 'white'
      }} positions={coordinate} key={state}
eventHandlers={{
mouseover:(e)=>{
const layer = e.target;
layer.setStyle({
        fillOpacity: 0.7,
        weight: 5,
        dashArray: '',
        color: '#666'});
},
mouseout:(e)=>{
const layer = e.target;
layer.setStyle({
        
        fillOpacity: 0.7,
        weight: 2,
        opacity: 1,
        dashArray: 3,
        color: 'white'});
}
}}/>
    );
   })}
  </MapContainer>
  )
};

export default MapComponent;