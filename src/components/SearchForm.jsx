import { TextInput, Loader, Slider, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { DateRange, Today } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import MantineNumberInput from './externalComponents/MantineNumberInput';
import { SegmentedControl } from '@mantine/core';
import MultipleSelectCheckmarks from './externalComponents/MultipleSelectCheckmarks';


function SearchForm ({darkMode}) {
    
    const [loading, setLoading] = useState(false);   
    const [moreFilters, setMoreFilters] = useState(false); 

    // Form state values
    const [adultValue, setAdultValue] = useState(0);
    const [childrenValue, setChildrenValue] = useState(0);
    const [infantsValue, setInfantsValue] = useState(0);
    const [cabin, setCabin] = useState("M");
    const [stopovers, setStopovers] = useState(0);
    
    return (  

        <>
            <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : ''}` }}>
            <div className={`text-gray-600 dark:text-gray-300 shadow-lg grid justify-items-center border-slate-300/30 dark:border-slate-100/10 rounded-3xl border-[1px] w-[1000px] max-w-[90%] ${moreFilters ? `h-[50%]` : `h-[25%]`} min-h-[230px] mx-auto transition-all duration-300 ease-out`}>
                <p className="text-3xl self-end font-['Montserrat'] font-light">Search for Flights</p>
                <div className='sm:flex self-center w-[80%] h-min mx-auto gap-2'>
                    <div className='flex gap-2 w-[100%] sm:w-auto mb-0'>
                        <TextField
                            className='mx-auto h-max w-[50%] sm:w-auto'
                            placeholder="From Location"
                            rightSection={loading ? <Loader size="xs" /> : <></>}
                        />
                        <TextField
                            className='mx-auto w-[50%] sm:w-auto'
                            placeholder="To Destination"
                            rightSection={loading ? <Loader size="xs" /> : <></>}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <DatePicker
                            label="Departing"
                        />
                        <DatePicker
                            label="Arriving"
                        />
                    </div>
                    <button onClick={() => setMoreFilters(!moreFilters)} className='box-border text-white h-[57px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'>+ More Filters</button>

                    {/* <div className='flex gap-2 w-[100%] sm:w-auto mb-4 sm:mb-0'>
                        <TextField/>
                    </div> */}
                </div>
                {moreFilters ? 
                    <div className=''>
                        <div className=''>
                            <div className='sm:flex self-center h-min gap-2'>
                                <p className="text-lg self-center font-['Montserrat'] font-light w-[80px]">Adults</p>
                                <MantineNumberInput value={adultValue} setValue={setAdultValue}/>
                            </div>
                            <div className='sm:flex self-center h-min gap-2'>
                                <p className="text-lg self-center font-['Montserrat'] font-light  w-[80px]">Children</p>
                                <MantineNumberInput value={childrenValue} setValue={setChildrenValue}/>
                            </div>

                            <div className='sm:flex self-center h-min gap-2'>
                                <p className=" text-lg self-center font-['Montserrat'] font-light  w-[80px]">Infants</p>
                                <MantineNumberInput value={infantsValue} setValue={setInfantsValue}/>
                            </div>
                        </div>

                            <SegmentedControl 
                                transitionDuration={300}
                                transitionTimingFunction="linear"
                                radius="lg"
                                value={cabin}
                                onChange={(e) => setCabin(e)}
                                data={[
                                    { label: 'Economy', value: 'M' },
                                    { label: 'Premium Economy', value: 'W' },
                                    { label: 'First Class', value: 'F' },
                                    { label: 'Business Class', value: 'B' },
                                ]}
                                className='h-min rounded-full'
                            />


                        <MultipleSelectCheckmarks/>

                        <p className="text-xl self-end font-['Montserrat'] font-light">Max Stopovers</p>
                        <div className='sm:flex self-center w-[80%] h-min mx-auto gap-2'>
                            <MantineNumberInput value={stopovers} setValue={setStopovers}/>
                        </div>
                    </div>
                : <></>}
                <button className='box-border text-white h-[40px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'>Submit</button>
            </div>
            </MantineProvider>
        </>
    );
}

export default SearchForm;