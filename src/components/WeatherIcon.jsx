import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "@mantine/core";

const TOKEN = '9c52a8a268a94a068e0111218231508'

const getDaysBetweenDates = (date1, date2) =>  {
    // Dates must be new Date() objects
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const millisecondsBetweenDates = date1.getTime() - date2.getTime();
    return Math.ceil(millisecondsBetweenDates / millisecondsInADay);
}

const WeatherIcon = ({date, latitude, longitude}) => { //needs params of latitude, longitude and date. Can add time if we need to be more specific
    const [weatherInfo, setWeatherInfo] = useState();

    console.log(date, latitude, longitude)

    useEffect(() => {
        getWeather(date).then((weather) => setWeatherInfo(weather));
    }, []);

    const getWeather = async (chosenDate) => {
        const daysBetween = getDaysBetweenDates(new Date(chosenDate), new Date()) + 1;
        // new Date(date) -> chosen date which is what will be found in props
        // new Date() -> date now
        let allWeather = daysBetween > 14 ? await getFutureWeather(date, latitude, longitude) : await getCurrentWeather(daysBetween, latitude, longitude);
        let singleDayWeather = allWeather.forecast.forecastday.slice(-1)[0];
        return singleDayWeather;
    }
    const getFutureWeather = async (date, lat, lon) => {
        // can get hourly but will need to know the time of the flight to specify
        // this is within 14 and 300 days in the future 
        //lat -> double -> e.g. 51.4680
        //lon -> double -> e.g. 0.4551
        //date -> string -> 2023-10-14
        const resp = await axios.get(`http://api.weatherapi.com/v1/future.json?key=${TOKEN}&q=${lat}, ${lon}&dt=${date}`)
        const data = resp.data;
        return(data);
    }

    const getCurrentWeather = async (forecastDays, lat, lon) => {
        // can get hourly but will need to know the time of the flight to specify
        // this is up to 10 days in the future
        //lat -> double -> e.g. 51.4680
        //lon -> double -> e.g. 0.4551
        //forecastDays -> int -> max 14 days
        const resp = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${TOKEN}&q=${lat}, ${lon}&days=${forecastDays}&aqi=no&alerts=no`)
        const data = resp.data;
        return(data);
    }

    return (
        <>
            
            {
                weatherInfo ? 
                // <div style={{marginLeft: "auto", marginRight: "auto"}}>
                    // <p style={{textAlign: 'left', color: 'white'}}>{`Location (longitude, latitude): ${longitude}, ${latitude}`}</p>
                    // <p style={{textAlign: 'left', color: 'white'}}>{`Date: ${weatherInfo.date}`}</p>
                    // <p style={{textAlign: 'left', color: 'white'}}>{`Description: ${weatherInfo.day.condition.text}`}</p>
                    // <p style={{textAlign: 'left', color: 'white'}}>{`Average temp: ${weatherInfo.day.avgtemp_c}°C`}</p>
                    <p className=" animate-popInWeather transition-all  flex rounded-xl bg-black/60 px-3 -translate-x-12 items-center text-bold">{weatherInfo.day.avgtemp_c}°C<img src={weatherInfo.day.condition.icon} className={`${weatherInfo.day.condition.text === "Sunny" ? 'scale-[1.6]' : 'scale-[1.2]'}`} /></p> : <p><Loader/></p>
                // </div>
                
            }
            

        </>
    
    )
}

export default WeatherIcon;