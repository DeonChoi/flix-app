import React, {useEffect, useState} from 'react';
import siteLogo from '../images/siteLogo.jpg';
import '../styles/Home.css';
import Movie from './Movie';

const Home = () => {

    const API_KEY = '709a5b2814c70ed8d0008e35707f3dd3';

    const [movies, setMovies] = useState([]);

    useEffect( () => {
        getMovies();
    }, []);

    const getMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        console.log(data.results);
        setMovies(data.results);
    }

    return (
        <div className='container-fluid'>

            <div className='row justify-content-center align-items-center title-row'>
                <div className='col flex-grow-0'>
                    <img src={siteLogo} alt='Site Logo' className='siteLogo' />
                </div>
                <div className='col flex-grow-0'>
                    <h1 className='display-1 text-white text-center'>flix</h1>
                    <p className='text-white text-center'>find the latest flix</p>
                </div>
                {/* <img src={siteLogo} alt='Site Logo' className='siteLogo' />
                <h1 className='display-1 text-white'>flix</h1> */}
            </div>

            <div className='row justify-content-center align-items-center search-container'>
                <input type='text' placeholder='Search for a movie!' className='search-bar'></input>
            </div>

            <div className='row justify-content-center'>
                {
                    movies.map( movie => (
                        <Movie id={movie.id} poster={movie.poster_path} title={movie.title} info={movie}/>
                    ))
                }
            </div>
            
            <div className='row'>

            </div>

        </div> 
    );

};

export default Home;