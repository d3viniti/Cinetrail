import axios, { all } from 'axios'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

//{movieGenres, baseUrl, apiKey, component}

function Genres(props) {
    //genres come in ids, not actual names, must retrieve names from api
    const {movieGenres=[], baseUrl, apiKey, component} = props;
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
        <p>Genres: &nbsp; </p>
        
        {component === "details" ? movieGenres?.map((item, index)=><p key={item.id}>{item.name}{index !== movieGenres.length-1 && ","} &nbsp;</p>):movieGenres?.map((id, index)=>{
            for(let i=0; i <allGenres.length; i++){
                if(allGenres[i].id===id){return <p key={id}>
                {allGenres[i]?.name}
                {index !== movieGenres.length-1 && ","} &nbsp;
                </p>
                }
            }
        })}
    </div>
  )
}
Genres.propTypes={movieGenres:PropTypes.array.isRequired}
//how do I add a space between the movie genre list items?
export default Genres