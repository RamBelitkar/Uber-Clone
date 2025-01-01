import React, { useState } from 'react';
import { Search,  Car, Bike, Truck, Clock, Gift, ArrowRight,MapPin,ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VehicleDetails,LocationInput,RecentTrips,LookingForDriver } from '../Components';

const RideTypeButton = ({ icon: Icon, label }) => (
  <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <Icon className="w-6 h-6 mb-2" />
    <span className="text-sm font-medium">{label}</span>
  </button>
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


export default function UserHomePage() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [showDriverSearch, setShowDriverSearch] = useState(false);
  const handleBack = () => {
    if (showDriverSearch) {
      setShowDriverSearch(null); // Reset vehicle selection
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Welcome, John</h1>
      </header>

      <main className="p-4 max-w-3xl mx-auto">
        {showDriverSearch ? (
          <motion.div key="driver-search">
            <LookingForDriver pickup={pickup} drop={drop} onBack={handleBack}/>
          </motion.div>
        ) : (
          <motion.div key="main-view">
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
                onClick={() => setShowDriverSearch(true)} // Triggering driver search view
              >
                <Search className="w-5 h-5 mr-2" />
                Find a driver
              </button>
            </div>

            <RecentTrips />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <RideTypeButton icon={Car} label="Ride" onClick={() => handleVehicleSelectType('Auto')} />
              <RideTypeButton icon={Bike} label="Bike" onClick={() => handleVehicleSelectType('Bike')} />
              <RideTypeButton icon={Truck} label="Auto" onClick={() => handleVehicleSelectType('MotorCycle')} />
              <RideTypeButton icon={Clock} label="Reserve" />
            </div>

            <OffersSection />
          </motion.div>
        )}
      </main>
    </div>
  );
}