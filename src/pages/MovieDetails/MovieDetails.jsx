import {React, useEffect, useContext, useState} from 'react'
import './MovieDetails.css'
import axios from 'axios';
import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
// import Ratings from '../Ratings/Ratings';
// import Genres from '../Genres/Genres';
// import Ratings from '../../ components/Ratings/Ratings';
import { ThemeContext } from '../../context/ThemeContext';

function MovieDetails({baseUrl, apiKey, movie}) {
    const {movieid} = useParams();
    const [videoLink, setVideoLink] = useState('')
    const [movieDetails, setMovieDetails] = useState([])

    const {darkMode, setDarkMode} = useContext(ThemeContext)

useEffect(() => {
    axios.get(`${baseUrl}/movie/${movieid}?/api_key=${apiKey}`)
    .then(res=>{
        console.log(res.data.results)

        setMovieDetails(res.data.results)
    })
    .catch(err=>console.log(err))

    axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${apiKey}&language=en-US`)
    .then(res=>{
        console.log(res.data.results)
        const youtubeLink = res.data.results.filter(item => item.site==="YouTube" && item.type==="Trailer")
        setVideoLink(youtubeLink[0]?.key)
    })

}, [movieid])

  return (
    <div className={darkMode ? "movie-details-container" : "movie-details-container details-light"}>
        {
            videoLink ?
            <div className='trailer-container'>
                <ReactPlayer className='trailer-player' url={`https://www.youtube.com/watch?v=${videoLink}`}
                config={{
                    youtube:{
                        playerVars: { showinfo: 1, origin:"http://localhost:3000"}
                    }
                }}
                //playing
                width='100%'
                height='100%'
                />
            </div>
            :
            <div className='trailer-container-blank' style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }} >
                <p>No Trailers Yet Released</p>
            </div>
        }
    </div>
  )
}

export default MovieDetails