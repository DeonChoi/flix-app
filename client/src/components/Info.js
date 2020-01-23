import React, {useState, useEffect} from 'react'
import '../styles/Info.css';
import axios from 'axios';

const Info = (props) => {

    const movieInfo = props.location.state.movieInfo;
    const prevPath = props.location.state.prevPath;
    // console.log(prevPath);

    const [watchlistFilm, setWatchlistFilm] = useState(false);
    const [show, setShow] = useState(false);

    useEffect( () => {
        if (prevPath === '/watchlist') {
            setWatchlistFilm(true);
        } else {
            setWatchlistFilm(false);
        };
        
    },[]);

    const showModal = () => {
        setShow(true);
        setTimeout(() => {
            hideModal();
        }, 700);
    };
    const hideModal = () => {
        setShow(false);
    };

    const addMovie = async (e) => {
        if (!localStorage.getItem('auth-token')) {
            props.history.push('../user/login');
        }

        e.preventDefault();

        // console.log(movieInfo);
        const newMovie = {
            movieID : movieInfo.id,
            title: movieInfo.title,
            release_date: movieInfo.release_date,
            vote_average: movieInfo.vote_average,
            vote_count: movieInfo.vote_count,
            overview: movieInfo.overview,
            poster_path: movieInfo.poster_path,

        };

        const headers = {
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        };

        // console.log(newMovie);
        await axios.post('http://localhost:3000/watchlist/add', newMovie, headers)
            .then( res => console.log(res))
            .catch( err => console.error(err));
        showModal();

    };

    const removeMovie = async (e) => {
        if (!localStorage.getItem('auth-token')) {
            props.history.push('../user/login');
        }

        e.preventDefault();
        // console.log(movieInfo);

        const headers = {
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        };

        await axios.delete('http://localhost:3000/watchlist/' + movieInfo.id, headers)
            .then( res => {
                console.log(res); 
                console.log('Movie removed from watchlist...'); 
                props.history.goBack();
            })
            .catch( err => console.error(err));

    };


    return (
        <div className='container text-white'>

            {
                show
                ? <div id='modal'>Movie Saved...</div>
                : ''
            }

            <div className='row justify-content-center movie-title'>
                <h1 className='display-1'>{movieInfo.title}</h1>
            </div>
            <div className='row'>
                <div className='col flex-grow-0'>
                    <img src={'https://image.tmdb.org/t/p/original' + movieInfo.poster_path} alt='Movie Poster' className='movie-poster' />
                </div>
                <div className='col text-justify'>
                    <h3>Release Date: {movieInfo.release_date}</h3>
                    <h3>Rating: {movieInfo.vote_average}</h3>
                    <h3>Votes: {movieInfo.vote_count}</h3>
                    <h4>Synopsis: {movieInfo.overview}</h4>
                    {
                        watchlistFilm 
                        ? <button type='button' className=' addButton text-monospace' onClick={removeMovie}>Remove from Watchlist</button>
                        : <button type='button' className=' addButton text-monospace' onClick={addMovie}>Add to Watchlist</button>
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Info;