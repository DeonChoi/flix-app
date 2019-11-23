import React from 'react';
import './App.css';
import Home from './components/Home';
import Info from './components/Info';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import siteLogo from './images/siteLogo.jpg';

const App = () => {
  return (
    // <Router basename={'/'}>
    //   <div className='app'>
    //     <Home />
    //   </div>
    //   <main>
    //     <Route exact path='/' component={Home} />
    //     <Route path='/movie' component={Info} />
    //   </main>
    // </Router>

    <Router basename={'/'}>
        <div className='app'>
          <div className='navbar'>
            <div className='navbar'>
                <Link className='navbar-brand text-white' to={`/`}>
                  <img src={siteLogo} alt='Site Logo' height='50'/>
                  flix
                </Link>
            </div>
            {/* <div className='navbar'>
                <Link className='nav-link text-dark' to={`/`}>Home</Link>
                <Link className='nav-link text-dark' to={`/movies`}>Movies</Link>
            </div> */}
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
