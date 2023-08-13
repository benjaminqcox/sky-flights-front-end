import { TextInput, Loader, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { DateRange, Today } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import MantineNumberInput from './externalComponents/MantineNumberInput';
import { SegmentedControl } from '@mantine/core';
import MultipleSelectCheckmarks from './externalComponents/MultipleSelectCheckmarks';
import { Slider } from '@mui/material'


function SearchForm ({darkMode}) {
    
    const [loading, setLoading] = useState(false);   
    const [moreFilters, setMoreFilters] = useState(false); 

    // Form state values
    const [adultValue, setAdultValue] = useState(0);
    const [childrenValue, setChildrenValue] = useState(0);
    const [infantsValue, setInfantsValue] = useState(0);
    const [cabin, setCabin] = useState("M");
    const [stopovers, setStopovers] = useState(0);

    const [value2, setValue2] = useState([0, 100]);
    const minDistance = 100;

    function valuetext(value) {
        return `${value}°C`;
    }

    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
        return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - minDistance);
            setValue2([clamped, clamped + minDistance]);
        } else {
            const clamped = Math.max(newValue[1], minDistance);
            setValue2([clamped - minDistance, clamped]);
        }
        } else {
        setValue2(newValue);
        }
    };

    
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
                <>
                    <div className='content-center self-center w-[80%] h-min mx-auto gap-2'>
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
                    </div>

                    {/* border-solid border-white border-[5px] Add this to the classname so we can see the DIV tag properly! */}
                    <div className='sm:flex self-center w-[80%] h-min mx-auto gap-2'>
                        <div className='w-[100%] border-solid'>
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

                            <div className='w-[100%] border-solid'>
                            <div className='sm:flex self-center h-min gap-2'>
                                <p className="text-lg self-center font-['Montserrat'] font-light w-[80px]">Max stopovers</p>
                                <MantineNumberInput value={stopovers} setValue={setStopovers}/>
                            </div>
                        </div>

                        <div className='w-[100%]'>
                              <p className="text-lg self-center font-['Montserrat'] font-light w-[40px]">Price</p>
                              <MultipleSelectCheckmarks/>
                              <p className="text-sg float-left self-center font-['Montserrat'] font-light w-[80px]">{`Min: £${value2[0]}`}</p>
                              <p className="text-sg float-right self-center font-['Montserrat'] font-light w-[80px]">{`Max: £${value2[1]}`}</p>

                                <Slider
                                    getAriaLabel={() => 'Minimum distance shift'}
                                    value={value2}
                                    onChange={handleChange2}
                                    valueLabelDisplay="auto"
                                    max={1000}
                                    getAriaValueText={valuetext}
                                    disableSwap
                                />
                        </div>
                    </div>

                    <div className='content-center self-center w-[80%] h-min mx-auto gap-2'>
                        <SegmentedControl 
                                transitionDuration={300}
                                transitionTimingFunction="linear"
                                radius="lg"
                                value={cabin}
                                onChange={(e) => setCabin(e)}
                                data={[
                                    { label: 'Travel on weekdays only', value: 'weekdays' },
                                    { label: 'Travel on weekends only', value: 'weekends' },
                                ]}
                                className='h-min rounded-full'
                        />
                    </div>
                </>
                : <></>}
                <button className='box-border text-white h-[40px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'>Submit</button>
            </div>
            </MantineProvider>
        </>
    );
}

export default SearchForm;