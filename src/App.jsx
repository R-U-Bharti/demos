import React from 'react'
import 'animate.css'
import TicTac from './Pages/TicTac'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <TicTac />
    </>
  )
}

export default App