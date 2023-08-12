import logo from './logo.svg';
import './App.css';
import Headers from './components/Headers';
import { FooterLinks } from './components/externalComponents/MantineFooter';
import { Button } from '@mantine/core';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SearchForm from './components/SearchForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        {/* <Headers/> */}
        <div className='w-[100vw] h-[100vh] flex-col border-2 border-red-600 flex justify-center p-0'>
          <SearchForm/>
          <Button className='w-[50%]'>Hello</Button>
        </div>
      </div>
    </LocalizationProvider>
   
  );
}

export default App;
