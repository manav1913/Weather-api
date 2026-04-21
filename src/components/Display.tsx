import React from 'react'
import type { Weather } from '../Model'

interface Props{
    city:string
    setCity:React.Dispatch<React.SetStateAction<string>>
    setLocation:(e:React.FormEvent)=>void
    data:Weather | null
}

const Display = ({city, setCity, setLocation,data}:Props) => {




  return (
    <div>
      <form onSubmit={setLocation}>

        <input
        value={city}
        onChange={(e)=>{
          setCity(e.target.value)
        }}
         type="text" 
         placeholder='Search City' />
        <button>Search</button>

      </form>
      <div>
        {data&&(
          <>
            <h3>{data.name}</h3>
            <h4>{data.main.temp}°C</h4>
          </>
        )}
      </div>
    </div>
  )
}

export default Display
