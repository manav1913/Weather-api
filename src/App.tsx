import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import type { Weather, ForecastItem, ForecastResponse } from './Model'
import './App.css'
import Display from './components/Display'

const App = () => {
  const [data, setData] = useState<Weather | null>(null)
  const [city, setCity] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [forecast, setForecast] = useState<ForecastItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

   const fetchWeather = async (cityName:string)=>{
    setIsLoading(true)
   try {
    setError("")

    const currentRes = await axios.get<Weather>(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    )

    const forecastRes = await axios.get<ForecastResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
    )

    setData(currentRes.data)
    setForecast(forecastRes.data.list.slice(0, 4))
  } catch (error) {
    setError("City not found ")
    setData(null)
    setForecast([])
    console.log(error)
  }finally{
    setIsLoading(false)
  }
}

 const setLocation = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!city.trim()) return


fetchWeather(city)
 }

 useEffect(()=>{
  fetchWeather("New York")
 },[])
 



  return (
    <div>
      <Display city={city} setCity={setCity} setLocation={setLocation} data={data} forecast={forecast} error={error}/>
    </div>
  )
}

export default App
