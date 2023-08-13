import { TextInput, Loader, Slider } from '@mantine/core';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { DateRange, Today } from '@mui/icons-material';
import { TextField } from '@mui/material';


function SearchForm () {
    
    const [loading, setLoading] = useState(false);
    
    
    return (  

        <>
            <div className="text-gray-600 dark:text-gray-300 shadow-lg grid justify-items-center border-slate-300/30 dark:border-slate-100/10 rounded-3xl border-[1px] w-[1000px] max-w-[90%] h-[25%] min-h-[230px] mx-auto gap-5">
                <p className="text-3xl self-end font-['Montserrat'] font-light">Search for Flights</p>
                <div className='sm:flex w-[80%] h-min mx-auto gap-2'>
                    <div className='flex gap-2 w-[100%] sm:w-auto mb-4 sm:mb-0'>
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
                </div>                
                
            </div>
        </>
    );
}

export default SearchForm;