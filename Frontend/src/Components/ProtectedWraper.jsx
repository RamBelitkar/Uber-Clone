import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../Context/CaptainContext';
import axios from 'axios';

function ProtectedWrapper({ children }) {
  const token = localStorage.getItem('usertoken');
  const [loading, setLoading] = useState(true);
    
  const nav = useNavigate();

  useEffect(() => {
    if (!token) {
      nav('/login');
      return
    }}
    ,[token,nav])
      

  return <>{children}</>;
}

export default ProtectedWrapper;
