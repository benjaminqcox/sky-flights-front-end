import React from "react";
import { useState } from "react";
import { Autocomplete, MantineProvider, TextInput } from "@mantine/core"; 
import { useDisclosure } from '@mantine/hooks';
import { PasswordInput, Stack } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import Login from './Login';
import { IconX, IconCheck } from '@tabler/icons-react';
import { Progress, Text, Popover, Box } from '@mantine/core';
import axios from 'axios';


function PasswordRequirement({ meets, label }) {
    return (
        <Text
        color={meets ? 'teal' : 'red'}
        sx={{ display: 'flex', alignItems: 'center' }}
        mt={7}
        size="sm"
        >
        {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />} <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password) {
    let multiplier = password.length > 5 ? 0 : 1;
  
    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });
  
    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  }

function Register ({darkMode, showLoginOrRegister, setShowLoginOrRegister, setLoggedIn, setUser}){
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [visible, { toggle }] = useDisclosure(false);
    const [passwordError, setPasswordError] = useState(false);

    const [popoverOpened, setPopoverOpened] = useState(false);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
      ));

      const strength = getStrength(password);
      const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    const emailFormat =
    email.trim().length > 0 && !email.includes('@')
        ? ['gmail.com', 'hotmail.co.uk', 'yahoo.com'].map((provider) => `${email}@${provider}`)
        : [];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }

        try {
            // setLoading(true);
            const URL = `http://localhost:8081/users/create`;
            const response = await axios.post(URL, {
                firstName: firstName,
                lastName: lastName,
                userName: username,
                email: email,
                password: password
            });
            console.log(response.data);
            setLoggedIn(() => true);
            setUser(() => response.data);

            // setListOfFlights(response.data)
            // setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        
        <MantineProvider theme={{ colorScheme: `${darkMode === "dark" ? 'dark' : 'light'}` }}>
            <form className={`bg-white dark:bg-[#202124] text-gray-600 place-items-stretch dark:text-gray-300 shadow-2xl justify-items-center border-slate-300/30 dark:border-slate-100/10 rounded-3xl border-[1px] w-[500px] max-w-[70%] h-[30vh] sm:h-[30vh] min-h-[600px] transition-all duration-500 mt-5 flex flex-col p-5 gap-3 mx-auto absolute right-5 top-[80px] z-50 animate-in slide-in-from-top fade-in ease-in-out `}
                onSubmit={handleSubmit}
                >
                <p className="sm:text-3xl font-['Roboto'] font-light">Register</p>

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

                <TextInput
                    classNames={{ item: 'text-sm whitespace-prewrap break-normal', input: 'rounded-lg w-[330px]' }}
                    // className='mx-auto w-[50%] sm:w-auto'
                    className="mx-auto"
                    placeholder="Create a username"
                    label="Username"
                    radius="xs"
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    required
                    
                />

                <TextInput
                    classNames={{ item: 'text-sm whitespace-prewrap break-normal', input: 'rounded-lg w-[330px]' }}
                    //className='mx-auto w-[50%] sm:w-auto'
                    className="mx-auto"
                    placeholder="Your first name"
                    label="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                    required
                    radius="xs"
                />

                <TextInput
                    classNames={{ item: 'text-sm whitespace-prewrap break-normal', input: 'rounded-lg w-[330px]' }}
                    // className='mx-auto w-[50%] sm:w-auto'
                    className="mx-auto"
                    placeholder="Your last name"
                    label="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.currentTarget.value)}
                    required
                    radius="xs"
                />

                <Stack mx="auto" className='mx-auto w-[330px] rounded-lg' classNames={{ item: 'text-sm whitespace-prewrap break-normal', input: 'w-[330px]' }}>
                    <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
                        <Popover.Target>
                            <div
                                onFocusCapture={() => setPopoverOpened(true)}
                                onBlurCapture={() => setPopoverOpened(false)}
                                className="overflow-hidden"
                            >
                                {!passwordError ? <PasswordInput
                                    label="Password"
                                    className="mx-auto"
                                    value={password}
                                    placeholder="Password"
                                    required
                                    classNames={{input: 'rounded-lg'}}
                                    visible={visible}
                                    onVisibilityChange={toggle}
                                    onChange={(event) => setPassword(event.currentTarget.value)}
                                    
                                /> : <PasswordInput
                                    label="Password"
                                    className="mx-auto"
                                    value={password}
                                    placeholder="Password"
                                    required
                                    classNames={{input: 'rounded-lg'}}
                                    visible={visible}
                                    onVisibilityChange={toggle}
                                    onChange={(event) => setPassword(event.currentTarget.value)}
                                    error="Passwords do not match"
                                />}

                            </div>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Progress color={color} value={strength} size={5} mb="xs" />
                            <PasswordRequirement label="Includes at least 6 characters" meets={password.length > 5} />
                            {checks}
                        </Popover.Dropdown>
                    </Popover>
                        {!passwordError ? 
                            <PasswordInput
                                label="Confirm password"
                                classNames={{ item: 'text-sm whitespace-prewrap break-normal', input: 'rounded-lg w-[330px]' }}
                                className="mx-auto"
                                value={confirmPassword}
                                placeholder="Confirm password"
                                required
                                visible={visible}
                                onVisibilityChange={toggle}
                                onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                            /> : <PasswordInput
                            label="Confirm password"
                            classNames={{ item: 'text-sm whitespace-prewrap break-normal', input: 'rounded-lg w-[330px]' }}
                            className="mx-auto"
                            value={confirmPassword}
                            placeholder="Confirm password"
                            required
                            visible={visible}
                            onVisibilityChange={toggle}
                            onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                            error
                        /> }
                </Stack>

                <input type='submit' value="Register" className='mx-auto box-border text-white h-[40px] font-semibold border-[1px] rounded-lg px-3 hover:bg-opacity-100 dark:hover:bg-opacity-100 border-blue-500 dark:border-blue-700 hover:text-white shadow-black hover:shadow-md bg-blue-500 dark:bg-blue-700 transition-all duration-200 active:brightness-[80%] active:shadow-none active:translate-y-[1px] cursor-pointer'/>
                <p className="sm:text-sg font-['Roboto'] font-light" onClick={() => setShowLoginOrRegister(!showLoginOrRegister)}>Already have an account? <u className="text-blue-600 cursor-pointer">Log in</u></p>
            </form>
        </MantineProvider>

    )
}

export default Register;