import React, {useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import axios, { all } from "axios";

const AirportICAOCodes = ["KJFK", "EGLL", "LIRF"];
const AirportIATACodes = ["DEL", "LHR", "CDG"];

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
    return res.data.data[0].station.geometry.coordinates;   

}

const iataToCoords = async (iata) => {
    // Value of Token
    const token = 'Gmss-7DE9NkgyWvWK7k9oDHg-q9gn7c8YbTg3U2SPrA'
    const resp = await axios.get('https://avwx.rest/api/station/' + iata, {
        headers: {
            Authorization: 'BEARER ' + token
        }
    })
    const data = resp.data;
    return([data.latitude, data.longitude]);
}

const FlightMap = () => {
    const [allLatLng, setAllLatLng] = useState([]);

    useEffect(() => {
        //need to sort this to get the coords from icao, its almost there
        const getLatLng = async () => {
            return Promise.all(AirportIATACodes.map((code) => iataToCoords(code)))
        }
        getLatLng().then(data => setAllLatLng(data));
        
    }, []);
    return (
        <>
            {allLatLng.length &&
                <MapContainer center={allLatLng[0]} zoom={12} scrollWheelZoom={false}>
                {allLatLng.map((latLng) => <Marker key={latLng[0]} position={latLng}/>)}
                    <Polyline positions={allLatLng}/>
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