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

function Account ({ user, darkMode }){
    return (
        <div className={`bg-white dark:bg-[#202124] text-gray-600 place-items-stretch dark:text-gray-300 shadow-2xl justify-items-center border-slate-300/30 dark:border-slate-100/10 rounded-3xl border-[1px] w-[500px] max-w-[70%] h-[30vh] sm:h-[30vh] min-h-[600px] transition-all duration-300 ease-out mt-5 flex flex-col p-5 gap-3 mx-auto absolute right-5 top-[80px] z-50`}>
            <p className="sm:text-2xl font-['Roboto'] font-light">Email {user.email}</p>
            <p className="sm:text-2xl font-['Roboto'] font-light">Username {user.username}</p>
            <p className="sm:text-2xl font-['Roboto'] font-light">First name {user.firstName}</p>
            <p className="sm:text-2xl font-['Roboto'] font-light">Last name {user.lastName}</p>
        </div>
        
    )
}

export default Account;