import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Users, Clock } from 'lucide-react';
import axios from 'axios';

function VehicleDetails({ vehicle, onBack, onConfirm }) {
  const token = localStorage.getItem('usertoken');
  console.log(vehicle);

  const createRide = useCallback(async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/maps/getSuggestion`,
        null,
        {
          params: { input: vehicle.name },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  }, [token, vehicle.name]);

  const handleConfirm = () => {
    createRide(); // Call the API when confirm is clicked
    onConfirm(vehicle); // Call the onConfirm function passed as prop
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto"
  >
    <div className="p-6">
      <button onClick={onBack} className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors">
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back
      </button>
      <div className="bg-gray-100 p-6 mb-4 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          {/* Ensure the icon is a valid React component */}
          {vehicle.icon && React.createElement(vehicle.icon, { className: 'w-16 h-16 text-blue-500' })}
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">{vehicle.name}</h2>
        <div className="flex items-center justify-center mb-2">
          <Star className="w-5 h-5 text-yellow-500 mr-1" />
          <span className="font-medium">4.8</span>
          <span className="text-gray-500 ml-2">(2.5k reviews)</span>
        </div>
        <p className="text-gray-600 text-center">Estimated arrival: {vehicle.estimatedTime} mins</p>
      </div>
      {/* Display Pickup and Drop Locations */}
      <div className="bg-gray-100 p-4 mb-4 rounded-lg">
        <h3 className="font-semibold text-lg">Pickup & Drop</h3>
        <div className="mt-2">
          <p className="text-gray-600"><strong>Pickup:</strong> {vehicle.pickup}</p>
          <p className="text-gray-600"><strong>Drop:</strong> {vehicle.drop}</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-sm">Up to 4 seats</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-sm">{vehicle.estimatedTime} min</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-lg">Fare Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base fare</span>
              <span className="font-medium">₹{vehicle.fare}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Distance ({vehicle.distance} km)</span>
              <span className="font-medium">₹50</span>
            </div>
            <div className="flex justify-between text-lg font-semibold mt-2 pt-2 border-t">
              <span>Total</span>
              <span>₹{vehicle.fare + 50}</span>
            </div>
          </div>
        </div>
        <button 
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          onClick={handleConfirm}
        >
          Confirm {vehicle.name}
        </button>
      </div>
    </div>
  </motion.div>
    );
}

export default VehicleDetails;
