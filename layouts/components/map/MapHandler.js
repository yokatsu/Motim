import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';

import {states} from './data';
const Point=({markerFlag})=>{
  return(<Marker position={[-17.8466275, -57.0664407]} icon={new Icon({iconUrl: markerFlag, iconSize: [40, 40]})}><Popup>inscreva seu Motoclube</Popup></Marker>);
};

const MapComponent = ({markerFly}) => {  

  const [mapState,setMap] = useState([-17.8466275, -57.0664407]);
  
    return(<section className="section pb-[20px]">
    <div className="text-center conteiner">
    <h1 className="font-primary font-bold pb-[10px]">Eventos pelo Mundo</h1>
    <p className="mt-4 pb-[30px]">Cadastre eventos em seu estado</p>
   
    
    <MapContainer center={mapState} zoom={4} style={{width:"100%",height:"30rem"}} scrollWheelZoom={false}>
        
<TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
      }} positions={coordinate}
      key={state}
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
    }}><Point markerFlag={markerFly}/></Polygon> 
    );
   })}
  </MapContainer>
  
  </div></section>
  )

};

export default MapComponent;