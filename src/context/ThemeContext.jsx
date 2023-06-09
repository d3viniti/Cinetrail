import { useState, createContext, useEffect} from 'react'
export const ThemeContext = createContext()

//exporting below so entire site has access
export default function ThemeContextProvider(props) {
    const [darkMode, setDarkMode] = useState(true)

//store our dark/light mode info in useEffect
    useEffect(() => {
        const theme = localStorage.getItem('darkMode')
        if (theme) {
            setDarkMode(JSON.parse(theme))
        }
    }, [])

  return (
    // set below value to our state
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
        {/* props.children gives ThemeContext.Provider access to entire site */}
        {props.children}

    </ThemeContext.Provider>
  )
}


