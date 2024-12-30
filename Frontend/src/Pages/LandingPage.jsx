import React from 'react';
import { Link } from 'react-router-dom';
import {Testimonials,ScrollAnimation} from '../Components'

const LandingPage = () => (
  <div>
    {/* Greeting message section */}
    <div className="h-[550px] grid place-content-center text-center">
      <h1 className="text-5xl font-semibold">Welcome to Our Service!</h1>
      <p className="text-2xl mt-4">We provide the best rides and services for you.</p>
      <div className="flex justify-center py-20">
      <img
        src="https://images.ctfassets.net/zmrtlfup12q3/534bZp7Kjlzv0vEW0uMzzs/f223cbb86e08904df660f46ebdc31d42/Uber.jpg?fm=jpg&q=85&w=1920&fit=fill&fl=progressive&f=center&r=" // Uber logo URL
        alt="Uber Logo"
        className="h-60"
      />
    </div>
    </div>

     {/* Testimonials features */}
    <Testimonials/>
  

    {/* Scrollable feature section with ScrollAnimation */}
    <div className="py-2">
      <div>
        <ScrollAnimation
          direction="left"
          viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }}
          className="text-5xl text-left py-44"
        >
          <p>Our Rides are Fast and Safe</p>
        </ScrollAnimation>
        <ScrollAnimation
          direction="right"
          viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }}
          className="text-5xl text-right py-44"
        >
          <p>Drivers are Highly Rated</p>
        </ScrollAnimation>
        <ScrollAnimation
          viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }}
          className="text-5xl text-center py-44"
        >
          <p>Ride Anytime, Anywhere</p>
        </ScrollAnimation>
      </div>
    </div>

    {/* Buttons for Login and Sign Up */}
    <div className="py-10 text-center">
      <Link to="/login">
        <button className="px-6 py-3 text-white bg-blue-500 rounded-lg mr-4 sm:mr-0 sm:mb-4">
         Continue
        </button>
      </Link>
    </div>
  </div>
);

export default LandingPage;
