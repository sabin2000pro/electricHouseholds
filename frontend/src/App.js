import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './components/Home/Homepage';
import AdminRegister from './components/Admin/AdminRegister';
import React from 'react';
import PreferencesHome from './components/Preferences/PreferencesHome';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import ContactUs from './components/Contact/ContactHome';
import AlgorithmsHome from './components/Algorithms/AlgorithmsHome';
import AdminForgotPasswordHome from './components/Admin/AdminForgotPasswordHome';
import AdminResetPassword from './components/Admin/AdminResetPassword';
import AdminCreateAppliance from './components/Admin/AdminCreateAppliance';
import AdminEditAppliance from './components/Admin/AdminEditAppliance';

const App = () => {

  return (

    <div className = "App">

      <Router>
        <Route exact path = '/home' component={Homepage} />
        <Route exact path = '/admin-register' component = {AdminRegister}/>
        <Route exact path = '/your-preferences' component = {PreferencesHome}/>
        <Route exact path = '/admin-login' component = {AdminLogin}/>

        <Route exact path = '/admin-dashboard' component = {AdminDashboard}/>
        <Route exact path = '/contact-us' component = {ContactUs} />
        <Route exact path = '/fair-negotiations' component = {AlgorithmsHome} />
        <Route exact path = "/admin-forgotpassword" component = {AdminForgotPasswordHome}/>
        <Route exact path = "/admin/reset-password/:resetToken" component = {AdminResetPassword} />
        <Route exact path = "/admin-dashboard/create-appliance" component = {AdminCreateAppliance} />
        <Route exact path = "/admin-dashboard/edit-appliance" component = {AdminEditAppliance}/>

      </Router>


    </div>
    
  );
}

export default App;