import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

const MovieDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const movie = location.state

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700 mb-4">
          No movie data available. Please go back to the search page.
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Back to Search
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-4">
        {movie.Title} ({movie.Year})
      </h2>
      {movie.Poster !== "N/A" && (
        <img
          className="w-full h-auto mb-4 rounded"
          src={movie.Poster}
          alt={`${movie.Title} Poster`}
        />
      )}
      <p className="mb-2">
        <strong>Director:</strong> {movie.Director}
      </p>
      <p className="mb-2">
        <strong>Actors:</strong> {movie.Actors}
      </p>
      <p className="mb-4">
        <strong>Plot:</strong> {movie.Plot}
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate("/movie-search")}
      >
        Back to Search
      </button>
    </div>
  )
}

export default MovieDetails
