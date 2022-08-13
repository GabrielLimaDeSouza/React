import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const searchUrl = "https://api.themoviedb.org/3/search/movie/"
const apiKey = "api_key=e1ae03ebad415514b075ec793d27cbd2"

import './MovieGrid.css'

const Search = () => {
  const [searchParams] = useSearchParams()

  const [movies,setMovies] = useState([])
  const query = searchParams.get("q")

  const getSearchedMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setMovies(data.results)
  }

  useEffect(() => {

    const searchWithQueryUrl = `${searchUrl}?${apiKey}&query=${query}&language=pt-BR`

    getSearchedMovies(searchWithQueryUrl)
  }, [query])

  return (
    <div className='container'>
    <h2 className="title">Resultados para: 
      <span className="query-text"> {query}</span>
    </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Search