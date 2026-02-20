import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeetComponent';
import HomeComponent from './pages/home';

function App() {
  

  return (
    <>
     <Router>
      <AuthProvider>
      <Routes>
        {/* <Route path="/home" element=""/> */}
        <Route path="/" element={<LandingPage/>}/>

        <Route path='/auth' element={<Authentication/>}/>

        <Route path='/home' element={<HomeComponent/>}/>

        <Route path='/:url' element={<VideoMeetComponent/>} />


      </Routes>
      </AuthProvider>
     </Router>
    </>
  )
}

export default App
