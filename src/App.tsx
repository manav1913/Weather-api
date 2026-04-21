import React, { useEffect, useState } from 'react'
import axios, { Axios } from 'axios'
import type { Weather } from './Model'
import './App.css'
import Display from './components/Display'

const App = () => {
  const [data, setData] = useState<Weather | null>(null)
  const [city, setCity] = useState<string>("")

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  const setLocation = (e:React.FormEvent)=>{
    e.preventDefault()
    axios.get<Weather>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then((res)=>{
      setData(res.data)
    })
  }
console.log(data)
  return (
    <div>
      <Display city={city} setCity={setCity} setLocation={setLocation} data={data}/>
    </div>
  )
}

export default App
