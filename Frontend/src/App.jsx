import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import './App.css';
import { CapLogin, CapSignup,UserLogin, UserSignup,LandingPage, UserLogout, CaptainHome,CaptainLogout, UserHomePage } from './Pages';
// import { CaptainProtected,ProtectedWrapper } from './Pages';
import { CaptainProtected,ProtectedWrapper,CaptainRiding } from './Pages';

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
        <ProtectedWrapper>
          <UserHomePage/>
        </ProtectedWrapper>
        }/>
       <Route path='/user/logout' element={
        <ProtectedWrapper>
          <UserLogout/>
        </ProtectedWrapper>
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
          <Route path='/captainRiding' element={
            <CaptainProtected>
              <CaptainRiding/>
            </CaptainProtected>
          }/>

      </Routes>
    </>
  );
}

export default App;
