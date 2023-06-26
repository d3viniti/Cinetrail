import { useContext, useEffect, useState } from 'react'
import './Header.css'
import { ThemeContext } from '../../context/ThemeContext'
import { Link } from 'react-router-dom';
import { MdOutlineDarkMode,MdOutlineLightMode } from "react-icons/md";
import axios from 'axios';
import SearchResults from '../SearchResults/SearchResults';

function Header({baseUrl, apiKey}) {
    const {darkMode, setDarkMode} = useContext(ThemeContext);
    //use { } not []
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=>{
        if(query.trim().length>0){
        axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
        .then(res=>{
            console.log(res.data.results)
            //axios search failing, at 17 min
            setSearchResults(res.data.results)
        })
        .catch(err=>console.log(err))
    }
    },[])
    

    //function to handle light/dark mode
    const handleTheme = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode)
        //creating a toggle for darkMode instead of two sep funcs
    }

  return (
    //if true header appears in dark mode else header appears in light mode
    <div className={darkMode ? "header-container" : "header-container header-light"}>
        <Link to='/' className='logo'>CineTrail</Link>
        <div className="search-container">
            <input 
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                placeholder='Search Movies' 
                className={`search-input ${query && 'input-active'} ${!query && !darkMode && query}`}
                 />
                {/* query.trim will not count extra spaces in the query search */}
                {query.trim() !== "" && (
                    <div className='search-results-container'>
                        {
                            searchResults.map((movie) => {
                            return <SearchResults setQuery={setQuery} key={movie.id} movie={movie} />
                            }
                            )
                        }
                    
                    </div>    
                )}


        </div>

        <div className='header-buttons-container'>
            <div className='theme-button-container'>

                {
                    darkMode 
                    ?   <div className='theme-buttons'>
                            <MdOutlineLightMode onClick={handleTheme} className='theme-icon' />
                            <MdOutlineDarkMode className='theme-icon theme-icon-active' />
                       </div> 
                    :   <div className='theme-buttons'>
                            <MdOutlineLightMode className='theme-icon theme-icon-active' />
                            <MdOutlineDarkMode onClick={handleTheme} className='theme-icon'/>
                        </div>
                }
            </div> 

            <div>
                <button className='create-account-btn'>Create Account</button>
            </div>
        </div>
    </div>
  )
}

export default Header