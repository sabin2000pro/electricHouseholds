import ReactDOM from 'react-dom';
import App from './App'
import './index.css';
import BrowserRouter from 'react-router-dom/BrowserRouter'


ReactDOM.render(<BrowserRouter basename={process.env.PUBLIC_URL}><App />  </BrowserRouter>,document.getElementById('root'));