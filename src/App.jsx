import React from "react"
import {Routes, Route} from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { TodoList } from './page/TodoList'
import { Wether } from './page/Wether'
import { Magazin } from './page/Magazin'
import ItemProd from './components/ItemProd'
import './App.scss'


function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<TodoList/>}/>
      <Route path="/magazin" element={<Magazin/>}/>
      <Route path="/magazin/:id" element={<ItemProd/>}/>
      <Route path="/wether" element={<Wether/>}/>
    </Routes>
    </>
  )
}

export default App
