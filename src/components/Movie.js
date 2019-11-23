import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Movie = ({id, poster, title, info}) => {

    // const [movieInfo, setMovieInfo] = ({});
    useEffect( () => {
        console.log(info)
    }, []);



    return (
        <Link className='card' key={id} to={{
            pathname: '/movies',
            state: {
              movieInfo: info
            }
          }}>
                        <img src={'https://image.tmdb.org/t/p/original' + poster} className='card-img-top' alt='Movie Poster' />
                        <div className='card-body bg-dark text-white text-center'>
                            <h5 className='card-title text-uppercase'>{title}</h5>
                        </div>
        </Link>
    );
    
};

export default Movie;