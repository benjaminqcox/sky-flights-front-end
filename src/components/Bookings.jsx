import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import { SocialIcon } from 'react-social-icons';
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { Transition } from "@mantine/core";

const Booking = () => {
    // console.log(user)
    const [bookings, setBookings] = useState([]);
    const [toDelete, setToDelete] = useState();

    const getUserName = async () => {
        const URL = `http://localhost:8080/users/user/`;
        const response = await axios.get(URL, { withCredentials: true });
        return response.data;
    }

    const getUserID = async () => {
        const user = await getUserName();
        const URL = `http://localhost:8080/users/getUserID/` + user;
        const response = await axios.get(URL, { withCredentials: true });
        return response.data.data;
    }

    const getBookings = async () => {
        const userName = await getUserName();
        const URL = `http://localhost:8080/users/getByUsername/` + userName;
        const response = await axios.get(URL, { withCredentials: true });
        setBookings(response.data.bookings);
    }
    
    useEffect(() => {
        getBookings();
    }, []);
    console.log(bookings)

    const cancelBooking = async (bookingID) => {
        setToDelete(bookingID);
        try {
            const URL = `http://localhost:8080/booking/deleteBookingById/${bookingID}`
            const response = await axios.delete(URL, { withCredentials: true });
            enqueueSnackbar('Booking cancelled', {variant: 'default',
            anchorOrigin: {
                vertical: 'bottom',
            horizontal: 'right'
            }}
        )
        } catch (error) {
            enqueueSnackbar('Error: unable to cancel booking - may have already been cancelled.', {variant: 'error',
            anchorOrigin: {
                vertical: 'bottom',
            horizontal: 'right'
            }})
        }   
        
        setTimeout(() => {
            getBookings()
            setToDelete(9999999999)
        }, 1000)  
    }

    const animate = {
        in: { opacity: 1 },
        out: { opacity: 0 },
        transitionProperty: 'opacity'
    }

    return (
        <SnackbarProvider>
        <div className='w-[100vw] h-[100%] min-h-screen gap-[30px] mt-20 pb-80 flex-col flex justify-start p-0 scroll-smooth'>
            
            {
                bookings.map((b) => {
                    return (
                        <>
                            <div className={` flex flex-col sm:flex-row h-[350px] justify-between mx-auto dark:text-white border-[1px] border-slate-300/80 dark:border-slate-300/20 rounded-xl w-[80%] max-w-[800px] text-start p-10 shadow-lg dark:shadow-black/40 ${toDelete == b.bookingID ? ' -translate-y-96 opacity-0 duration-1000' : (b.bookingID > toDelete && toDelete !== 9999999999) ? 'transition-all animate-bookingsup duration-1000' : '' }`}>
                                <div className="w-[100%] mb-6 sm:mb-0 sm:w-[50%] border-0 border-black">
                                    <p className="text-2xl">{b.cityFrom}, {b.flightFrom} - {b.cityTo}, {b.flightTo}</p>
                                    <p className="text-slate-500  dark:text-slate-300 text-xl">Departing: <span className="font-bold">{b.dateFrom}</span></p>
                                    {b.returnOrNot && <p className="text-slate-500 dark:text-slate-300 text-xl">Returning: <span className="font-bold">{b.dateTo}</span></p>}
                                    <p className="font-semibold text-blue-500">{b.returnOrNot ? <span className="text-cyan-500">Return flight</span> : <span className="text-teal-500">One-way flight</span>}</p>
                                    <br></br>
                                    <p key={b.bookingID} className="text-slate-500  dark:text-slate-300"><span className="font-semibold">Booking ID: </span>{b.bookingID}</p>
                                    <p className="text-slate-500 dark:text-slate-300"><span className="font-semibold">Price:</span> £{b.price}</p>
                                    <p className="text-slate-500 dark:text-slate-300"><span className="font-semibold">Cabin:</span> {b.cabinType}</p>
                                    
                                    <p className="text-slate-500 dark:text-slate-300"><span className="font-semibold">Adults:</span> {b.adults}</p>
                                    <p className="text-slate-500 dark:text-slate-300"><span className="font-semibold">Children:</span> {b.children}</p>
                                </div>
                                <div className="flex flex-col w-[100%] sm:w-[30%] border-0 border-black gap-5 py-2">
                                    <button type='submit' className='box-border text-white h-[40px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'>View Booking</button>
                                    <button type='submit' className='box-border text-white h-[40px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'>Edit Booking</button>
                                    <button onClick={() => cancelBooking(b.bookingID)} type='submit' className='box-border text-white h-[40px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-red-500 dark:border-red-700 hover:text-white shadow-black hover:shadow-md bg-red-500 dark:bg-red-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'>Cancel Booking</button>
                                    <div className="flex flex-row justify-evenly">
                                        <SocialIcon url="https://facebook.com" bgColor="#2563eb"/>
                                        <SocialIcon url="https://instagram.com"/>
                                        <SocialIcon url="https://whatsapp.com"/>
                                    </div>
                                </div>
                            </div>
                        </>
                        )
                })
            }
        </div>
        </SnackbarProvider>
    )
}

export default Booking;