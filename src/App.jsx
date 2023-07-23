import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './ components/Header/Header'
import CombinedContextProvider from './context/index'
import Homepage from './pages/Homepage/Homepage'
import MovieDetails from './pages/MovieDetails/MovieDetails'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import Favorites from './pages/Favorites/Favorites'


function App() {
  const apiKey = import.meta.env.VITE_API_KEY
  const baseUrl = import.meta.env.VITE_BASE_URL
  const serverUrl = import.meta.env.VITE_SERVER_URL

  
  return (
    <BrowserRouter>
      <CombinedContextProvider>
        <Header apiKey={apiKey} baseUrl={baseUrl}/>
        <Routes>
          <Route path='/' element={<Homepage apiKey={apiKey} baseUrl={baseUrl}/>} />
          <Route path='/moviedetails/:movieid' element={<MovieDetails apiKey={apiKey} baseUrl={baseUrl} serverUrl={serverUrl}/>} />
          <Route path="/favorites" element={<Favorites serverUrl={serverUrl} baseUrl={baseUrl} apiKey={apiKey}/>}/>
          <Route path="/signup" element={<SignUp serverUrl={serverUrl}/>}/>
          <Route path="/signin" element={<SignIn serverUrl={serverUrl}/>}/>
        </Routes>  
      </CombinedContextProvider>
    </BrowserRouter>
  )
}

export default App
