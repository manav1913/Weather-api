import React from 'react'

interface Props{
    city:string
    setCity:React.Dispatch<React.SetStateAction<string>>
}

const Input = ({city, setCity}:Props) => {




  return (
    <div>
      <form>

        <input
        value={city}
        
         type="text" 
         placeholder='Search City' />
        <button>Search</button>

      </form>
    </div>
  )
}

export default Input
