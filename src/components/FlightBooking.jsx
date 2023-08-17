import React from 'react';
import { Timeline, Text, MantineProvider } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';
import FavouriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PlaceIcon from '@mui/icons-material/Place';
import { useState } from 'react';
import { dayCalendarSkeletonClasses } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import axios from 'axios';
import airlineLogosJson from '../airlines.json';
import airportsJson from '../airports.json'
import { Modal } from '@mui/material';
import FlightMap from './FlightMap';
import WeatherIcon from './WeatherIcon';

function FlightBooking() {
    
}

export default FlightBooking;