import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import FlightListItem from './FlightListItem';
import dummyFlightData from '../dummyFlightData.json'
import axios from 'axios';

function LandingPage({darkMode}) {

    const [listOfFlights, setListOfFlights] = useState([]);

    useEffect(() => {
        getFlights();
    }, []);

    const getFlights = async () => {
        try {
            const URL = `http://localhost:8081/booking/getFiltered/?flyTo=JFK&flyFrom=LHR&leaveDateFrom=30/08/2023&leaveDateTo=30/08/2023&numberOfAdults=7`;
            const response = await axios.get(URL);
            setListOfFlights(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    console.log(listOfFlights)

    return ( 
        <div className='w-[100vw] h-[100vh] -mt-[80px] flex-col flex justify-start p-0'>
            <SearchForm darkMode={darkMode} setFlights={setListOfFlights}/>

            {listOfFlights.map((flight) => {
            return <FlightListItem darkMode={darkMode} flightData={flight}/>
            })}

            {/* <Button className='w-[50%]'>Hello</Button> */}
        </div>
     );
}

export default LandingPage;