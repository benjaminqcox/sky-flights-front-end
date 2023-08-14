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
import FlightMap from './components/FlightMap';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState("dark");

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
              <Header loggedIn={loggedIn} darkMode={darkMode} handleThemeSwitch={handleThemeSwitch}/>

              <div className='w-[100vw] h-[100vh] flex-col flex justify-center p-0'>
                <SearchForm darkMode={darkMode}/>
                {/* <Button className='w-[50%]'>Hello</Button> */}
                <Routes>
                  <Route path='/map' Component={FlightMap}/>
                </Routes>
             
              </div>
              </div>
            </div>
            
          </LocalizationProvider>
        </Router>
      </ThemeProvider>
    
   
  );
}

export default App;
