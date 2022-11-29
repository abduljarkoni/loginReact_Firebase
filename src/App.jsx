import React from 'react'
import {Routes, Route} from "react-router-dom"


export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <h1>Login Page </h1> } />
      <Route path="/register" element={ <h1>Register Page </h1> } />
      <Route path="/dashboard" element={<h1>Dashboard Page </h1>} />
    </Routes>
  )
}
