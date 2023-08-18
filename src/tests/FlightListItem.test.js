import React from 'react';
import { create } from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';

// import FlightListItem from '../components/FlightListItem';

// describe(`FlightListItem test suite`, () => {
//     test(`it should render two divs if returnFlight is true`, async () => {
//         const testTodo = new FlightListItem();
//         const testRenderer = create(<FlightListItem returnFlight={true} />);
//         const testInstance = testRenderer.root;


//     });
// })