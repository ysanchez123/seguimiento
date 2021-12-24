import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Modal from "./components/Modal";
import axios from "axios";

import Home from './components/Home'
import Puntos from './components/Puntos'
import ProtocoloLlamadas from './components/ProtocoloLlamadas'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProtocoloLlamadas/>}/>
        <Route exact path="/protocolo_llamadas" element={<ProtocoloLlamadas/>}/>
        <Route exact path="/dashboard" element={<ProtocoloLlamadas/>}/>
        <Route exact path="/history" element={<ProtocoloLlamadas/>}/>
        <Route exact path="/puntos" element={<Puntos/>}/>
      </Routes>
    </Router>
  );
}

export default App;