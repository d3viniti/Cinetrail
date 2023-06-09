import { useContext } from 'react'
import './Header.css'
import { ThemeContext } from '../../context/ThemeContext'
import { Link } from 'react-router-dom';
import { MdOutlineDarkMode,MdOutlineLightMode } from "react-icons/md";

function Header() {
    const {darkMode, setDarkMode} = useContext(ThemeContext)
    //use { } not []

    //function to handle light/dark mode
    const handleTheme = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode)
        //creating a toggle for darkMode instead of two sep funcs
    }

  return (
    //if true header appears in dark mode else header appears in light mode
    <div className={darkMode ? "header-container" : "header-container light"}>
        <Link to='/' className='logo'>CineTrail</Link>
        <div className="search-container">
            <input placeholder='Search Movies' className='search-input' />
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
                <button className='create-account'>Create Account</button>
            </div>
        </div>
    </div>
  )
}

export default Header