import React from 'react';
import './App.css';
import Home from './components/Home';
import Info from './components/Info';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import siteLogo from './images/siteLogo.jpg';

const App = () => {
  return (

    <Router basename={'/'}>
      <div className='app'>
        <div className='navbar'>
          <div className='navbar'>
              <Link className='navbar-brand text-white' to={`/`}>
                <img src={siteLogo} alt='Site Logo' height='50'/>
                flix
              </Link>
          </div>
          
        </div> 

          <main>
              <Route exact path="/" component={Home} />
              <Route path="/movies" component={Info} />
          </main>
      </div>
    </Router>

  );
}

export default App;
