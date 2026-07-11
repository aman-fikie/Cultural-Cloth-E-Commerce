import { useState } from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './components/login/login.jsx';
import RegistrationPage from './components/registration/RegistrationPage.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<RegistrationPage />} />
    </Routes>
  )
}

export default App
