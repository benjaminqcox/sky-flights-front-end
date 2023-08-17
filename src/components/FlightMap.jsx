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

const FlightMap = (  coords  ) => {
    // const [allLatLng, setAllLatLng] = useState([]);

    // useEffect(() => {
    //     //need to sort this to get the coords from icao, its almost there
    //     const getLatLng = async () => {
    //         return Promise.all(AirportIATACodes.map((code) => iataToCoords(code)))
    //     }
    //     getLatLng().then(data => setAllLatLng(data));
        
    // }, []);
    console.log(coords.coords)

    //const centreLat = (parseFloat(coords.coords[0][0]) + parseFloat(coords.coords[1][0]))/2;

    //const radius = Math.sqrt((parseFloat(coords.coords[0][0]) - parseFloat(coords.coords[0][1]))**2 + (parseFloat(coords.coords[1][0]) - parseFloat(coords.coords[1][1]))**2)

    //const zoom = Math.floor(Math.log2 ((Math.cos(centreLat * Math.pi/180) * 2*Math.pi* 6371008*1)/radius))

    return (
        <>
            {coords.coords.length &&
                <MapContainer center={[(parseFloat(coords.coords[0][0]) + parseFloat(coords.coords[1][0]))/2, (parseFloat(coords.coords[0][1]) + parseFloat(coords.coords[1][1]))/2] } zoom={2} scrollWheelZoom={true}>
                {coords.coords.map((latLng) => <Marker key={latLng[0]} position={latLng}/>)}
                    <Polyline positions={coords.coords}/>
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