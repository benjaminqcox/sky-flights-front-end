import React from 'react';
import { Timeline, Text, MantineProvider } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';
import FavouriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { dayCalendarSkeletonClasses } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import axios from 'axios';

function FlightListItem( {darkMode, flightData} ) {
    const [moreInfo, setMoreInfo] = useState(false);
    const [airlineName, setAirlineName] = useState("");
    // <button onClick={() => setMoreFilters(!moreFilters)} className='box-border text-white h-[57px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'>{moreFilters? "- Less Filters" : "+ More Filters"}</button>

    useEffect(() => {
        getAirlineName();
    }, [flightData]);

    const getAirlineName = async () => {
        try {
            const URL = `https://airlabs.co/api/v9/airlines?iata_code=${flightData.airline[0]}&api_key=c30a502d-4635-4f71-9cf9-ef78a72a0454`;
            const response = await axios.get(URL);
            setAirlineName(response.data.response[0].name)
        } catch (error) {
            console.log(error);
        }
    }

    const departureDate = flightData.local_departure.substring(0, flightData.local_departure.indexOf("T"));
    const departureTime = flightData.local_departure.substring(flightData.local_departure.indexOf("T") + 1, flightData.local_departure.indexOf("Z"));
    const arrivalDate = flightData.local_arrival.substring(0, flightData.local_arrival.indexOf("T"));
    const arrivalTime = flightData.local_arrival.substring(flightData.local_arrival.indexOf("T") + 1, flightData.local_arrival.indexOf("Z"));
    
    return ( 
        <>
            <div className={`text-gray-600 place-items-stretch dark:text-gray-300 shadow-lg justify-items-center border-slate-300/30 dark:border-slate-100/10 rounded-3xl border-[1px] w-[1000px] max-w-[90%] h-[80vh] sm:h-[20vw] min-h-[330px] transition-all duration-300 ease-out mt-5 flex flex-col sm:flex-row mx-auto   ${moreInfo ? `min-h-[50%]` : `min-h-[25%]`} min-h-[230px] mx-auto transition-all duration-300 ease-out mt-28 sm:mt-0 overflow-scroll sm:overflow-hidden`}>
                <div className='p-5 text-left boSßSrder-0 border-solid border-black sm:w-[37%]'>
                    <p className='text-xl font-semibold mb-1'>
                      {airlineName}  
                    </p>
                    <div className='bg-gray-500 h-[88%] rounded-xl'>
                    
                    </div>
                </div>
                <div className='border-0 border-solid border-black sm:w-[37%] pt-12 pl-5'>
                    <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>
                        <Timeline active={4} bulletSize={24} lineWidth={2} classNames={{ itemBody: `${'h-[200px]'}` }} >
                            <Timeline.Item bullet={<IconGitBranch size={12} />} title={`${flightData.cityFrom}, ${flightData.flyFrom}`}>
                                <Text color="dimmed" size="sm" className='font-bold'>{departureTime.substring(0, 5)}<Text variant="link" component="span" inherit className='font-light'> - {departureDate}</Text></Text>
                                <Text weight={400} size="md"ß mt={75}>{Math.round(flightData.duration / 3600) + ' hours'}</Text>
                            </Timeline.Item>

                            {/* <Timeline.Item bulletSize={12} in bullet={<IconGitCommit size={12}/>} title="Paris Charles de Gaule CDG"  lineVariant="dashed">
                                <Text color="dimmed" size="sm">18:00<Text variant="link" component="span" inherit></Text></Text>
                            </Timeline.Item>
                            <Timeline.Item bulletSize={12} in bullet={<IconGitCommit size={12}/>} title="Paris Charles de Gaule CDG" >
                                <Text color="dimmed" size="sm">18:00<Text variant="link" component="span" inherit></Text></Text>
                                <Text size="xs" mt={4}>4 hours left</Text>
                            </Timeline.Item> */}

                            <Timeline.Item bullet={<IconGitCommit size={12} />} title={`${flightData.cityTo}, ${flightData.flyTo}`}>
                                <Text color="dimmed" size="sm" className='font-bold'>{arrivalTime.substring(0, 5)}<Text variant="link" component="span" inherit className='font-light'> - {arrivalDate}</Text></Text>
                            </Timeline.Item>
                        </Timeline>
                    </MantineProvider>
                </div>
                <div className='flex flex-col text-right border-0 border-solid border-black sm:w-[26%] pt-12 pl-7 pr-7 items-end'>
                    <div className='float-right mb-5'>
                    <Checkbox style={{transform: "scale(1.5)"}} icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} sx={{
                        color: 'red',
                        '&.Mui-checked': {
                        color: 'red',
                        },
                    }}/>
                    </div>
                    <p className='border-0 border-solid font-bold border-black text-2xl'>
                      £{flightData.fare.adults}  
                    </p>

                    <p className='border-0 border-solid border-black'>
                      5 Tickets remaining  
                    </p>
                    <p className='border-0 border-solid border-black'>
                      1-50 People are viewing right now!  
                    </p>

                    <button className='p-2 mt-10 rounded-3xl border-solid border-slate-300 flex gap-2 border-[1px] hover:bg-slate-200/30 transition-all duration-200 active:bg-slate-500/30 hover:cursor-pointer'
                            onClick={() => setMoreInfo(!moreInfo)}>
                        <AddIcon/> More Info
                    </button>
                </div>
            </div>
        </>
     );
}

export default FlightListItem;