import React from 'react'
import 'animate.css'
import TicTac from './Pages/TicTacToe/TicTac'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useNavigate } from 'react-router-dom'
import GenAi from './Pages/GenAi/GenAi'
import Home from './Pages/Home'

const App = () => {

  const navigate = useNavigate()

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

      <button onClick={() => navigate('/')} className='fixed top-0 right-0 p-2 rounded-full bg-slate-500/50 z-50'>🏡</button>

    </>
  )
}

export default App