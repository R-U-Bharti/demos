import React from 'react'
import 'animate.css'
import TicTac from './Pages/TicTacToe/TicTac'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import GenAi from './Pages/GenAi/GenAi'
import Home from './Pages/Home'

const App = () => {
  return (
    <>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/tic-tac-toe' element={<TicTac />} />

        <Route path='/gen-ai' element={<GenAi />} />

      </Routes>

    </>
  )
}

export default App