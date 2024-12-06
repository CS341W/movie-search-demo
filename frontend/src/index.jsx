import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import Home from "./pages/Home.jsx"
import MovieDetails from "./pages/MovieDetails.jsx"
import MovieSearch from "./pages/MovieSearch.jsx"

const rootElement = document.getElementById("root")
ReactDOM.createRoot(rootElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="movie-search" element={<MovieSearch />} />
        <Route path="movie-details" element={<MovieDetails />} />
      </Route>
    </Routes>
  </Router>
)
