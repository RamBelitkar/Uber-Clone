import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import './App.css';
import { CapLogin, CapSignup,UserLogin, UserSignup,LandingPage, UserLogout, CaptainHome,CaptainLogout, UserHomePage } from './Pages';
import { CaptainProtected, ProtectedWraper } from './Components';

function App() {
 

  return (
    <>
      <Routes>
       <Route path='/' element={<LandingPage/>}/>
        <Route path="/signUp" element={<UserSignup/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/capLogin" element={<CapLogin/>} />
        <Route path="/capSignup" element={<CapSignup/>} />
       <Route path='/home' element={
        <ProtectedWraper>
          <UserHomePage/>
        </ProtectedWraper>
        }/>
       <Route path='/user/logout' element={
        <ProtectedWraper>
          <UserLogout/>
        </ProtectedWraper>
        }/>
        <Route path='/caphome' element={
          <CaptainProtected>
            <CaptainHome/>
          </CaptainProtected>
          }/>
        <Route path='/capLogout' element={
          <CaptainProtected>
            <CaptainLogout/>
          </CaptainProtected>
          }/>

      </Routes>
    </>
  );
}

export default App;
