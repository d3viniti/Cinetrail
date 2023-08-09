import {useEffect, useContext, useState} from 'react'
import './MovieDetails.css'
import axios from 'axios';
import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import Genres from '../../ components/Genres/Genres';
import Ratings from '../../ components/Ratings/Ratings';
import { ThemeContext } from '../../context/ThemeContext';
import Reviews from '../../ components/Reviews/Reviews'
import { UserContext } from '../../context/UserContext';

export default function MovieDetails({baseUrl, apiKey, serverUrl}) {
    const {movieid} = useParams();

    const detailsInit = axios.get(`${baseUrl}/movie/${movieid}?api_key=${apiKey}`)
    .then(res=>{
        return(res.data)
    })
    .catch(err=>console.log(err))

    const [videoLink, setVideoLink] = useState('')
    const [movieDetails, setMovieDetails] = useState(detailsInit)
    const [movieRating, setMovieRating] = useState(0);
    const {darkMode, setDarkMode} = useContext(ThemeContext)
    const [reviews, setReviews] = useState([])
    const [totalReviews, setTotalReviews] = useState(0)
    const [reviewNumber, setReviewNumber] = useState(3)
    const {user, token} = useContext(UserContext)
    const [added, setAdded] = useState(false)

useEffect(() => {
    axios.get(`${baseUrl}/movie/${movieid}?api_key=${apiKey}`)
    .then(res=>{
        console.log(res.data)
        setMovieDetails(res.data)
        setMovieRating((res.data.vote_average)/2)
    })
    .catch(err=>console.log(err))

    axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${apiKey}&language=en-US`)
    .then(res=>{
        console.log(res.data.results)
        const youtubeLink = res.data.results.filter(item => item.site==="YouTube" && item.type==="Trailer")
        setVideoLink(youtubeLink[0]?.key)
    })
    .catch(err=>console.log(err))

    axios.get(`${baseUrl}/movie/${movieid}/reviews?api_key=${apiKey}`)
    .then(res=>{
        console.log(res.data.results)
        setTotalReviews(res.data.total_results)
        setReviews(res.data.results)
    })
    .catch(err=>console.log(err))

}, [movieid])


const addToFavorites=()=>{
    console.log(serverUrl)
    if(!token){
    alert("Please login to add to favorites")
}else{
    axios.post(`${serverUrl}favoriteMovies`,{
        user_id: user._id,
        movie_id: movieDetails.id
    })
    .then(res=>{
        console.log(res.data)
        setAdded(true)
    })
    .catch(err=>console.log(err))
}}

const removeFromFavorites=()=>{
   axios.delete(`${serverUrl}/favoriteMovies/${user._id}/${movieDetails.id}`)
    .then(res=>{
        console.log(res.data)
        setAdded(false)
    })
    .catch(err=>console.log(err))
}


useEffect(() => {
  axios.post(`${serverUrl}favoriteMovies/search`,{ 
    user_id:user?._id,
    tmdb_id:movieDetails.id
  })
  .then(res=>{
    if(res.data===null){ 
      setAdded(false)
    }else{ 
      setAdded(true)
    }
  })
  .catch(err=>console.log(err))

}, [user, movieDetails, serverUrl])

// useEffect (() => {
//     alert(movieDetails)
// }, [movieDetails])


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
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }} >
                <p>No Trailers Yet Released</p>
            </div>
        }
        <div className={darkMode ? "details-container" : "details-container details-light"}>
            <div className="title-container">
                <h1>{movieDetails.title}</h1>
                {
                   added
                   ?<span className="remove-btn" onClick={removeFromFavorites}>Remove From Favorites</span>
                   :<span className="add-btn" onClick={addToFavorites}>Add To Favorites</span>
                }
            </div>
            <Ratings movieRating={movieRating}/>
            <div className="info-container">
                <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} className='details-poster'/>
            <div className="movie-info">
                <h2>{movieDetails.tagline}</h2>
                <h4>{movieDetails.overview}</h4>
                <h4>Status: <span>{movieDetails.status}</span></h4>
                <h4>Runtime: <span>{movieDetails.runtime} min.</span></h4>
                <h4>Budget: <span>{movieDetails.budget}</span></h4>
                <Genres component="details" movieGenres={movieDetails?.genres} baseUrl={baseUrl} apiKey={apiKey} />
            </div>
            </div>
            <div className="review-container">
                <p className="reviews-title">Reviews</p>
                {
                    reviews.slice(0, reviewNumber).map(item=>{
                        return <Reviews key={item.id} review={item} />
                    })
                }
                {
                    reviewNumber >= totalReviews 
                    ?<p className="review-number" onClick={()=>(setReviewNumber(3))}><em>end of Reviews.Collapse</em></p>
                    :
                    <p className="review-number" onClick={()=>(setReviewNumber(reviewNumber+3))}><em>Read More Reviews</em></p>
                }
            </div>
    </div>
    </div>
  )
}