import {Routes, Route} from 'react-router-dom';
import React from 'react';
import Welcome from './pages/Welcome';
import './App.css';

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Welcome />} />
            {/* <Route path="/about" element={<About />} /> */}
         </Routes>
      </>
   );
}

export default App;
