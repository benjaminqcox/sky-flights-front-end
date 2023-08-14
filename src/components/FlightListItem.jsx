import React from 'react';


function FlightListItem( {flightData} ) {

    return ( 
        <>
            <div className={`text-gray-600 place-items-stretch dark:text-gray-300 shadow-lg justify-items-center border-slate-300/30 dark:border-slate-100/10 rounded-3xl border-[1px] w-[1000px] max-w-[90%] h-[80vh] sm:h-[15vw] min-h-[230px] transition-all duration-300 ease-out mt-5 grid grid-rows-[1fr_1fr_0.8fr] sm:grid-cols-[1fr_1fr_0.8fr] mx-auto`}>
                <div className='p-5 text-left border-2 border-solid border-black w-full'>
                    <p></p>
                </div>
                <div className='border-2 border-solid border-black w-full'>
                    
                </div>
                <div className='border-2 border-solid border-black w-full'>
                    
                </div>
            </div>
        </>
     );
}

export default FlightListItem;