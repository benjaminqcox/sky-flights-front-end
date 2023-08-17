import React from "react";
import { useState } from "react";
import { Autocomplete, MantineProvider } from "@mantine/core"; 
import { useDisclosure } from '@mantine/hooks';
import { PasswordInput, Stack, TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import axios from "axios";

function Login ({darkMode, showLoginOrRegister, setShowLoginOrRegister, setLoggedIn, setUser}){
    const [username, setUsername] = useState('');

    const [password, setPassword] = useState("");
    const [visible, { toggle }] = useDisclosure(false);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const loginForm = new FormData();
        loginForm.append("username", username);
        loginForm.append("password", password)
        try {
            const URL = `http://localhost:8080/login`;
            const response = await axios.post(URL, loginForm);
            console.log("Login response data: ", response.data);
            setLoggedIn(() => true);
            setUser(() => response.data);
        } catch (error) {
            console.log(error);
        }
        setUsername("");
        setPassword("");
    }

    return (
        <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>
            <form className={`bg-white dark:bg-[#202124] text-gray-600 place-items-stretch dark:text-gray-300 shadow-2xl justify-items-center border-slate-300/30 dark:border-slate-100/10 rounded-3xl border-[1px] w-[500px] max-w-[70%] h-[30vh] sm:h-[30vh] min-h-[400px] transition-all duration-500 mt-5 flex flex-col p-5 gap-3 mx-auto absolute right-5 top-[80px] z-50 animate-in slide-in-from-top fade-in ease-in-out `}
                onSubmit={handleLogin}>
                <p className="sm:text-3xl font-['Roboto'] font-light mb-10">Login</p>

                <TextInput
                    icon={<IconAt size="0.8rem" />}
                    className="mx-auto"
                    // size='lg'
                    classNames={{ item: 'text-sm whitespace-prewrap break-normal', input: 'rounded-lg w-[330px]' }}
                    // className='mx-auto w-[50%] sm:w-auto'
                    value={username}
                    label="Username"
                    required
                    onChange={(event) => setUsername(event.currentTarget.value)}
                    // onClick={() => {setEmail("")}}
                    // rightsection={loading ? <Loader size="xs" /> : <></>}
                    placeholder="Enter username"
                    transitionProps={{ transition: 'pop-top-left', duration: 120, timingFunction: 'ease' }}
                />
                <Stack maw={380} mx="auto" className='mx-auto  w-[50%] sm:w-auto'>
                    <PasswordInput
                        label="Password"
                        classNames={{ item: 'text-sm whitespace-prewrap break-normal', input: 'rounded-lg w-[330px]' }}
                        className="mx-auto"
                        value={password}
                        placeholder="Enter password"
                        required
                        visible={visible}
                        onVisibilityChange={toggle}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                    />
                </Stack>

                <input type='submit' value="Login" className='mx-auto box-border w-[80%] text-white h-[40px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px]'/>
                <p className="sm:text-sg font-['Roboto'] font-light" onClick={() => setShowLoginOrRegister(!showLoginOrRegister)}>No account? <u>Register here</u></p>
            </form>
        </MantineProvider>
    )
}

export default Login;