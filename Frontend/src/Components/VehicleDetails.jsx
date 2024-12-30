import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Users, Clock } from 'lucide-react';

const VehicleDetails = ({ vehicle, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden"
    >
      <button onClick={onBack} className="mb-4 flex items-center text-gray-600">
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back
      </button>
      <div className="bg-gray-100 p-6 mb-4">
        <vehicle.icon className="w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold mb-2">{vehicle.name}</h2>
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 text-yellow-500 mr-1" />
          <span className="font-medium">4.8</span>
          <span className="text-gray-500 ml-2">(2.5k reviews)</span>
        </div>
        <p className="text-gray-600">Estimated arrival: 3 mins</p>
      </div>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-gray-500" />
            <span>Up to 4 seats</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-500" />
            <span>{vehicle.estimatedTime} min</span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Fare Details</h3>
          <div className="flex justify-between mb-2">
            <span>Base fare</span>
            <span>₹{vehicle.fare}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Distance (5 km)</span>
            <span>₹50</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{vehicle.fare + 50}</span>
          </div>
        </div>
        <button className="w-full bg-black text-white p-3 rounded-lg">
          Confirm {vehicle.name}
        </button>
      </div>
    </motion.div>
  );
};

export default VehicleDetails;

