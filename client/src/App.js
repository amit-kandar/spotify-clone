import * as React from 'react';
import Navbar from './components/Navbar'
import AddSong from './components/AddSong';
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SginUp'
import SginIn from './components/SginIn'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addsong" element={<AddSong />} />
        <Route path="/signup" element={<SignUp  />} />
        <Route path="/signin" element={< SginIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
