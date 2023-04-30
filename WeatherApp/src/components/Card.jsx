import React from 'react'
import { useState } from 'react'
import '../App.css'
import ButtonSuggestion from './ButtonSuggestion'

const apiKey = "38d85f2a86a69263b8cb6e1866d4f490"
const apiWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?"

const Card = () => {
    
    const [search,setSearch] = useState("")
    const [cityElement,setCityElement] = useState("")
    const [tempElement,setTempElement] = useState("")
    const [hideInformation,setHideInformation] = useState("hideInformation")
    const [hideSuggestion, setHideSuggestion] = useState("")
    const [descElement,setDescElement] = useState("")
    const [weatherIconElement,setWeatherIconElement] = useState("")
    const [humidityElement,setHumidityElement] = useState("")
    const [windElement,setWindElement] = useState("")
  
    var suggestions = ['São Paulo', 'Tokyo', 'Moscou', 'Berlim', 'Buenos Aires', 'Pequim', 'Nova Iorque', 'Sydney']
  
  
    const handleSubmit = (e) => {
      setSearch("")
      if(!search){
        setHideInformation("hideInformation")
        return
      }
      e.preventDefault()
      showWeatherData()
    }
  
    const getWeatherData = async() => {
      const weatherApiUrl = `${apiWeatherUrl}q=${search}&units=metric&appid=${apiKey}&lang=pt_br`
      
      const res = await fetch(weatherApiUrl)
      const data = await res.json()
      
      return data
    }
  
    const showWeatherData = async() => {
      const data = await getWeatherData()
        setCityElement(data.name)
        setTempElement(parseInt(data.main.temp))
        setDescElement(data.weather[0].description)
        setWeatherIconElement(data.weather[0].icon)
        setHumidityElement(data.main.humidity)
        setWindElement(data.wind.speed)
        setHideInformation("")
        setHideSuggestion("hideSuggestion")
    }
  
    function typeEnter(e){
      if(e.code === 'Enter'){
        handleSubmit()
      }
    }

  return (
    <div className="container">
    <div className="form">
      <h3>Confira o clima de uma cidade:</h3>
      <form className="form-input-container" onSubmit={handleSubmit}>
        <input type="text" placeholder="Digite o nome da cidade" name="city-input" id="city-input" onKeyUp={typeEnter} onChange={(e) => setSearch(e.target.value)} value={search}/>
        <button type="submit" id="search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
    <div id="weather-data" className={hideInformation}>
      <h2>
        <i className="fa-solid fa-location-dot"></i>
        <span id="city">{cityElement}</span>
      </h2>
      <p id="temperature">
        <span>{tempElement}</span>&deg;C
      </p>
      <div id="description-container">
        <p id="description">{descElement}</p>
        <img src={`http://openweathermap.org/img/wn/${weatherIconElement}.png`} alt="Condições do tempo" id="weather-icon" />
      </div>
      <div id="details-container">
        <p id="humidity">
          <i className="fa-solid fa-droplet"></i>
          <span>{humidityElement}%</span>
        </p>
        <p id="wind">
          <i className="fa-solid fa-wind"></i>
          <span>{windElement}km/h</span>
        </p>
      </div>
    </div>
    <div className={hideSuggestion}>
      <div className='suggestions'>
        {suggestions.map((suggest) => <button className='button' onClick={()=>{setSearch(suggest)}}>
          <ButtonSuggestion city={suggest} /></button>)
        }
      </div>
    </div>
  </div>
  )
}

export default Card