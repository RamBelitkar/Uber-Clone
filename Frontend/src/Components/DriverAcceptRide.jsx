import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, DollarSign, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"


function ConfirmationPopup({ ride, isVisible, onClose }) {
  const [otp, setOtp] = useState('');
  const nav = useNavigate();
  const token=localStorage.getItem('captoken')
  const goToRiding = async() => {
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/start`,
        {
          rideId:ride._id,
          otp:otp
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.status===200){
        const ride=response.data.ride
        const user=ride.User
        nav('/captainRideStarted',{state:{
          ride,
          user
        }})
      }
    }catch(err){
      console.log(err);
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
                onClick={goToRiding}
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


function DriverAcceptRide({ rideData }) {
  const [isRidePopupVisible, setIsRidePopupVisible] = useState(!!rideData);
  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] = useState(false);

  const closeRidePopup = () => setIsRidePopupVisible(false);

  const handleAccept = async() => {

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/accept`,
        { rideId: rideData._id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('captoken')}` },
        }
      );
      if (response.status === 200) {
        console.log('Ride Accepted:', response.data);
        setIsRidePopupVisible(false);
        setIsConfirmationPopupVisible(true);
      }
    } catch (error) {
      console.error('Error accepting ride:', error);
    }

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

  if (!rideData || Object.keys(rideData).length === 0) return null; // Don't render if no ride data.
  // console.log(rideData.User)
  const ride = rideData;
  const user = rideData.User;


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
                  <span>Destination: {ride.destination}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Duration: {ride.duration} mins</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  <span>Fare: ₹{ride.fare}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  <span>
                    Passenger: {user.fullname.firstname} {user.fullname.lastname}
                  </span>
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
