import React, {useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import axios from "axios";

const AirportICAOCodes = ["KJFK", "EGLL", "LIRF"]

function lngLatToLatLng(lngLat) {
    return [lngLat[1], lngLat[0]];
}

const icaoToCoords = async (icao) => {
    var config = {
      method: 'get',
      url: 'https://api.checkwx.com/metar/' + icao + '/decoded',
      headers: { 'X-API-Key': 'c4aeb4c15f084c32996d1c55e2' }
    };
    
    const res = await axios(config);
    console.log(res.data.data[0].station.geometry.coordinates);
    return res.data.data[0].station.geometry.coordinates;   

}

const FlightMap = () => {
    const [allCoords, setAllCoords] = useState([]);

    useEffect(() => {
        //need to sort this to get the coords from icao, its almost there
        const getCoords = async () => {
            return Promise.all(AirportICAOCodes.map((code) => icaoToCoords(code)))
        }
        getCoords().then(data => setAllCoords(data));    
        
    }, []);
    return (
        <>
            {allCoords.length &&
                <MapContainer center={lngLatToLatLng(allCoords[0])} zoom={12} scrollWheelZoom={false}>
                {allCoords.map((coordPair) => <Marker key={coordPair[0]} position={lngLatToLatLng(coordPair)}/>
                )}
                    <Polyline positions={allCoords.map((coordPair) => lngLatToLatLng(coordPair))}/>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            }
        </>
    )
}

export default FlightMap;