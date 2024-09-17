
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AboutPage from './Pages/AboutPage'
import './App.css'
import HomePage from './Pages/HomePage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={}
        </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
