import React, {useEffect} from 'react'
import '../styles/Info.css';

const Info = (props) => {

    const movieInfo = props.location.state.movieInfo;
    console.log(movieInfo)

    // useEffect( () => {
    //     movieInfo = props.location.state.movieInfo;
    //     console.log(movieInfo)
        
    // },[]);


    return (
        <div className='container text-white'>
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
                </div>
            </div>
        </div>
    )
}

export default Info;