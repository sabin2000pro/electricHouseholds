import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
import BidsSettings from './components/Admin/AdminBidsSettings';
import Appliance from './components/Admin/Appliance';
import FairNegotiations from './components/FairNegotations';
import BotSettings from './components/AIBot/BotSettings';
import ResultsScreen from './components/ResultsScreen';

const App = () => { // Trying to add the permissions.. ADDING URL ROUTES. Added a proxy for the backend when deployed

  return (

    <div className = "App">

      <BrowserRouter basename= '/electricHouseholds'>

      
      <Route exact path = '/' component={Homepage} />
        <Route exact path = '/api/v1/auth/client/admin-register' component = {AdminRegister}/>
        <Route exact path = '/your-preferences' component = {PreferencesHome}/>
        <Route exact path = '/api/v1/auth/client/admin-login' component = {AdminLogin}/>

        <Route exact path = '/admin-dashboard' component = {AdminDashboard}/>
        <Route exact path = '/contact-us' component = {ContactUs} />
        <Route exact path = '/fair-negotiations/:id' component = {AlgorithmsHome} />
        <Route exact path = "/api/v1/auth/client/admin-forgotpassword" component = {AdminForgotPasswordHome}/>
        <Route exact path = "/admin/reset-password/:resetToken" component = {AdminResetPassword} />
        <Route exact path = "/api/v1/auth/client/admin-dashboard/create-appliance" component = {AdminCreateAppliance} />
        <Route exact path = "/admin-dashboard/edit-appliance/:id" component = {AdminEditAppliance}/>
        <Route exact path = "/admin-dashboard/credit-settings" component = {BidsSettings} />
        <Route exact path = "/admin-dashboard/api/v1/bot-settings" component = {BotSettings} />
        <Route exact path = "/appliance/:id" component = {Appliance}/>
        <Route exact path = "/fair-negotiations/:id" component = {FairNegotiations}/>
        <Route exact path = "/results" component = {ResultsScreen} />
    

       

      </BrowserRouter>


    </div>
    
  );
}

export default App;