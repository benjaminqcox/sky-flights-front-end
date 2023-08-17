import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import FlightListItem from './FlightListItem';
import dummyFlightData from '../dummyFlightData.json'
import axios from 'axios';
import { Loader } from '@mantine/core';

function LandingPage({darkMode, userID}) {

    const [listOfFlights, setListOfFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [returnFlight, setReturnFlight] = useState(false);
    const [currency, setCurrency] = useState("🇬🇧 GBP Pound Sterling (£)");
    const [noOfAdults, setNoOfAdults] = useState(1);
    const [noOfChildren, setNoOfChildren] = useState(0);
    const [cabin, setCabin] = useState("M");

    useEffect(() => {
        getFlights();
    }, []);
    
    const getFlights = async () => {
        try {
            setLoading(true);
            const URL = `http://localhost:8080/flights/getFiltered/?flyTo=JFK&flyFrom=LHR&leaveDateFrom=30/08/2023&leaveDateTo=30/08/2023&numberOfAdults=7`;
            const response = await axios.get(URL, { withCredentials: true });
            setListOfFlights(response.data)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    console.log(listOfFlights)

    return ( 
        <div className='w-[100vw] h-[100%] min-h-screen gap-10 mt-20 pb-80 flex-col flex justify-start p-0'>
            <SearchForm darkMode={darkMode} setFlights={setListOfFlights} setFlightListLoading={setLoading} setError={setError} returnFlight={returnFlight} setReturnFlight={setReturnFlight}
                currency={currency} setCurrency={setCurrency} adultValue={noOfAdults} setAdultValue={setNoOfAdults} childrenValue={noOfChildren} setChildrenValue={setNoOfChildren} setCabin={setCabin} cabin={cabin}/>

            {!error ? !loading ? listOfFlights.map((flight) => {

            return <FlightListItem darkMode={darkMode} flightData={flight} returnFlight={returnFlight} currency={currency} setCurrency={setCurrency} adultValue={noOfAdults} childrenValue={noOfChildren} cabin={cabin} userID={userID}/>
            }) 
            
            : 
            
            <p className='text-slate-700 text-xl dark:text-slate-200 flex items-center justify-center gap-3'><Loader/> Loading...</p>
            : <p className='text-slate-700 text-xl dark:text-slate-200 flex items-center justify-center gap-3'>No flights found - try changing your search parameters.</p>}

            {/* <Button className='w-[50%]'>Hello</Button> */}
        </div>
     );
}

export default LandingPage;