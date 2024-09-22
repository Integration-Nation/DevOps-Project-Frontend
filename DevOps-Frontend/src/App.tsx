import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import SearchPage from "./Pages/SearchPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/weather" element={<h1>Weather</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
