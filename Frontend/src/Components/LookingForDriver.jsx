import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Bike, Truck, ChevronLeft, Star, Users, Clock } from 'lucide-react';
import VehicleDetails from './VehicleDetails.jsx';
import WaitingScreen from './WaitingScreen.jsx';
import ConfirmRide from './ConfirmRide.jsx';
const vehicleOptions = {
  Auto: [
    { id: 1, name: 'Auto Type 1', fare: 100, estimatedTime: 25, icon: Car },
    { id: 2, name: 'Auto Type 2', fare: 110, estimatedTime: 30, icon: Car },
    { id: 3, name: 'Auto Type 3', fare: 120, estimatedTime: 35, icon: Car },
    { id: 4, name: 'Auto Type 4', fare: 130, estimatedTime: 40, icon: Car },
  ],
  Bike: [
    { id: 1, name: 'Bike Type 1', fare: 50, estimatedTime: 15, icon: Bike },
    { id: 2, name: 'Bike Type 2', fare: 60, estimatedTime: 18, icon: Bike },
    { id: 3, name: 'Bike Type 3', fare: 70, estimatedTime: 20, icon: Bike },
    { id: 4, name: 'Bike Type 4', fare: 80, estimatedTime: 25, icon: Bike },
  ],
  MotorCycle: [
    { id: 1, name: 'Ride Type 1', fare: 150, estimatedTime: 20, icon: Truck },
    { id: 2, name: 'Ride Type 2', fare: 160, estimatedTime: 22, icon: Truck },
    { id: 3, name: 'Ride Type 3', fare: 170, estimatedTime: 25, icon: Truck },
    { id: 4, name: 'Ride Type 4', fare: 180, estimatedTime: 28, icon: Truck },
  ],
};



function LookingForDriver({ onBack }) {
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
    const [isWaiting, setIsWaiting]=useState(false)
  const [bookingStage,setBookingStage]=useState('selection')




  const handleVehicleSelectType = (type) => {
    setSelectedVehicleType(type);
    setSelectedVehicleDetails(null);
  };
const handleConfirmVehicle=(vehicle)=>{
    setIsWaiting(true)
    setTimeout(()=>{
        setBookingStage('confirm')
    },2000)
}
const handleConfirmRide=()=>{
    setBookingStage('payment')
}

const handleCancelRide = () => {
    setBookingStage('selection');
    setSelectedVehicleDetails(null);
  };

const handlePaymentCompleted=()=>{
    alert('Your ride is on the way')

    setBookingStage('selection')
    setSelectedVehicleDetails(null);
    setSelectedVehicleType('');
}


if(bookingStage==='Waiting')
{
    return <WaitingScreen vehicleName={selectedVehicleDetails.name}/>
}

if(bookingStage==='confirm'){
    return(
        <ConfirmRide
        vehicle={selectedVehicleDetails}
        onConfirm={handleConfirmRide}
        onCancel={handleCancelRide}/>
    )
}//If user confirms the ride then vehicle details should be send

  const handleVehicleDetailSelect = (vehicle) => {
    setSelectedVehicleDetails(vehicle);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {selectedVehicleDetails ? (
        <VehicleDetails 
          vehicle={selectedVehicleDetails} 
          onBack={() => setSelectedVehicleDetails(null)} 
          onConfirm={handleConfirmVehicle}
        />
      ) : (
        <>
          <button className="mb-4 flex items-center text-gray-600" onClick={onBack}>
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

          <h1 className="text-xl font-bold mb-4">Select Vehicle Type</h1>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          >
            <motion.button
              className="w-full flex items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
              onClick={() => handleVehicleSelectType('Auto')}
            >
              <Car className="w-8 h-8 mr-2" />
              <span>Auto</span>
            </motion.button>

            <motion.button
              className="w-full flex items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
              onClick={() => handleVehicleSelectType('Bike')}
            >
              <Bike className="w-8 h-8 mr-2" />
              <span>Bike</span>
            </motion.button>

            <motion.button
              className="w-full flex items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
              onClick={() => handleVehicleSelectType('MotorCycle')}
            >
              <Truck className="w-8 h-8 mr-2" />
              <span>Ride</span>
            </motion.button>
          </motion.div>

          {selectedVehicleType && (
            <div>
              <h2 className="font-semibold text-lg mb-4">Choose {selectedVehicleType}</h2>
              <div className="space-y-4">
                {vehicleOptions[selectedVehicleType].map((vehicle) => (
                  <motion.button
                    key={vehicle.id}
                    className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => handleVehicleDetailSelect(vehicle)}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{vehicle.name}</span>
                      <span className="font-medium">₹{vehicle.fare}</span>
                    </div>
                    <p className="text-sm text-gray-500">Estimated Time: {vehicle.estimatedTime} min</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LookingForDriver;

