import React,{useState} from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, User, Phone, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CaptainRidingPage(props) {
    const rideDetails={
        dropOff:"Mall",
        passengerName:"John",
        estimatedArrival:"4 min"
    }
    const [isComplete, setIsComplete] = useState(false);

    const navigate=useNavigate()
    const onCompleteRide=()=>{
        console.log('Complete rdie clicked');
        setTimeout(() => {
            navigate('/capHome');
          }, 300);
    }
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow relative">
        {/* Map placeholder */}
        <img 
          src="https://images.pexels.com/photos/8828320/pexels-photo-8828320.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="Map view" 
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-t-3xl shadow-lg p-6"
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Current Ride</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2 text-gray-500" />
              <span>{rideDetails.passengerName}</span>
            </div>
           
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-500" />
              <span>Est. arrival: {rideDetails.estimatedArrival}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-500" />
              <span>{rideDetails.dropOff}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
        <motion.button
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
        onClick={onCompleteRide}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: isComplete ? 0 : 1, scale: isComplete ? 0.8 : 1 }}
        transition={{
          type: 'spring',
          stiffness: 400, // Controls the speed of the animation
          damping: 25, // Controls the bounciness
          duration: 0.1, // Matches the duration of the transition
        }}
        disabled={isComplete} // Disable button after clicking
      >
        {isComplete ? "Ride Completed" : "Complete Ride"}
      </motion.button>
      </div>
      </motion.div>
      </div>
  );
}

export default CaptainRidingPage;
