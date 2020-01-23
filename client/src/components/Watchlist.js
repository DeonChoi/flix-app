import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Movie from './Movie';

const Watchlist = (props) => {

    if (!localStorage.getItem('auth-token')) {
        props.history.push('../user/login');
    }

    const [watchlist, setWatchlist] = useState([]);

    useEffect( () => {
        getWatchlist();
    }, []);

    const headers = {
        headers: {
            'auth-token': localStorage.getItem('auth-token')
        }
    };

    const getWatchlist = async () => {
        await axios.get('http://localhost:3000/watchlist/movies', headers)
            .then( res => {
                setWatchlist(res.data);
                // console.log(res.data);
            })
            .catch( err => {
                console.log(err);
            })
    };

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center' style={{marginBottom:'2rem', marginTop: '2rem'}}>
                <h1 className='text-white text-monospace'>My Watchlist</h1>
            </div>
            <div className='row justify-content-center'>
                {
                    watchlist.length === 0
                    ? <div className='text-white' style={{fontSize:'2rem', marginTop: '2rem'}}>No Results Found</div>
                    : watchlist.map( movie => 
                        <Movie id={movie.id} poster={movie.poster_path} title={movie.title} info={movie}/>
                    )
                }
            </div>
        </div>

        
    );
};

export default Watchlist;