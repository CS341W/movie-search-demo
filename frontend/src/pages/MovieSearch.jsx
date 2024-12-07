import { useState } from "react"
import { useNavigate } from "react-router-dom"

const App = () => {
  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const apiHost =
        import.meta.env.VITE_BACKEND_API_HOST || "http://localhost:3000"
      console.log(apiHost)
      const response = await fetch(
        `${apiHost}/api/movies?title=${encodeURIComponent(
          title
        )}&year=${encodeURIComponent(year)}`
      )
      const data = await response.json()

      if (response.ok) {
        setError("")
        navigate("/movie-details", { state: data })
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("An error occurred while fetching the movie data")
    }
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md my-5">
        <h1 className="text-2xl font-bold mb-6 text-center">Movie Search</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Movie Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year:
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Search
            </button>
          </div>
        </form>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  )
}

export default App
