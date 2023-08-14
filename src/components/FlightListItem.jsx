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

function FlightListItem( {darkMode, flightData} ) {
    const [moreInfo, setMoreInfo] = useState(false);
    // <button onClick={() => setMoreFilters(!moreFilters)} className='box-border text-white h-[57px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'>{moreFilters? "- Less Filters" : "+ More Filters"}</button>

    const departureDate = flightData.local_departure.substring(0, flightData.local_departure.indexOf("T"));
    const departureTime = flightData.local_departure.substring(flightData.local_departure.indexOf("T") + 1, flightData.local_departure.indexOf("Z"));
    const arrivalDate = flightData.local_arrival.substring(0, flightData.local_arrival.indexOf("T"));
    const arrivalTime = flightData.local_departure.substring(flightData.local_arrival.indexOf("T") + 1, flightData.local_arrival.indexOf("Z"));
    
    return ( 
        <>
            <div className={`text-gray-600 place-items-stretch dark:text-gray-300 shadow-lg justify-items-center border-slate-300/30 dark:border-slate-100/10 rounded-3xl border-[1px] w-[1000px] max-w-[90%] h-[80vh] sm:h-[20vw] min-h-[330px] transition-all duration-300 ease-out mt-5 flex flex-col sm:flex-row mx-auto   ${moreInfo ? `min-h-[50%]` : `min-h-[25%]`} min-h-[230px] mx-auto transition-all duration-300 ease-out mt-28 sm:mt-0 overflow-scroll`}>
                <div className='p-5 text-left boSßSrder-0 border-solid border-black sm:w-[37%]'>
                    <p className='text-xl'>
                      Emirates  
                    </p>
                    <div className='bg-gray-500 h-[90%] rounded-xl'>
                    
                    </div>
                </div>
                <div className='border-0 border-solid border-black sm:w-[37%] pt-7 pl-5'>
                    <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>
                        <Timeline active={4} bulletSize={24} lineWidth={2}>
                            <Timeline.Item bullet={<IconGitBranch size={12} />} title={`${flightData.cityFrom + ' ' + flightData.flyFrom}`}>
                                <Text color="dimmed" size="sm">{departureTime.substring(0, 5)}<Text variant="link" component="span" inherit></Text></Text>
                                <Text size="xs"ß mt={4}>{Math.round(flightData.duration / 3600) + ' hours'}</Text>
                            </Timeline.Item>

                            {/* <Timeline.Item bulletSize={12} in bullet={<IconGitCommit size={12}/>} title="Paris Charles de Gaule CDG"  lineVariant="dashed">
                                <Text color="dimmed" size="sm">18:00<Text variant="link" component="span" inherit></Text></Text>
                            </Timeline.Item>
                            <Timeline.Item bulletSize={12} in bullet={<IconGitCommit size={12}/>} title="Paris Charles de Gaule CDG" >
                                <Text color="dimmed" size="sm">18:00<Text variant="link" component="span" inherit></Text></Text>
                                <Text size="xs" mt={4}>4 hours left</Text>
                            </Timeline.Item> */}

                            <Timeline.Item bullet={<IconGitCommit size={12} />} title={`${flightData.cityTo} + ${flightData.flyTo}`}>
                                <Text color="dimmed" size="sm">{arrivalTime.substring(0, 5)}<Text variant="link" component="span" inherit></Text></Text>
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