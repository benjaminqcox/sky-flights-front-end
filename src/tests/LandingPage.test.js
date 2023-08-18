import React from 'react';
import { create } from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';

// import LandingPage from '../components/LandingPage';

// test(`It should render a loader and loading message before data is available`, async () => {
//     await act(async () => render(<LandingPage />));

    
//     expect(await screen.findByText("Loading...")).toBeInTheDocument();
// });