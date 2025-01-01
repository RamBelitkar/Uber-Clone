import React from "react"
import {ArrowRight,MapPin } from 'lucide-react';


const RecentTrips=()=>{
    const recentTrips = [
        { id: 1, destination: 'Work', address: '123 Office St, City', time: '25 mins ago' },
        { id: 2, destination: 'Gym', address: '456 Fitness Ave, Town', time: '2 days ago' },
        { id: 3, destination: 'Airport', address: 'International Airport', time: '1 week ago' },
      ];

      return(
        <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Recent Trips</h2>
        <div className="space-y-4">
          {recentTrips.map((trip) => (
            <div key={trip.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
              <MapPin className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <h3 className="font-medium">{trip.destination}</h3>
                <p className="text-sm text-gray-500">{trip.address}</p>
              </div>
              <ArrowRight className="ml-auto text-gray-400" />
            </div>
          ))}
        </div>
      </section>
      )
}
export default RecentTrips