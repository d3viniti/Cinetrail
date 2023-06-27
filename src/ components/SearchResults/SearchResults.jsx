import { useState } from 'react'
import './SearchResults.css'
import { useNavigate } from 'react-router-dom'
import noImage from '../../assets/no-image.svg.png'

function SearchResults({movie, setQuery}) {
    //create state for navigate
    const navigate = useNavigate();
    //create a state for backup img if it fails to load, we set to false so it's not there by default
    const [imageError, setImageError] = useState(false);

    const handleNavigation = () => {
        setQuery('')
        navigate(`/moviedetails/${movie?.id}`)
    }

  return (
    <div className='search-results-item' onClick={handleNavigation}>
      <img className='result-img' src={imageError ? noImage :`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
      //if there's no image, set image to no-img
      onError = {() => setImageError(true)} alt="No Image"/>
      <p>{movie?.title}</p>
    </div>
  )
}

export default SearchResults