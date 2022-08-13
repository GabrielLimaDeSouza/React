import React from 'react'
import MovieCard from '../components/MovieCard'

import { useState, useEffect } from 'react'

import './MovieGrid.css'

const moviesURL = "https://api.themoviedb.org/3/movie/"
const apiKey = "api_key=e1ae03ebad415514b075ec793d27cbd2"

const Home = () => {
  const [topMovies, setTopMovies] = useState([])

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setTopMovies(data.results)
  }

  useEffect(() => {

    const topRatedUrl = `${moviesURL}top_rated?${apiKey}&language=pt-BR`

    getTopRatedMovies(topRatedUrl)
  }, [])

  return (
    <div className='container'>
      <h2 className="title">Melhores Filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Home