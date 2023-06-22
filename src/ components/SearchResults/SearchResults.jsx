import React from 'react'
import './SearchResults.css'
import { useNavigate } from 'react-router-dom'

function SearchResults({movie}) {
    //create state for navigate
    const navigate = useNavigate();
    //create a state for backup img if it fails to load
    const [imageError, setImageError] = useState(false);

    const handleNavigation = () => {
        setQuery('')
        navigate(`/moviedetails/${movie.id}`)
    }

  return (
    <div className='search-results-item' onClick={handleNavigation}>
        <p>{movie.title}</p>
        </div>
  )
}

export default SearchResults