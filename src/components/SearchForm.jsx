import { TextInput, Loader, Slider } from '@mantine/core';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';


function SearchForm () {
    
    const [loading, setLoading] = useState(false);
    
    
    return (  

        <>
            <div className="grid justify-items-center border-black border-2 w-[50%] min-w-[500px] h-[25%] mx-auto gap-2">
                <p className="text-3xl self-end font-bold font-sans">Search for Flights</p>
                <div className='flex w-[80%] h-min mx-auto gap-2'>
                    <TextInput
                        className='mx-auto h-max'
                        placeholder="From Location"
                        rightSection={loading ? <Loader size="xs" /> : <></>}
                    />
                    <TextInput
                        className='mx-auto'
                        placeholder="To Destination"
                        rightSection={loading ? <Loader size="xs" /> : <></>}
                    />
                    <DatePicker
                        label="Departure date"
                    />
                    <DatePicker
                        label="Arrival date"
                    />
                </div>                
                
            </div>
        </>
    );
}

export default SearchForm;