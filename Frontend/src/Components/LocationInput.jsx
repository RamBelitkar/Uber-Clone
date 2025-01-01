import React,{useState} from 'react'
import { Search,  Car, Bike, Truck, Clock, Gift, ArrowRight,MapPin } from 'lucide-react';


function LocationInput({ placeholder, icon: Icon, value, onChange }) {
    return (
   <>
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

    
      </>
    );
  }

export default LocationInput
