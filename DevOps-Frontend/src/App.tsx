
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AboutPage from './Pages/AboutPage'
import SearchPage from './Pages/SearchPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
