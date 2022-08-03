// import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/landing page/LandingPage.jsx';
import Home from './components/home/Home.jsx';
import CreateBreed from './components/create breed/CreateBreed.jsx';
import Details from './components/details/Details.jsx';

function App() {
  return (
    <BrowserRouter>
       <div> 
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/create' component={CreateBreed} />
        <Route path='/dogs/:id' component={Details} />
      </div>
    </BrowserRouter>
  );
};

export default App;
