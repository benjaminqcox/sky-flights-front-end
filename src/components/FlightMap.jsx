import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

const AirportCoords = [[0.4551, 51.4680], [12.2519, 41.8034], [73.7797, 40.6446]]

function lngLatToLatLng(lngLat) {
    return [lngLat[1], lngLat[0]];
}

const FlightMap = () => {
    return (
        <>
            <MapContainer center={lngLatToLatLng(AirportCoords[0])} zoom={12} scrollWheelZoom={false}>
            {AirportCoords.map((coords) => (
                    <Marker
                        key={coords[0]}
                        position={[
                            coords[1],
                            coords[0]
                        ]}
                        onClick={() => {
                            console.log(coords)
                        }}
                    />
                    )
                )}
                <Polyline positions={AirportCoords.map((coordPair) => lngLatToLatLng(coordPair))}/>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </>
    )
}

export default FlightMap;