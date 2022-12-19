import React from "react"
import {Routes, Route} from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { TodoList } from './page/TodoList'
import { Magazin } from './page/Magazin'
import { Wether } from './page/Wether'
import './App.scss'


function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<TodoList/>}/>
      <Route path="/magazin" element={<Magazin/>}/>
      <Route path="/wether" element={<Wether/>}/>
    </Routes>
    </>
  )
}

export default App
