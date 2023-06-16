import axios from 'axios'
import React, { useState, useEffect } from 'react'



function Genres({movieGenres, baseUrl, apiKey}) {
    //genres come in ids, not actual names, must retrieve names from api

    const [allGenres, setAllGenres] = useState([]);

    useEffect(()=>{
        axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
        .then(res=>{
            console.log(res.data.genres)
            setAllGenres(res.data.genres)
        })
        .catch(err=>console.log(err))
    }, [])

  return (
    <div style={{display:'flex'}}>
        <p>Genres: </p>
        {movieGenres?.map((id, index)=>{
            const genre = allGenres.find((genre)=>genre.id===id);
            return(
                <p key={id}>
                {genre?.name}
                {index !== movieGenres.length-1 && ","} 
                </p>
            )
        })}
    </div>
  )
}
//how do I add a space between the movie genre list items?
export default Genres