import { TextInput, Loader, MantineProvider } from '@mantine/core';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { DateRange, Today } from '@mui/icons-material';
import { Button, Switch, TextField } from '@mui/material';
import MantineNumberInput from './externalComponents/MantineNumberInput';
import { SegmentedControl } from '@mantine/core';
import MultipleSelectCheckmarks from './externalComponents/MultipleSelectCheckmarks';
import { Slider } from '@mui/material';
import dayjs from 'dayjs';
import { HiArrowSmallRight, HiArrowsRightLeft } from 'react-icons/hi2';
import axios from 'axios';


function SearchForm ({darkMode, setFlights}) {
    
    const [loading, setLoading] = useState(false);   
    const [moreFilters, setMoreFilters] = useState(false); 

    // Form state values
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [departureDate, setDepartureDate] = useState(dayjs());
    const [returnDate, setReturnDate] = useState(null);
    const [adultValue, setAdultValue] = useState(0);
    const [childrenValue, setChildrenValue] = useState(0);
    const [infantsValue, setInfantsValue] = useState(0);
    const [cabin, setCabin] = useState("M");
    const [stopovers, setStopovers] = useState(0);
    const [travelDays, setTravelDays] = useState();

    const [returnFlight, setReturnFlight] = useState(false);

    const [value2, setValue2] = useState([0, 100]);
    const minDistance = 200;

    function valuetext(value) {
        return `${value}°C`;
    }

    const handlePriceChangeInputFields = (e, whichOne) => {
        
        let minPrice = value2[0];
        let maxPrice = value2[1];
        if (whichOne === 1) {
            setValue2([e.target.value, maxPrice])
        } else {
            setValue2([minPrice, e.target.value])
        }
    }

    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 3000 - minDistance);
                setValue2([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue2([clamped - minDistance, clamped]);
            }
        } else {
        setValue2(newValue);
        }
    };

    const handleReturnFlightToggle = (e) => {
        if (returnFlight) {
            setReturnDate(null);
        }
        setReturnFlight(e.target.checked);
        
    }

    const handleSubmit = async function(event) {
        event.preventDefault();
        try {
            const URL = `http://localhost:8081/booking/getFiltered/?flyTo=${toLocation}&flyFrom=${fromLocation}&leaveDateFrom=${departureDate.toDate().toLocaleDateString()}&leaveDateTo=${departureDate.toDate().toLocaleDateString()}`
            const response = await axios.get(URL)
            await setFlights(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (  

        <>
            {/* <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}> */}
            <form onSubmit={handleSubmit} className={`text-gray-600 dark:text-gray-300 shadow-lg grid justify-items-center border-slate-300/30 dark:border-slate-100/10 rounded-3xl border-[1px] w-[1000px] max-w-[90%] ${moreFilters ? `min-h-[50%]` : `min-h-[25%]`} min-h-[230px] mx-auto transition-all duration-300 ease-out mt-28 sm:mt-0 overflow-scroll`}>
                
                <div className='flex justify-evenly sm:justify-around w-[100%] mb-4'>
                    <div className='flex w-[250px] h-min self-end text-xs text-center items-center justify-center sm:justify-normal'>
                        <p className={`flex gap-1 ${!returnFlight ? 'text-blue-500 dark:text-blue-300' : ''}`}>One-way<HiArrowSmallRight fontSize={'1.2rem'}/></p>
                        <Switch 
                            className=' bottom-0'
                            checked={returnFlight}
                            onChange={handleReturnFlightToggle}
                            
                        />
                        <p className={`flex gap-1 ${returnFlight ? 'text-blue-500 dark:text-blue-300' : ''}`}><HiArrowsRightLeft fontSize={'1.2rem'}/>Return</p>
                        
                    </div>
                    <p className="text-[0] sm:text-3xl self-end font-['Montserrat'] font-light">Search for Flights</p>
                    <div className=' w-[0px] sm:w-[250px]'></div>
                </div>
                
                
                <div className='sm:flex self-center w-[80%] h-min mx-auto gap-2'>
                    <div className='flex gap-2 w-[100%] sm:w-auto mb-4 sm:mb-0'>
                        <TextField
                            className='mx-auto h-max w-[50%] sm:w-auto'
                            placeholder="From Location"
                            value={fromLocation}
                            onChange={(e) => setFromLocation(e.target.value)}
                            rightsection={loading ? <Loader size="xs" /> : <></>}
                        />
                        <TextField
                            className='mx-auto w-[50%] sm:w-auto'
                            placeholder="To Destination"
                            value={toLocation}
                            onChange={(e) => setToLocation(e.target.value)}
                            rightsection={loading ? <Loader size="xs" /> : <></>}
                        />
                    </div>
                    <div className='flex gap-2 mb-4 sm:mb-0'>
                        <DatePicker
                            label="Departing"
                            defaultValue={dayjs()}
                            value={departureDate}
                            maxDate={returnDate ? returnDate.subtract(1, "days") : ''}
                            onChange={(newValue) => setDepartureDate(newValue)}
                        />
                        {returnFlight ? 
                        <DatePicker
                            label="Returning"
                            value={returnDate}
                            minDate={departureDate.add(1, "days")}
                            onChange={(newValue) => setReturnDate(newValue)}
                        /> : <></>}
                    </div>
                    <button onClick={() => setMoreFilters(!moreFilters)} className='box-border text-white h-[57px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'>{moreFilters? "- Less Filters" : "+ More Filters"}</button>

                    {/* <div className='flex gap-2 w-[100%] sm:w-auto mb-4 sm:mb-0'>
                        <TextField/>
                    </div> */}
                </div>
                {moreFilters ? 
                <>
                    <div className='content-center self-center w-[80%] h-min mx-auto gap-2'>
                        <MantineProvider  theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>
                        <SegmentedControl 
                                transitionDuration={300}
                                transitionTimingFunction="linear"
                                radius="lg"
                                value={cabin}
                                color='indigo'
                                onChange={(e) => setCabin(e)}
                                data={[
                                    { label: 'Economy', value: 'M' },
                                    { label: 'Premium Economy', value: 'W' },
                                    { label: 'First Class', value: 'F' },
                                    { label: 'Business Class', value: 'B' },
                                ]}
                                className='h-min rounded-full'
                        />
                        </MantineProvider>
                    </div>

                    {/* border-solid border-white border-[5px] Add this to the classname so we can see the DIV tag properly! */}
                    <div className='sm:flex self-center w-[80%] h-min mx-auto gap-2'>
                        <div className='border-solid border-0 w-[33%]'>
                            <MantineProvider  theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>

                            <div className='sm:flex self-center h-min gap-2 my-1'>
                                <p className="text-lg self-center text-end font-['Roboto'] font-light tracking-wide w-[80px]">Adults</p>
                                <MantineNumberInput value={adultValue} setValue={setAdultValue}/>
                            </div>
                            <div className='sm:flex self-center h-min gap-2 my-1'>
                                <p className="text-lg self-center text-end font-['Roboto'] font-light tracking-wide w-[80px]">Children</p>
                                <MantineNumberInput value={childrenValue} setValue={setChildrenValue}/>
                            </div>

                            <div className='sm:flex self-center h-min gap-2 my-1'>
                                <p className=" text-lg self-center text-end font-['Roboto'] font-light tracking-wide w-[80px]">Infants</p>
                                <MantineNumberInput value={infantsValue} setValue={setInfantsValue}/>
                            </div>
                            </MantineProvider>
                        </div>

                        <div className='w-[33%] border-solid border-0'>
                            <div className='sm:flex self-center justify-center mx-auto h-min gap-2'>
                                <p className="text-lg self-center font-['Roboto'] font-light tracking-wide w-[60px]">Stops</p>
                                <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>
                                    <MantineNumberInput value={stopovers} setValue={setStopovers}/>
                                </MantineProvider>
                                
                            </div>
                            <MultipleSelectCheckmarks/>
                        </div>

                        <div className='w-[33%] border-solid border-0 flex flex-col gap-3'>
                              
                              <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} id="outlined-basic" label="Min Price" variant="outlined" value={value2[0]} onChange={(e) => {handlePriceChangeInputFields(e, 1)}}/>
                              <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} id="outlined-basic" label="Max Price" variant="outlined" value={value2[1]} onChange={(e) => {handlePriceChangeInputFields(e, 2)}}/>
                                <Slider
                                    getAriaLabel={() => 'Minimum distance shift'}
                                    value={value2}
                                    onChange={handleChange2}
                                    valueLabelDisplay="auto"
                                    max={3000}
                                    getAriaValueText={valuetext}

                                    
                                    style={{width: '90%'}}
                                />
                        </div>
                    </div>

                    <div className='content-center self-center w-[80%] h-min mx-auto gap-2'>
                        <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>
                            <SegmentedControl 
                                    transitionDuration={300}
                                    transitionTimingFunction="linear"
                                    radius="lg"
                                    value={travelDays}
                                    color='indigo'
                                    onChange={(e) => setTravelDays(e)}
                                    data={[
                                        { label: 'Travel on weekdays only', value: 'weekdays' },
                                        { label: 'Travel on weekends only', value: 'weekends' },
                                        { label: 'Travel on any day', value: 'both' },
                                    ]}
                                    className='h-min rounded-full'
                            />
                        </MantineProvider>
                    </div>
                </>
                : <></>}
                <button type='submit' className='box-border text-white h-[40px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'>Submit</button>
            </form>
            {/* </MantineProvider> */}
        </>
    );
}

export default SearchForm;