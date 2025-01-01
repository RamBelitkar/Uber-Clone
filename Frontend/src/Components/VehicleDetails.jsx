import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Users, Clock } from 'lucide-react';

function VehicleDetails({ vehicle, onBack, onConfirm }) {
  
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
            <vehicle.icon className="w-16 h-16 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">{vehicle.name}</h2>
          <div className="flex items-center justify-center mb-2">
            <Star className="w-5 h-5 text-yellow-500 mr-1" />
            <span className="font-medium">4.8</span>
            <span className="text-gray-500 ml-2">(2.5k reviews)</span>
          </div>
          <p className="text-gray-600 text-center">Estimated arrival: 3 mins</p>
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
                <span className="text-gray-600">Distance (5 km)</span>
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
            onClick={() => onConfirm(vehicle)}
          >
            Confirm {vehicle.name}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default VehicleDetails;

