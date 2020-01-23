import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Info from './components/Info';
import Watchlist from './components/Watchlist';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import siteLogo from './images/siteLogo.jpg';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

  useEffect( () => {
    toggleLoggedIn();
  }, []);

  useEffect( () => {
    window.addEventListener('resize', updateWidth)
  }, []);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  const toggleLoggedIn = () => {
    localStorage.getItem('auth-token') ? setLoggedIn(true) : setLoggedIn(false);
  };
  
  const toggleSidenav = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const openNav = {
    width: '100%'
  };

  const closeNav = {
    width: '0%'
  };
  const closeMenu1 = {
    WebkitTransform: 'rotate(-45deg) translate(-9px, 6px)',
    transform: 'rotate(-45deg) translate(-9px, 6px)'
  };
  const closeMenu2 = {
    opacity: '0'
  };
  const closeMenu3 = {
    WebkitTransform: 'rotate(45deg) translate(-8px, -8px)',
    transform: 'rotate(45deg) translate(-8px, -8px)' 
  };

  return (

    <Router basename={'/'}>
      <div className='app'>
          <nav className='navbar'>
            <Link className='navbar-brand text-white navBrandText' to={`/`}>
              <img src={siteLogo} alt='Site Logo' className='navLogo' height='50'/>
              flix
            </Link>

            {
              width < 900
              ?
              <>
                <span onClick={toggleSidenav} className='sideNavOpen'>
                  <div className='openIcon' style={ isOpen ? closeMenu1 : null }></div>
                  <div className='openIcon' style={ isOpen ? closeMenu2 : null }></div>
                  <div className='openIcon' style={ isOpen ? closeMenu3 : null }></div>
                </span>
                <section className='sideNav' style={ isOpen ? openNav : closeNav }>
                  
                  <Link to={'/'} className='link-right text-white text-center' onClick={toggleSidenav}>Search</Link>
                  <Link to={'/watchlist'} className='link-right text-white text-center' onClick={toggleSidenav}>Watchlist</Link>

                  {
                    loggedIn
                    ? null
                    :<Link to={'/user/register'} className='link-right text-white text-center' onClick={toggleSidenav}>Register</Link>
                  }
                  {
                    loggedIn
                    ?<Link to={'/user/logout'} className='link-right text-white text-center' onClick={toggleLoggedIn}>Logout</Link>
                    :<Link to={'/user/login'} className='link-right text-white text-center' onClick={toggleSidenav}>Login</Link>
                  }
                </section>
              </>
              :
              <section className='float-right'>
                <Link to={'/'} className='link-right' onClick={toggleSidenav}>Search</Link>
                <Link to={'/watchlist'} className='link-right'>Watchlist</Link>

                {
                  loggedIn
                  ? null
                  :<Link to={'/user/register'} className='link-right'>Register</Link>
                }
                {
                  loggedIn
                  ?<Link to={'/user/logout'} className='link-right' onClick={toggleLoggedIn}>Logout</Link>
                  :<Link to={'/user/login'} className='link-right'>Login</Link>
                }
              </section>
            }
            


            

          </nav>

          <main>
              <Route exact path="/" component={Home} />
              <Route exact path="/flix-app" component={Home} />
              <Route path="/movies" component={Info} />
              <Route path="/watchlist" component={Watchlist} />
              <Route path="/user/register" component={Register} />
              {
                loggedIn
                ? <Route path ='/user/logout' component={Logout} />
                : <Route path='/user/login' component={Login} />
              }
          </main>
      </div>
    </Router>

  );
}

export default App;
