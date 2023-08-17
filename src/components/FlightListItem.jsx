import React from 'react';
import { Timeline, Text, MantineProvider } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';
import FavouriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PlaceIcon from '@mui/icons-material/Place';
import { useState } from 'react';
import { dayCalendarSkeletonClasses } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import axios from 'axios';
import airlineLogosJson from '../airlines.json';
import airportsJson from '../airports.json'
import { Modal } from '@mui/material';
import FlightMap from './FlightMap';
import WeatherIcon from './WeatherIcon';
import dayjs from 'dayjs';

function FlightListItem( {darkMode, flightData, returnFlight, currency, setCurrency, adultValue, childrenValue, cabin, userID, user} ) {
    const [moreInfo, setMoreInfo] = useState(false);
    const [airlineName, setAirlineName] = useState("");
    const [airlineName2, setAirlineName2] = useState("")
    const [airlineLogo, setAirlineLogo] = useState("");
    const [airlineLogo2, setAirlineLogo2] = useState("");
    const [countryImage, setCountryImage] = useState("");
    const [open, setOpen] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [currencySymbol, setCurrencySymbol] = useState("£");

    // for future use
    const [stopovers, setStopovers] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const UNSPLASH_ACCESS_KEY = "K4KeY0zjsNDVng4XwKq1waPyiQ89-Ix3gMoo_CTMwZ8";
    // <button onClick={() => setMoreFilters(!moreFilters)} className='box-border text-white h-[57px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'>{moreFilters? "- Less Filters" : "+ More Filters"}</button>

    useEffect(() => {
        getAirlineInfo();
        getCountryImage(airlineName, UNSPLASH_ACCESS_KEY);
        const airportFrom = airportsJson.find((airport) => airport.iata == flightData.flyFrom);
        const airportTo = airportsJson.find((airport) => airport.iata == flightData.flyTo);
        setCoordinates([[airportFrom.lat, airportFrom.lon], [airportTo.lat, airportTo.lon]])
        setMoreInfo(false);
        getCurrencySymbol();
        // setSingleOrReturn(flightData.airline[0] ? false : true);
    }, [flightData]);

    const getAirlineInfo = () => {
        const airlineCode = airlineLogosJson.find((airline) => flightData.airline[0].toLowerCase() == airline.id.toLowerCase());
        const airlineCode2 = airlineLogosJson.find((airline) => flightData.airline[1]?.toLowerCase() == airline.id.toLowerCase());

        setAirlineName(airlineCode.name);
        setAirlineLogo(airlineCode.logo);

        if (flightData.airline[1]) {
            setAirlineName2(airlineCode2.name);
            setAirlineLogo2(airlineCode2.logo);
        } else {
            setAirlineName2(airlineCode.name);
            setAirlineLogo2(airlineCode.logo);
        }
    }

    const getCountryImage = async () => {
        // const response = await axios.get("https://api.unsplash.com/search/photos?page=1&query=${airlineName}&client_id={UNSPLASH_ACCESS_KEY}");
        const response2 = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${flightData.cityTo}&client_id=K4KeY0zjsNDVng4XwKq1waPyiQ89-Ix3gMoo_CTMwZ8`)
        setCountryImage(response2.data.results[Math.floor(Math.random() * 10)].urls.small);
    }

    const getCurrencySymbol = () => {
        const symbol = currency.slice(-3).slice(currency.length);
        const symbol2 = currency.substring(currency.length - 2, currency.length - 1)
        setCurrencySymbol(symbol2);
    }

    const departureDate = flightData.local_departure.substring(0, flightData.local_departure.indexOf("T"));
    const departureTime = flightData.local_departure.substring(flightData.local_departure.indexOf("T") + 1, flightData.local_departure.indexOf("Z"));
    const arrivalDate = flightData.local_arrival.substring(0, flightData.local_arrival.indexOf("T"));
    const arrivalTime = flightData.local_arrival.substring(flightData.local_arrival.indexOf("T") + 1, flightData.local_arrival.indexOf("Z"));
    
    let departureDateReturn 
    let departureTimeReturn
    let arrivalDateReturn
    let arrivalTimeReturn
    if (returnFlight == true) {
        departureDateReturn = flightData.routes[1].local_departure.substring(0, flightData.local_departure.indexOf("T"));
        departureTimeReturn = flightData.routes[1].local_departure.substring(flightData.local_departure.indexOf("T") + 1, flightData.local_departure.indexOf("Z"));
        arrivalDateReturn = flightData.routes[1].local_arrival.substring(0, flightData.local_arrival.indexOf("T"));
        arrivalTimeReturn = flightData.routes[1].local_arrival.substring(flightData.local_arrival.indexOf("T") + 1, flightData.local_arrival.indexOf("Z"));
    }

    console.log(flightData)

    const saveBooking = async () => {
        try {
            const response3 = await axios.get(`http://localhost:8080/users/user`, { withCredentials: true });

            const GETUSERID_URL = `http://localhost:8080/users/getUserID/${response3.data}`;
            const response2 = await axios.get(GETUSERID_URL, { withCredentials: true });
            console.log("usernameID: ", response2.data);    

            const URL = `http://localhost:8080/booking/create`;
            const response = await axios.post(URL, {
                flightID: 777,
                flightFrom: flightData.flyFrom,
                flightTo: flightData.flyTo,
                cityFrom: flightData.cityFrom,
                cityTo: flightData.cityTo,
                adults: adultValue,
                children: childrenValue,
                cabinType: cabin, 
                stopovers: stopovers,
                dateFrom: dayjs(departureDate).format('DD-MM-YYYY'),
                dateTo: dayjs(departureDateReturn).format('DD-MM-YYYY'),
                returnOrNot: returnFlight,
                price: Math.round((flightData.fare.adults*adultValue) + (flightData.fare.children*childrenValue)),
                user: {
                    userID: response2.data
                }
            } , { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <>
            <div className={`text-gray-600 place-items-stretch dark:text-gray-300 shadow-lg justify-between border-slate-300/30 dark:border-slate-100/10 rounded-3xl border-[1px] w-[1000px] max-w-[90%] h-[80vh] sm:h-[20vw] min-h-[330px] transition-all duration-300 ease-out mt-5 flex flex-col sm:flex-row mx-auto   ${moreInfo ? `min-h-[500px]` : `min-h-[25%]`} min-h-[230px] mx-auto transition-all duration-300 ease-out mt-28 sm:mt-0 overflow-scroll sm:overflow-hidden dark:bg-[#202124] animate-in slide-in-from-bottom fade-in ease-in-out`}>
                <div className='p-0 group overflow-hidden relative text-left border-0 border-solid border-white sm:w-[37%]'>
                    <div className='flex items-end justify-center p-1 top-2 left-2 absolute z-10 rounded-full text-white cursor-none] peer'>
                        <PlaceIcon />
                    </div>
                    <img    
                            src={countryImage}
                            className='z-0 group-hover:scale-110 rounded-tr-none rounded-br-none object-cover object-top h-[100%] w-full transition duration-150 ease-out cursor-pointer '
                        />
                    <div class="opacity-0 peer hover:opacity-100 duration-200 absolute inset-0 z-0 flex justify-center items-center text-xl text-white font-semibold bg-black/60 cursor-pointer"
                        onClick={handleOpen}>View in interactive map</div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <FlightMap coords={coordinates}/>
                    </Modal>
                    {/* </div> */}
                </div>
                {
                    returnFlight ? 
                    <>
                        
                        <div className={`border-0 border-solid border-black sm:w-[37%] pt-12 ${moreInfo ? ' pl-28' : 'pl-5'} transition-all ease-in-out duration-300`}>
                            <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>
                                <p className={`text-start -mt-7 font-bold mb-1 flex transition-all duration-300 ease-in-out ${moreInfo ? ' -ml-20 mb-6' : ''} flex-row`}>{airlineName}
                                <img 
                                    src={airlineLogo}
                                    style={{width: 20, height: 20, borderRadius: 8, marginLeft: 10, marginTop: 2}}
                                    alt="new"
                                />
                                </p>
                                <Timeline active={4} bulletSize={24} lineWidth={2} classNames={{ itemBody: `${moreInfo ? 'h-[320px] transition-all duration-300 ease-out' : 'h-[200px] transition-all duration-300 ease-out'}` }} >
                                    <Timeline.Item bullet={moreInfo ? <WeatherIcon date={departureDate} latitude={coordinates[0][0]} longitude={coordinates[0][1]}/> : <IconGitBranch size={12} />} title={`${flightData.cityFrom}, ${flightData.flyFrom}`}>
                                        <Text color="dimmed" size="sm" className='font-bold'>{departureTime.substring(0, 5)}<Text variant="link" component="span" inherit className='font-light'> - {departureDate}</Text></Text>
                                        <Text weight={400} size="md" mt={75}>{Math.round(flightData.duration / 7200) + ' hours'}, Direct</Text>
                                    </Timeline.Item>

                                    {/* <Timeline.Item bulletSize={12} in bullet={<IconGitCommit size={12}/>} title="Paris Charles de Gaule CDG"  lineVariant="dashed">
                                        <Text color="dimmed" size="sm">18:00<Text variant="link" component="span" inherit></Text></Text>
                                    </Timeline.Item>
                                    <Timeline.Item bulletSize={12} in bullet={<IconGitCommit size={12}/>} title="Paris Charles de Gaule CDG" >
                                        <Text color="dimmed" size="sm">18:00<Text variant="link" component="span" inherit></Text></Text>
                                        <Text size="xs" mt={4}>4 hours left</Text>
                                    </Timeline.Item> */}

                                    <Timeline.Item bullet={moreInfo ? <WeatherIcon date={arrivalDate} latitude={coordinates[1][0]} longitude={coordinates[1][1]}/> : <IconGitBranch size={12} />} title={`${flightData.cityTo}, ${flightData.flyTo}`}>
                                        <Text color="dimmed" size="sm" className='font-bold'>{arrivalTime.substring(0, 5)}<Text variant="link" component="span" inherit className='font-light'> - {arrivalDate}</Text></Text>
                                    </Timeline.Item>
                                </Timeline>
                            </MantineProvider>
                        </div>

                        <div className={`border-0 border-solid border-black sm:w-[37%] pt-12 ${moreInfo ? ' pl-28' : 'pl-5'} transition-all duration-300`}>

                            <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>
                                <p className={`text-start -mt-7 font-bold mb-1 flex transition-all duration-300 ease-in-out ${moreInfo ? ' -ml-20 mb-6' : ''} flex-row`}>{airlineName2}<img 
                                    src={airlineLogo2}
                                    style={{width: 20, height: 20, borderRadius: 8, marginLeft: 10, marginTop: 2}}
                                    alt="new"
                                /></p>
                                <Timeline active={4} bulletSize={24} lineWidth={2} classNames={{ itemBody: `${moreInfo ? 'h-[320px] transition-all duration-300 ease-out' : 'h-[200px] transition-all duration-300 ease-out'}` }} >
                                    <Timeline.Item bullet={moreInfo ? <WeatherIcon date={departureDateReturn} latitude={coordinates[1][0]} longitude={coordinates[1][1]}/> : <IconGitBranch size={12} />} title={`${flightData.routes[1].cityFrom}, ${flightData.routes[1].flyFrom}`}>
                                        <Text color="dimmed" size="sm" className='font-bold'>{departureTimeReturn.substring(0, 5)}<Text variant="link" component="span" inherit className='font-light'> - {departureDateReturn}</Text></Text>
                                        <Text weight={400} size="md" mt={75}>{Math.round(flightData.duration / 7200) + ' hours'}, Direct</Text>
                                    </Timeline.Item>

                                    {/* <Timeline.Item bulletSize={12} in bullet={<IconGitCommit size={12}/>} title="Paris Charles de Gaule CDG"  lineVariant="dashed">
                                        <Text color="dimmed" size="sm">18:00<Text variant="link" component="span" inherit></Text></Text>
                                    </Timeline.Item>
                                    <Timeline.Item bulletSize={12} in bullet={<IconGitCommit size={12}/>} title="Paris Charles de Gaule CDG" >
                                        <Text color="dimmed" size="sm">18:00<Text variant="link" component="span" inherit></Text></Text>
                                        <Text size="xs" mt={4}>4 hours left</Text>
                                    </Timeline.Item> */}

                                    <Timeline.Item bullet={moreInfo ? <WeatherIcon date={arrivalDateReturn} latitude={coordinates[0][0]} longitude={coordinates[0][1]}/> : <IconGitBranch size={12} />} title={`${flightData.routes[1].cityTo}, ${flightData.routes[1].flyTo}`}>
                                        <Text color="dimmed" size="sm" className='font-bold'>{arrivalTimeReturn.substring(0, 5)}<Text variant="link" component="span" inherit className='font-light'> - {arrivalDateReturn}</Text></Text>
                                    </Timeline.Item>
                                </Timeline>
                            </MantineProvider>
                        </div>
                    </>
                    :
                    <>
                        
                        <div className={`border-0 border-solid border-black sm:w-[37%] relative pt-12 ${moreInfo ? ' pl-32' : 'pl-5'} transition-all duration-300`}>
                            
                            <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>
                                <p className={`text-start -mt-7 font-bold mb-1 flex transition-all ease-in-out duration-300 ${moreInfo ? ' -ml-20 mb-6' : ''} flex-row`}>{airlineName}
                                <img 
                                    src={airlineLogo}
                                    style={{width: 20, height: 20, borderRadius: 8, marginLeft: 10, marginTop: 2}}
                                    alt="new"
                                />
                                </p>
                                <Timeline active={4} bulletSize={24} lineWidth={2} classNames={{ itemBody: `${moreInfo ? 'h-[320px] transition-all duration-300 ease-out' : 'h-[200px] transition-all duration-300 ease-out'}` }} >
                                    <Timeline.Item bullet={moreInfo ? <WeatherIcon date={departureDate} latitude={coordinates[0][0]} longitude={coordinates[0][1]}/> : <IconGitBranch size={12} />} title={`${flightData.cityFrom}, ${flightData.flyFrom}`}>
                                        <Text color="dimmed" size="sm" className='font-bold'>{departureTime.substring(0, 5)}<Text variant="link" component="span" inherit className='font-light'> - {departureDate}</Text></Text>
                                        <Text weight={400} size="md" mt={75}>{Math.round(flightData.duration / 3600) + ' hours'}</Text>
                                    </Timeline.Item>

                                    {/* <Timeline.Item bulletSize={12} in bullet={<IconGitCommit size={12}/>} title="Paris Charles de Gaule CDG"  lineVariant="dashed">
                                        <Text color="dimmed" size="sm">18:00<Text variant="link" component="span" inherit></Text></Text>
                                    </Timeline.Item>
                                    <Timeline.Item bulletSize={12} in bullet={<IconGitCommit size={12}/>} title="Paris Charles de Gaule CDG" >
                                        <Text color="dimmed" size="sm">18:00<Text variant="link" component="span" inherit></Text></Text>
                                        <Text size="xs" mt={4}>4 hours left</Text>
                                    </Timeline.Item> */}

                                    <Timeline.Item bullet={moreInfo ? <WeatherIcon date={arrivalDate} latitude={coordinates[1][0]} longitude={coordinates[1][1]}/> : <IconGitBranch size={12} />} title={`${flightData.cityTo}, ${flightData.flyTo}`}>
                                        <Text color="dimmed" size="sm" className='font-bold'>{arrivalTime.substring(0, 5)}<Text variant="link" component="span" inherit className='font-light'> - {arrivalDate}</Text></Text>
                                    </Timeline.Item>
                                </Timeline>
                            </MantineProvider>
                        </div>
                    </>
                }

                <div className=' relative flex flex-col text-right border-0 border-solid border-black sm:w-[20%] pt-12 pl-7 pr-7 items-end'>
                    <div className='float-right mb-5'>
                    <Checkbox style={{transform: "scale(1.5)"}} icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} sx={{
                        color: 'red',
                        '&.Mui-checked': {
                        color: 'red',
                        },
                    }}
                        onClick={saveBooking}
                    />
                    </div>
                    <p className='border-0 border-solid font-bold border-black text-2xl'>
                      {currencySymbol}{((flightData.fare.adults*adultValue) + (flightData.fare.children*childrenValue)).toFixed(2)} 
                    </p>

                    {flightData.availability.seats ? <p className='border-0 border-solid border-black'>{flightData.availability.seats} Tickets remaining</p> : <p className='border-0 border-solid border-black'></p>}

                    <button className={`p-2 mt-2 rounded-2xl text-xl border-solid border-slate-300 flex gap-2 border-[1px] hover:bg-slate-200/30 transition-all duration-200 active:bg-slate-500/30 hover:cursor-pointer`}
                        onClick={() =>{}}>
                        Select
                    </button>

                    <button className={`p-2 absolute bottom-6 rounded-3xl border-solid border-slate-300 flex gap-2 border-[1px] hover:bg-slate-200/30 transition-all duration-200 active:bg-slate-500/30 hover:cursor-pointer`}
                            onClick={() => setMoreInfo(!moreInfo)}>
                        {
                            moreInfo ? 
                                <>
                                    <RemoveIcon/>
                                    Less Info
                                </>
                                : 
                                <>
                                    <AddIcon/>
                                    More Info
                                </>
                        }
                    </button>
                </div>
            </div>
        </>
     );
}

export default FlightListItem;