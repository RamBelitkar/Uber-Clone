import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import './App.css';
import { CapLogin, CapSignup, HomePage, UserLogin, UserSignup } from './Pages';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<UserSignup/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/capLogin" element={<CapLogin/>} />
        <Route path="/capSignup" element={<CapSignup/>} />

      </Routes>
    </>
  );
}

export default App;
