import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const WaitingScreen = ({ vehicleName }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-8"
      >
        <Loader2 className="w-16 h-16 text-blue-500" />
      </motion.div>
      <h2 className="text-2xl font-bold mb-4">Looking for your ride...</h2>
      <p className="text-gray-600 mb-2">We're finding the perfect {vehicleName} for you.</p>
      <p className="text-gray-500 text-sm">This usually takes 1-3 minutes.</p>
    </motion.div>
  );
};

export default WaitingScreen;

