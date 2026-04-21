import React from 'react'
import type { ForecastItem, Weather } from '../Model'

interface Props {
  city: string
  setCity: React.Dispatch<React.SetStateAction<string>>
  setLocation: (e: React.FormEvent) => void
  data: Weather | null
  forecast: ForecastItem[]
  error: string
}

const Display = ({ city, setCity, setLocation, data, forecast, error }: Props) => {
  const now = new Date()

  const localTime = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const localDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  const cityDateObj = data
    ? new Date((data.dt + data.timezone) * 1000)
    : now

  const cityTime = cityDateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const cityDate = cityDateObj.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="app">
      <div className="weather-shell">
        <div className="top-row">
          <div className="brand">
            <span>Weather Forecast</span>
          </div>

          <div className="time-box">
            <h4>{data ? cityTime : localTime}</h4>
            <p>{data ? cityDate : localDate}</p>
          </div>
        </div>

        <form className="search-form" onSubmit={setLocation}>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Search city..."
          />
          <button type="submit">Search</button>
        </form>

        {error && <p className="error-text">{error}</p>}

        {data ? (
          <>
            <div className="main-grid">
              <div className="hero-card">
                <div className="hero-left">
                  <h3 className="city-name">{data.name}</h3>
                  <p className="weather-type">{data.weather[0].description}</p>
                  <h1 className="big-temp">{Math.round(data.main.temp)}°C</h1>
                  <p className="feels-like">
                    Feels like {Math.round(data.main.feels_like)}°C
                  </p>
                </div>

                <div className="hero-icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                    alt={data.weather[0].description}
                  />
                </div>
              </div>

              <div className="stats-card">
                <div className="stat-box">
                  <p className="stat-label">Humidity</p>
                  <h4 className="stat-value">{data.main.humidity}%</h4>
                </div>

                <div className="stat-box">
                  <p className="stat-label">Wind Speed</p>
                  <h4 className="stat-value">{data.wind?.speed} m/s</h4>
                </div>

                <div className="stat-box">
                  <p className="stat-label">Condition</p>
                  <h4 className="stat-value">{data.weather[0].main}</h4>
                </div>
              </div>
            </div>

            <div className="forecast-section">
              <div className="forecast-header">
                <h3>Upcoming Forecast</h3>
              </div>

              <div className="forecast-grid">
                {forecast.map((item) => (
                  <div className="forecast-card" key={item.dt}>
                    <p className="forecast-hour">
                      {new Date(item.dt_txt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>

                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt={item.weather[0].description}
                    />

                    <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
                    <p className="forecast-desc">{item.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <h3>Search a city to begin</h3>
            <p>Get current weather and elegant forecast cards instantly.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Display