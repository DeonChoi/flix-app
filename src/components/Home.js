import React from 'react';
import siteLogo from '../images/siteLogo.jpg';
import '../styles/Home.css';

const Home = () => {

    return (
        <div className='container'>

            <div className='row justify-content-center align-items-center title-row'>
                <img src={siteLogo} alt='Site Logo' className='siteLogo' />
                <h1 className='display-1 text-white'>flix</h1>
            </div>

            <div className='row justify-content-center align-items-center search-container'>
                <input type='text' placeholder='Search for a movie!' className='search-bar'></input>
            </div>

            <div className='row'>

            </div>
            
            <div className='row'>

            </div>

        </div> 
    );

};

export default Home;