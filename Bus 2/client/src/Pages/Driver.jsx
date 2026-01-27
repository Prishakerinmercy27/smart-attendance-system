import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Mapcomponent2 from '../Components/Mapcomponent2';

function Driver() {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [show, setShow] = useState(false);
  const [seat, setSeat] = useState(0); // State for seat
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;

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

    // Fetch the current seat number
    const fetchSeat = async () => {
      try {
        const response = await axios.get(`http://localhost:8100/api/auth/${userId}`);
        const currentSeat = response.data.seat || 0;
        setSeat(currentSeat);
      } catch (error) {
        console.error('Error fetching seat:', error);
      }
    };

    fetchSeat();
  }, [userId]);

  const handleSeatUpdate = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8100/api/auth/update-seat', {
        userId,
        seat
      });

      alert('Seat updated successfully!');
    } catch (error) {
      console.error('Error updating seat:', error);
      alert('Failed to update seat.');
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col bg-cover bg-center bg-slate-200">
        <Navbar />
        <div className='h-screen w-full flex flex-col items-center justify-center'>
          <h1 className="text-slate-900 text-[28px] font-bold mb-8">Route to College</h1>
          {show && <Mapcomponent2 location={location} />}
          
          <form onSubmit={handleSeatUpdate} className="mt-8">
            <div className="mb-4">
              <label htmlFor="seat" className="block text-sm font-medium text-gray-700">Change the Number of Seats Remaining</label>
              <input
                type="number"
                id="seat"
                value={seat}
                onChange={(e) => setSeat(parseInt(e.target.value, 10))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                min="0"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Update Seat
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Driver;
