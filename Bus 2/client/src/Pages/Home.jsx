import React, { useEffect, useState } from 'react';
import MapComponent from '../Components/Mapcomponent';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';

function Home() {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [show, setShow] = useState(false);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log([position.coords.latitude, position.coords.longitude]);
          setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
          setShow(true);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported.');
    }

    // Fetch drivers
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:8100/api/auth/');
        const drivers = response.data.drivers; // Access the drivers array directly
        console.log(drivers);
        setDrivers(drivers);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <>
      <div className="h-screen w-full flex flex-col bg-cover bg-center bg-slate-200">
        <Navbar />
        <div className='h-screen w-full flex flex-col items-center justify-center'>
          <h1 className="text-slate-900 text-[28px] font-bold mb-8">Track Nearest Bus</h1>
          {show && <MapComponent location={location} drivers={drivers} />}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
