import React, { useState } from 'react';
import SearchForm from './SearchForm';
import FlightListItem from './FlightListItem';
import dummyFlightData from '../dummyFlightData.json'

function LandingPage({darkMode}) {

    const [flights, setFlights] = useState([])

    return ( 
        <div className='w-[100vw] h-[100vh] -mt-[80px] flex-col flex justify-start p-0'>
            <SearchForm darkMode={darkMode}/>

            {dummyFlightData.map((data) => {
            console.log(data)
            return <FlightListItem darkMode={darkMode} flightData={data}/>
            })}

            {/* <Button className='w-[50%]'>Hello</Button> */}
        </div>
     );
}

export default LandingPage;