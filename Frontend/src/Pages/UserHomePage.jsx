// 'use client'

import React, { useState } from 'react';
import { Search, MapPin, Car, Bike, Truck, Clock, Gift, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VehicleDetails } from '../Components';

const recentTrips = [
  { id: 1, destination: 'Work', address: '123 Office St, City', time: '25 mins ago' },
  { id: 2, destination: 'Gym', address: '456 Fitness Ave, Town', time: '2 days ago' },
  { id: 3, destination: 'Airport', address: 'International Airport', time: '1 week ago' },
];

const RideTypeButton = ({ icon: Icon, label }) => (
  <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <Icon className="w-6 h-6 mb-2" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const LocationInput = ({ placeholder, icon: Icon, value, onChange }) => (
  <div className="relative mb-4">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 pl-10 pr-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
    />
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
);

const RideOption = ({ icon: Icon, name, fare, estimatedTime, onClick }) => (
  <button 
    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center">
      <Icon className="w-8 h-8 mr-4" />
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">{estimatedTime} min</p>
      </div>
    </div>
    <span className="font-medium">₹{fare}</span>
  </button>
);

const RecentTrips = () => (
  <section className="mb-8">
    <h2 className="text-lg font-semibold mb-4">Recent Trips</h2>
    <div className="space-y-4">
      {recentTrips.map((trip) => (
        <div key={trip.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
          <Clock className="w-5 h-5 mr-3 text-gray-500" />
          <div>
            <h3 className="font-medium">{trip.destination}</h3>
            <p className="text-sm text-gray-500">{trip.address}</p>
          </div>
          <ArrowRight className="ml-auto text-gray-400" />
        </div>
      ))}
    </div>
  </section>
);

const OffersSection = () => (
  <section>
    <h2 className="text-lg font-semibold mb-4">Offers</h2>
    <div className="bg-blue-50 p-4 rounded-lg flex items-center">
      <Gift className="w-6 h-6 mr-3 text-blue-500" />
      <div>
        <h3 className="font-medium">15% off your next ride</h3>
        <p className="text-sm text-gray-600">Use code: RIDE15</p>
      </div>
    </div>
  </section>
);

const RideOptions = ({ rideOptions, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-lg font-semibold mb-4">Choose a ride</h2>
    {rideOptions.map((option, index) => (
      <RideOption
        key={index}
        icon={option.icon}
        name={option.name}
        fare={option.fare}
        estimatedTime={option.estimatedTime}
        onClick={() => onSelect(option)}
      />
    ))}
  </motion.div>
);

export default function UserHomePage() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [showRideOptions, setShowRideOptions] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const rideOptions = [
    { icon: Car, name: 'UberGo', fare: 150, estimatedTime: 20 },
    { icon: Bike, name: 'Moto', fare: 80, estimatedTime: 15 },
    { icon: Truck, name: 'Auto', fare: 100, estimatedTime: 25 },
  ];

  const handleBack = () => {
    if (selectedVehicle) {
      setSelectedVehicle(null);
    } else {
      setShowRideOptions(false);
    }
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Welcome, John</h1>
      </header>

      <main className="p-4 max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {selectedVehicle ? (
            <VehicleDetails key="vehicle-details" vehicle={selectedVehicle} onBack={handleBack} />
          ) : showRideOptions ? (
            <RideOptions rideOptions={rideOptions} onSelect={handleVehicleSelect} />
          ) : (
            <motion.div
              key="main-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <LocationInput
                  placeholder="Enter pickup location"
                  icon={MapPin}
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
                <LocationInput
                  placeholder="Enter drop location"
                  icon={MapPin}
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                />
                <button 
                  className="w-full bg-black text-white p-3 rounded-lg mt-2 flex items-center justify-center"
                  onClick={() => setShowRideOptions(true)}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find a ride
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <RideTypeButton icon={Car} label="Ride" />
                <RideTypeButton icon={Bike} label="Bike" />
                <RideTypeButton icon={Truck} label="Auto" />
                <RideTypeButton icon={Clock} label="Reserve" />
              </div>

              <RecentTrips />
              <OffersSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
