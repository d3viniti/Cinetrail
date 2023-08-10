import { useEffect, useState} from 'react'
import './Homepage.css'
import Slider from '../../ components/Slider/Slider'
import axios from 'axios'
import MovieCard from '../../ components/MovieCard/MovieCard'
// will need to import movie card here

function Homepage({apiKey, baseUrl}) {
  //create state to set the popular movies
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const pageNumbers = [1,2,3,4,5,6,7,8,9,10];


  //create useEffect so that pop movies show up when page loads
  useEffect(()=>{
    axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`)
    .then(res=>{
      setPopularMovies(res.data.results)
    })
    .catch(err=>console.log(err))
},[page])

  //create useEffect for topRated, keeping in separate useEffect so both
  //sections don't updated when just one needs to
  useEffect(()=>{
    axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}&page=1`)
    .then(res=>{
      setTopRatedMovies(res.data.results.slice(0,10))
    })
    .catch(err=>console.log(err))
  },[])
  //what does not having the [] do after the UseEffect?
  //we use .slice above because we only want to see the 10 top rated movies


const handlePage =(page)=>{
  setPage(page)
  scrollTo({top: 0, left: 0, behavior: 'smooth'})
}

  return (
    <div className='homepage-container'>
        <Slider apiKey={apiKey} baseUrl={baseUrl}/>
      <div className="movies-wrapper">
        <div className="popular-container">
          {/* add dark and light mode */}
          <h3 className='popular-title'>Popular Movies</h3>
          <div className="popular-cards-wrapper">
            {
              popularMovies?.map(movie=>{
                return<MovieCard radius={'16px'} cardStyle={'popular-card'} width={'200px'} height={'300px'} imageUrl={movie.poster_path} data={movie} key={movie.id}/>
              })
            }



          </div> 

          <div className="page-numbers">
            <p>Select Page</p>
            {
            pageNumbers.map((item)=>(
            <p className={item === page ? "current-page" : "page" }
            key={item}
            onClick={()=> handlePage(item)}>
              {item}
            </p>
            ))
            }
          </div>

        </div>   
          <div className="top-rated-container">
            <h3>Top Rated Movies</h3>
            <div className="top-rated-cards-wrapper">
            {
              topRatedMovies?.map(movie=>{
                return<MovieCard radius={'8px'} cardStyle={'top-rated-card'} width={'200px'} height={'100px'} imageUrl={movie.backdrop_path} data={movie} key={movie.id}/>
              })
            }
            </div>
        </div> 
      </div>
    </div>
  )
}

export default Homepage
//how do I fix the cardstyles on the top rated and movie cards? keeps breaking app