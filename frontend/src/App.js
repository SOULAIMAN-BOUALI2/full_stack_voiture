import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';

function App() {

  return (
    <Router>

      <NavigationBar/>

      <Routes>
        <Route path="/" element={<Bienvenue/>}/>
        <Route path="/add" element={<Voiture/>}/>
        <Route path="/edit/:id" element={<Voiture/>}/>
        <Route path="/list" element={<VoitureListe/>}/>
      </Routes>

      <Footer/>

    </Router>
  );
}
export default App;