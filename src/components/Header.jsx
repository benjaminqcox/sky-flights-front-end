import React, { useState, useEffect } from 'react';
import { HeaderMegaMenu } from './externalComponents/MantineHeader';
import logo from '../skyLogo.png'
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconContext } from "react-icons"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Button, ButtonBase, IconButton } from '@mui/material';
import Register from './Register';
import Login from './Login';
import Account from './Account';
import { motion, AnimatePresence } from "framer-motion";

function Header ({ user, setUser, loggedIn, setLoggedIn, darkMode, handleThemeSwitch }) {
    const [loginPopup, setLoginPopup] = useState(false);
    const [showLoginOrRegister, setShowLoginOrRegister] = useState(false);
    const [showAccount, setShowAccount] = useState(true);

    return (
            <header className="flex flex-row border-b-[1px] border-gray-600/30 dark:border-slate-300/30 justify-between self-center w-full h-[80px] sticky top-0 backdrop-blur z-50">
                <Link to="/"><img src={logo} className='w-[20vh] m-5 rounded-sm'></img></Link>
                
                <div className='flex my-auto m-5 gap-3'>
                    {/* <Button variant='contained' className='h-[50%] top-2 right-2'>Login</Button> */}
                    <IconButton onClick={handleThemeSwitch}>
                        {darkMode === "dark" ? <DarkModeIcon className='dark:text-slate-200'></DarkModeIcon> : <LightModeIcon></LightModeIcon>}
                    </IconButton>
                    {loggedIn === true ? 
                        <>
                        <Link> Hello, {user}
                            <IconButton>
                                <p className='text-blue-500 m-auto p-0'>
                                   <AccountCircleIcon fontSize='large' className='rounded-lg' onClick={() => setShowAccount(!showAccount)}/>
                                </p>
                            </IconButton>
                        </Link>
                        {
                            showAccount ? 
                            <>
                                <Account user={user} darkMode={darkMode}/>
                            </>
                            :
                            <>
                            </>
                        }
                        </>
                        : 
                        <>
                            <Link to="/login">
                                <button className='box-border text-gray-500 dark:text-slate-200 h-[40px] my-auto font-semibold border-gray-600/30 dark:border-slate-200/30 border-[1px] rounded-lg px-3 bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-100 dark:hover:bg-opacity-100 hover:border-blue-500 dark:hover:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'
                                        onClick={() => setLoginPopup(!loginPopup)}>Login/Register</button>
                            </Link>

                            
                            {
                                loginPopup ?
                                <>
                                    {
                                        showLoginOrRegister ? 
                                        <>
                                            <Login darkMode={darkMode} showLoginOrRegister={showLoginOrRegister} setShowLoginOrRegister={setShowLoginOrRegister} setLoggedIn={setLoggedIn} setUser={setUser}/>
                                        </>
                                        :
                                        <>
                                            
                                                <Register key={1} darkMode={darkMode} showLoginOrRegister={showLoginOrRegister} setShowLoginOrRegister={setShowLoginOrRegister} setLoggedIn={setLoggedIn} setUser={setUser}/>
                                        </>
                                    }
                                </>
                                :
                                <>
                                </>
                            }

                        </>
                    }
                </div>
            </header>
        
    );
}

export default Header;