import logo from './skyFlightsLogo.jpeg';
import './App.css';
import Header from './components/Header';
import { FooterLinks } from './components/externalComponents/MantineFooter';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SearchForm from './components/SearchForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HeaderMegaMenu } from './components/externalComponents/MantineHeader';
import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconContext } from "react-icons"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Button, ButtonBase, IconButton, ThemeProvider, createTheme } from '@mui/material';
import MuiThemeProvider from '@mui/private-theming/ThemeProvider/ThemeProvider'
import { MantineProvider } from '@mantine/core';
import FlightListItem from './components/FlightListItem';
import dummyFlightData from './dummyFlightData.json'
import FlightMap from './components/FlightMap';
import WeatherIcon from './components/WeatherIcon';
import Booking from './components/Bookings';
import axios from 'axios';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState("dark");
  const [user, setUser] = useState({});

  const checkUser = async () => {
    try {
      const URL = `/api/users/user`;
      const response = await axios.get(URL, { withCredentials: true });
      setLoggedIn(() => true);
      setUser(() => response.data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    checkUser()
  }, []);

  useEffect(() => {
    if (darkMode === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleThemeSwitch = () => {
    setDarkMode(darkMode === "dark" ? "light" : "dark");
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  })

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    }
  })

  return (
    
    <ThemeProvider theme={darkMode === "dark" ? darkTheme : lightTheme}>
      <Router>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="App">
          
            <div className=' bg-white dark:bg-[#202124] transition-all duration-300'>
              <Header user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} darkMode={darkMode} handleThemeSwitch={handleThemeSwitch}/>
              
                {/* <WeatherIcon /> */}
                <Routes>
                  <Route path='/' element={<LandingPage darkMode={darkMode} user={user} loggedIn={loggedIn}/>}/>
                  <Route path='/bookings' Component={Booking}/>
                </Routes>
              
            </div>
          </div>  
        </LocalizationProvider>
      </Router>
    </ThemeProvider>
    
   
  );
}

export default App;
