import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Bookmark from './Components/Bookmark'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Bookmark />
  )
}

export default App
