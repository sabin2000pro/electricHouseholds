import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './components/Home/Homepage';
import AdminRegister from './components/Admin/AdminRegister';
import React, {useState} from 'react';
import Header from './components/Header';
import PreferencesHome from './components/Preferences/PreferencesHome';
import AdminLogin from './components/Admin/AdminLogin';

const App = () => {

  return (

    <div className = "App">

      <Router>
        <Route path = '/home' component={Homepage} />
        <Route path = '/admin-register' component = {AdminRegister}/>
        <Route path = '/your-preferences' component = {PreferencesHome}/>
      </Router>


    </div>
    
  );
}

export default App;