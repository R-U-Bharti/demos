import React, { Suspense, lazy } from 'react'
import 'animate.css'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useNavigate } from 'react-router-dom'
const TicTac = lazy(() => import('./Pages/TicTacToe/TicTac'))
const GenAi = lazy(() => import('./Pages/GenAi/GenAi'))
const Home = lazy(() => import('./Pages/Home'))
const ImageAnalyser = lazy(() => import('./Pages/GenAi/ImageAnalyser'))

const App = () => {

  const navigate = useNavigate()

  return (
    <>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Suspense fallback={
        <div className='h-screen w-screen flex items-center justify-center'>
          <div class="pyramid-loader">
            <div class="wrapper">
              <span class="side side1"></span>
              <span class="side side2"></span>
              <span class="side side3"></span>
              <span class="side side4"></span>
              <span class="shadow"></span>
            </div>
          </div>
        </div>
      }>

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/tic-tac-toe' element={<TicTac />} />
          <Route path='/gen-ai' element={<GenAi />} />
          <Route path='/image-analyser' element={<ImageAnalyser />} />

        </Routes>

      </Suspense>

      <attr title="Home" onClick={() => navigate('/')} className='fixed cursor-pointer top-2 right-2 p-2 rounded-full bg-black hover:bg-white border border-white z-50'>🏡</attr>

    </>
  )
}

export default App