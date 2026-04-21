import React from 'react'
import type { ForecastItem, Weather } from '../Model'

interface Props {
  city: string
  setCity: React.Dispatch<React.SetStateAction<string>>
  setLocation: (e: React.FormEvent) => void
  data: Weather | null
  forecast: ForecastItem[]
}

const Display = ({ city, setCity, setLocation, data, forecast }: Props) => {

  const now = new Date()
  const time = now.toLocaleTimeString()
  const day = new Date().toLocaleString("en-US", { weekday: "long" })
  const date = now.getDate()
  const month = new Date().toLocaleString("en-US", { month: "short" })
  const year = now.getFullYear()


  return (
    <div>
      <div>
        <h4>{time}</h4>
        <p>{day},{date} {month} {year}</p>

      </div>
      <form onSubmit={setLocation}>

        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value)
          }}
          type="text"
          placeholder='Search City' />
        <button>Search</button>

      </form>
      <div>
        {data && (
          <>
            <h3>{data.name}</h3>
            <h4>{data.main.temp}°C</h4>
            <h5>{data.wind?.speed}</h5>
            <p>{data.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`} alt="" />
          </>
        )}
      </div>
      <div>
        {forecast.map((item) => <div key={item.dt}>
          <p>{item.dt_txt}</p>
          <p>{item.main.temp}°C</p>
          <p>{item.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt="forecast icon"
          />
        </div>)}
      </div>
    </div>
  )
}

export default Display
