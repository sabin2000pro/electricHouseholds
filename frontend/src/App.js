import './App.css';
import Homepage from './components/Home/Homepage';
import React, {useState} from 'react';
import HomeData from './components/data/Home.json';

const App = () => {
  const [homeData, setHomeData] = useState(HomeData);

  return (

    <div className="App">
       <Homepage data = {homeData} />
    </div>
    
  );
}

export default App;