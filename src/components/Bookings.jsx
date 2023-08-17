import React, { useState, useEffect } from "react";
import axios from "axios";

const Booking = ({user}) => {
    const [bookings, setBookings] = useState([]);

    const getUserID = async () => {
        const URL = `http://localhost:8080/user/getUserID/user` + user;
        const response = await axios.get(URL, { withCredentials: true });
        return response.data;
    }

    const getBookings = async () => {
        const userID = await getUserID();
        const URL = `http://localhost:8080/booking/getByUserID/` + userID;
        const response = await axios.get(URL, { withCredentials: true });
        setBookings(response.data);
    }
    
    useEffect(() => {
        getBookings();
    }, []);

    return (
        <>
            <p>{bookings}</p>
        </>
    )
}

export default Booking;