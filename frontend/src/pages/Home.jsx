import { useNavigate } from "react-router-dom"
const Home = () => {
  const navigate = useNavigate()

  const goToMovieSearch = () => {
    navigate("/movie-search")
  }

  return (
    <div>
      <h1>Movie Site</h1>
      <button
        onClick={goToMovieSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Movie Search
      </button>
    </div>
  )
}

export default Home
