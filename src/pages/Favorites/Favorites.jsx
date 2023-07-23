import React, { useContext, useEffect, useState } from 'react'
import './Favorites.css'
import axios from 'axios'
// import {UserContext} from '../../context/UserContext'

function Favorites({serverUrl}) {
  const [movies, setMovies] = useState([])
  // const {user, token} = useContext(userContext)

  useEffect(()=>{
    axios.get(`${serverUrl}favoriteMovies/user/${user?._id}`)
    .then(res=>{
      console.log(res.data)
      setMovies(res.data.favorites)
    })
    .catch(err=>console.log(err))
  }, [user])


  return (
    <div className='favorites-container'>
      {
      token
      ? movies.map(item=>{
        return <MovieCard radius={'16px'} cardStyle={'popular-card'} width={'200px'}
        height={'300px'} imageUrl={item.movie[0].poster_path} key={item.movie[0]._id} data={item.movie[0]}
        />
      })
      : <p style={{color:'white'}}>Sign in to save movies to your favorites list.</p>
      }
      </div>
  )
}

export default Favorites