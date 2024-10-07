"use client"

import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvent, LayersControl, Marker, Popup, FeatureGroup, Circle, Rectangle, useMap } from "react-leaflet";
import L, { LatLngTuple } from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
    zoom?: number,
    posix?: LatLngTuple,
}

const defaults = {
    posix: [0, 0] as LatLngTuple, // Center of the world
    zoom: 2, // Zoom level to show the whole world
}

const SetViewOnClick = ({ animateRef }: { animateRef: React.MutableRefObject<boolean> }) => {
    useMapEvent('click', (e) => {
        const map = e.target as L.Map;
        map.setView(e.latlng, map.getZoom(), {
            animate: animateRef.current,
        });
    });

    return null;
}

// search control functionality 
const SearchControl = () => {
    const map = useMap() as L.Map;
    useEffect(() => {
        const searchControl = GeoSearchControl({
            provider: new OpenStreetMapProvider(),
            autoComplete: true,
            autoCompleteDelay: 250,
            style: 'button',
            showMarker: true,
            animateZoom: true,
            updateMap: true,
        });
        map.addControl(searchControl);
        return () => {
            map.removeControl(searchControl);
        };
    }, [map]);

    return null;
};

// live precipitation data 
const TAPIKEY = process.env.TOMORROW_API_KEY
const DATA_FIELD = 'precipitationIntensity'

const TIMESTAMP = (new Date()).toISOString()

const addPrecipitationLayer = (map: L.Map) => {
    if (!TAPIKEY) {
        console.error("TOMORROW_API_KEY is not set");
        return;
    }
    const tileLayer = L.tileLayer(`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${DATA_FIELD}/${TIMESTAMP}.png?apikey=${TAPIKEY}`, {
        attribution: '&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>',
    });
    tileLayer.addTo(map);
    return tileLayer;
};

const PrecipitationLayer = () => {
    const map = useMap() as L.Map;
    useEffect(() => {
        const tileLayer = addPrecipitationLayer(map);
        return () => {
            if (tileLayer) {
                map.removeLayer(tileLayer);
            }
        };
    }, [map]);

    return null;
};

const Map = ({ zoom = defaults.zoom, posix = defaults.posix }: MapProps) => {
    const animateRef = useRef(true); // Set default animation to true
    const center: LatLngTuple = [51.505, -0.09];
    const rectangle: LatLngTuple[] = [
        [51.49, -0.08],
        [51.5, -0.06],
    ];
    
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
            <LayersControl position="topright">
                <LayersControl.Overlay name="Precipitation">
                    <FeatureGroup>
                        <PrecipitationLayer />
                    </FeatureGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Soil Moisture">
                    <Marker position={center}/>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Flood Risk Zones">
                    <FeatureGroup pathOptions={{ color: 'purple' }}>
                        <Popup>Popup in FeatureGroup</Popup>
                        <Circle center={[51.51, -0.06]} radius={200} />
                        <Rectangle bounds={rectangle} />
                    </FeatureGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Drought Risk Zones">
                    <FeatureGroup pathOptions={{ color: 'purple' }}>
                        <Circle center={[51.51, -0.06]} radius={200} />
                    </FeatureGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Vegetation">
                    <FeatureGroup pathOptions={{ color: 'purple' }}>
                        <Popup>Popup in FeatureGroup</Popup>
                        <Circle center={[51.51, -0.06]} radius={200} />
                        <Rectangle bounds={rectangle} />
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
            <SetViewOnClick animateRef={animateRef} />
            <SearchControl />
        </MapContainer>
    )
}

export default Map
