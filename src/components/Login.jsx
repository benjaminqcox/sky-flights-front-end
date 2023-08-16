import React from "react";
import { useState } from "react";
import { Autocomplete, MantineProvider } from "@mantine/core"; 
import { useDisclosure } from '@mantine/hooks';
import { PasswordInput, Stack, TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import Login from './Login';

function Register ({darkMode, showLoginOrRegister, setShowLoginOrRegister}){
    const [email, setEmail] = useState('');
    const emailFormat =
    email.trim().length > 0 && !email.includes('@')
        ? ['gmail.com', 'hotmail.co.uk', 'yahoo.com'].map((provider) => `${email}@${provider}`)
        : [];

    const [password, setPassword] = useState("");
    const [visible, { toggle }] = useDisclosure(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmail("");
        setPassword("");
    }

    return (
        <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>
            <form className={`bg-white dark:bg-[#202124] text-gray-600 place-items-stretch dark:text-gray-300 shadow-2xl justify-items-center border-slate-300/30 dark:border-slate-100/10 rounded-3xl border-[1px] w-[500px] max-w-[70%] h-[30vh] sm:h-[30vh] min-h-[400px] transition-all duration-300 ease-out mt-5 flex flex-col p-5 gap-3 mx-auto absolute right-5 top-[80px] z-50`}>
                <p className="sm:text-3xl font-['Roboto'] font-light mb-10">Login</p>

                <Autocomplete
                    icon={<IconAt size="0.8rem" />}
                    className="mx-auto"
                    // size='lg'
                    classNames={{ item: 'text-sm whitespace-prewrap break-normal', input: 'rounded-lg w-[330px]' }}
                    // className='mx-auto w-[50%] sm:w-auto'
                    value={email}
                    label="Email address"
                    required
                    onChange={setEmail}
                    // onClick={() => {setEmail("")}}
                    // rightsection={loading ? <Loader size="xs" /> : <></>}
                    placeholder="email@address.com"
                    data={emailFormat}
                    transitionProps={{ transition: 'pop-top-left', duration: 120, timingFunction: 'ease' }}
                />
                <Stack maw={380} mx="auto" className='mx-auto  w-[50%] sm:w-auto'>
                    <PasswordInput
                        label="Password"
                        classNames={{ item: 'text-sm whitespace-prewrap break-normal', input: 'rounded-lg w-[330px]' }}
                        className="mx-auto"
                        value={password}
                        placeholder="Password"
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

export default Register;