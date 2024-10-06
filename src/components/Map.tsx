"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { posix } from "path";

interface MapProps {
    zoom?: number,
    posix?: LatLngTuple,
}

const defaults = {
    posix: [4.79029, -75.69003] as LatLngTuple,
    zoom: 19,
}

const Map = (Map: MapProps) => {
    const { zoom = defaults.zoom, posix = defaults.posix } = Map

    return (
        <MapContainer
            center={posix}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={posix} draggable={false}>
                <Popup>Hey ! I study here</Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map