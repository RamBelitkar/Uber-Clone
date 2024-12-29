import React from 'react';

const Header = () => {
  return (
    <header className="bg-black text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Uber Clone</h1>
        {/* <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#" className="hover:text-gray-400">Rides</a></li>
            <li><a href="#" className="hover:text-gray-400">Profile</a></li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
}

export default Header;
