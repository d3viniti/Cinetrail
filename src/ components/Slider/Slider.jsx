import React, { useEffect, useState } from 'react'
import './Slider.css'
import axios from 'axios'

function Slider({apiKey, baseUrl}) {
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [index, setIndex] = useState(0)
    const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE

    useEffect (() => {
        axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
        .then(res=>{
            console.group(res.data.results)
            setUpcomingMovies(res.data.results)
        } )
        .catch(err=>console.log(err))     
    },[])

    const sliderStyle = {
        backgroundImage: `url("${imageBaseUrl}${upcomingMovies[index]?.backdrop_path}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '60vh',
        position: 'relative'
    }
  return (
    <div style={sliderStyle}>
        
        <div>

        </div>
        <div>

        </div>
        Slider</div>
  )
}

export default Slider