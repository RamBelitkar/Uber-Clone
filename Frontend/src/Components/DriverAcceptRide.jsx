import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, DollarSign, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ConfirmationPopup({ ride, isVisible, onClose }) {
  const [otp, setOtp] = useState('');
  const nav = useNavigate();

  const handleRedirect = () => {
    if (otp === '1234') { // You can change this OTP validation logic
      nav('/captainRiding');
      onClose();
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
        >
          <motion.div
            className="bg-white rounded-t-lg shadow-lg p-6 w-full max-w-md"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Ride Accepted</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                <span>Pickup: {ride.pickup}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-500" />
                <span>Dropoff: {ride.dropoff}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                <span>Est. Time: {ride.estimatedTime} mins</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                <span>Fare: ₹{ride.fare}</span>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-500" />
                <span>Passenger: {ride.passengerName}</span>
              </div>
            </div>
            <div className="mt-6">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter OTP to Start Ride"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleRedirect}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Start Ride
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DriverAcceptRide() {
  const [isRidePopupVisible, setIsRidePopupVisible] = useState(true);
  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] = useState(false);

  const ride = {
    pickup: "Downtown Mall",
    dropoff: "Central Park",
    estimatedTime: 15,
    fare: 150,
    passengerName: "John Doe",
  };

  const closeRidePopup = () => setIsRidePopupVisible(false);

  const handleAccept = () => {
    setIsRidePopupVisible(false);
    setIsConfirmationPopupVisible(true);
  };

  const handleIgnore = () => {
    console.log("Ride Ignored!");
    setIsRidePopupVisible(false);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationPopupVisible(false);
  };

  return (
    <div>
      <AnimatePresence>
        {isRidePopupVisible && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
          >
            <motion.div
              className="bg-white rounded-t-lg shadow-lg p-6 w-full max-w-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button
                onClick={closeRidePopup}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center">
                New Ride Request
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  <span>Pickup: {ride.pickup}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-500" />
                  <span>Dropoff: {ride.dropoff}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Est. Time: {ride.estimatedTime} mins</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  <span>Fare: ₹{ride.fare}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Passenger: {ride.passengerName}</span>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleIgnore}
                  className="w-[48%] bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Ignore
                </button>
                <button
                  onClick={handleAccept}
                  className="w-[48%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Accept
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmationPopup
        ride={ride}
        isVisible={isConfirmationPopupVisible}
        onClose={handleCloseConfirmation}
      />
    </div>
  );
}

export default DriverAcceptRide;
