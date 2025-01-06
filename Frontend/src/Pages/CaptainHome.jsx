import React,{useEffect, useState} from 'react'
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, User, CheckCircle } from 'lucide-react';
import { DriverAcceptRide, Header } from '../Components';
import { useContext } from 'react';
import { CaptainContext, CaptainDataContext } from '../Context/CaptainContext';
import { SocketContext } from '../Context/SocketContext';
function CaptainHome() {
    const mockRideRequests = [
        { id: 1, pickup: "Central Park", dropoff: "Times Square", estimatedTime: 15, fare: 25, passengerName: "John Doe" },
        { id: 2, pickup: "Brooklyn Bridge", dropoff: "Statue of Liberty", estimatedTime: 30, fare: 40, passengerName: "Jane Smith" },
        { id: 3, pickup: "Empire State Building", dropoff: "Metropolitan Museum", estimatedTime: 20, fare: 30, passengerName: "Bob Johnson" },
      ];
    const [rideRequests, setRideRequests] = useState(mockRideRequests);
    const [rides, setRides] = useState({});
      const [acceptedRides,setAcceptedRides]=useState([])
    const handleAcceptRide = (rideId) => {
      const acceptedRide = rideRequests.find(ride => ride.id === rideId);
      setAcceptedRides([...acceptedRides, acceptedRide]);
      setRideRequests(rideRequests.filter(ride => ride.id !== rideId));
    };
const [location,setLocation]=useState()
const {captain}=useContext(CaptainDataContext)
const {socket}=useContext(SocketContext)

useEffect(()=>{
  // console.log('sending captian',`${captain}`)
socket.emit('join',{userId:captain._id,role:"captain"})

const sendLocation=function()
{
  // console.log('location gets called');
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(location=>
     {
      socket.emit('update-location',{
        id:captain._id,
        location:{
          lat:location.coords.latitude,
          lng:location.coords.longitude
        }
      })
     }
    )
  }
}



const locationDelay=setInterval(sendLocation,5000)//storing the delay in an variable so that unmounting can be easy
return()=>clearInterval(locationDelay)

},[captain])


socket.on('new-ride',(data)=>{
  // console.log(data);
  setRides(data)
})


    return (
        <>
        <Header/>
        <DriverAcceptRide
        rideData={rides}
        />
       <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Available Ride Requests</h1>
      
      {rideRequests.length === 0 && acceptedRides.length === 0 && (
        <p className="text-center text-gray-500">No ride requests available at the moment.</p>
      )}

      {rideRequests.map((ride) => (
        <motion.div
          key={ride.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-4 border rounded shadow">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <span>Ride Request #{ride.id}</span>
                <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">New</span>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
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
                <div className="flex items-center col-span-2">
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Passenger: {ride.passengerName}</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <button 
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
                onClick={() => handleAcceptRide(ride.id)}
              >
                Accept Ride
              </button>
            </div>
          </div>
        </motion.div>
      ))}

      {acceptedRides.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Accepted Rides</h2>
          {acceptedRides.map((ride) => (
            <motion.div
              key={ride.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 border rounded shadow bg-green-50">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <span>Ride #{ride.id}</span>
                    <span className="bg-green-500 text-white text-sm px-2 py-1 rounded">Accepted</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                      <span>Pickup: {ride.pickup}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-red-500" />
                      <span>Dropoff: {ride.dropoff}</span>
                    </div>
                    <div className="flex items-center col-span-2">
                      <User className="w-5 h-5 mr-2 text-gray-500" />
                      <span>Passenger: {ride.passengerName}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t text-center text-green-600 font-semibold flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Ride Accepted
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
        </>
    )
}

export default CaptainHome
