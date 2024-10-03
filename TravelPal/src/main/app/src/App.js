import {Routes, Route, Navigate} from 'react-router-dom';
import React from 'react';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import './App.css';
import NavBar from './components/NavBar';
import Signup from 'pages/Signup';

function App() {
   return (
      <>
        <NavBar />
         <Routes>
         <Route path="/" element={<Navigate to="/welcome" />} />
         <Route path="/welcome" element={<Welcome />} />
         <Route path="/log-in" element={<Login />} />
         <Route path="/sign-up" element={<Signup />} />
         <Route path="/user-page" element={<UserPage />}/>
            {/* <Route path="/about" element={<About />} /> */}
         </Routes>
      </>
   );
}

export default App;
