import React from "react";
import dynamic from "next/dynamic";
const MapHandler = dynamic(() => import("./MapHandler"), {ssr:false,});

export default MapHandler;