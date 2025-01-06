import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { SocketContext } from '../Context/SocketContext';
import VehicleDetails from './VehicleDetails';

const WaitingScreen = ({ vehicle, onBack }) => {
  const { socket } = useContext(SocketContext);
  const [rideDetails, setRideDetails] = useState(null); // State to hold ride details

  useEffect(() => {
    const createRide = async () => {
      try {
        const token = localStorage.getItem('usertoken');
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/ride/create`,
          {
            pickUp: vehicle.pickup,
            drop: vehicle.drop,
            vehicleType: vehicle.name.toLowerCase(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log('Ride is created and waiting for captain');
        }
      } catch (error) {
        console.log(error);
        onBack(); // Handle errors gracefully
      }
    };

    createRide();

    // Set up socket event listener
    socket.on('accept-ride', (data) => {
      console.log('Driver accepted', data);
      setRideDetails(data); // Set the ride details to trigger VehicleDetails rendering
    });
    console.log(rideDetails)
  
    return () => {
      socket.off('accept-ride');
    };
  }, [vehicle, onBack, socket]);

  // Conditional rendering: show VehicleDetails if rideDetails is available
  if (rideDetails) {
    return <VehicleDetails vehicle={rideDetails} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="mb-8"
      >
        <Loader2 className="w-16 h-16 text-blue-500" />
      </motion.div>
      <h2 className="text-2xl font-bold mb-4">Looking for your ride...</h2>
      <p className="text-gray-600 mb-2">
        We're finding the perfect {vehicle.name} for you.
      </p>
      <p className="text-gray-500 text-sm">This usually takes 1-3 minutes.</p>
    </motion.div>
  );
};

export default WaitingScreen;
