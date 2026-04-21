import React, { useEffect, useState } from 'react'
import axios, { Axios } from 'axios'
import type { Weather } from './Model'
import './App.css'
import Input from './components/Input'

const App = () => {
  const [data, setData] = useState<Weather | null>(null)
  const [city, setCity] = useState<string>("")


  return (
    <div>
      <Input/>
    </div>
  )
}

export default App
