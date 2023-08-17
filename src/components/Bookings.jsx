import React, { useState, useEffect } from "react";
import axios from "axios";

const Booking = ({user}) => {
    console.log(user)
    const [bookings, setBookings] = useState([]);

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
        const userID = await getUserName();
        const URL = `http://localhost:8080/booking/getByUsername/` + userID;
        const response = await axios.get(URL, { withCredentials: true });
        setBookings(response.data);
    }
    
    useEffect(() => {
        getBookings();
    }, []);
    console.log(bookings)

    return (
        <>
            <p>{bookings}</p>
        </>
    )
}

export default Booking;