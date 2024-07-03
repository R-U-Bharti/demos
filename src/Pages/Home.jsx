import React from 'react'
import genAi from './GenAi/genAi.png'
import tictactoe from './TicTacToe/tictactoe.jpg'
import imageAnalyser from './GenAi/imageAnalyser.jpg'
import Cards from './Cards'

const Home = () => {

    const projects = [
        { image: tictactoe, name: "TicTacToe", path: "/tic-tac-toe" },
        { image: genAi, name: "Gen AI", path:"/gen-ai" },
        { image: imageAnalyser, name: "AI Image Analyser", path: "/image-analyser" },
    ]

    return (
        <div className='h-screen w-screen p-4'>

            <h1 className='text-2xl font-semibold text-center pt-4 mb-6'>Interesting Projects By <span className='cursor-pointer hover:underline text-indigo-200' onClick={() => window.open("https://r-u-bharti.github.io/portfolio", "_blank")}>R U Bharti</span></h1>

            <div className='flex flex-wrap gap-4 pb-4'>
                {
                    projects?.map((elem, index) =>
                        <Cards key={index} data={elem} />
                    )
                }
            </div>

        </div>
    )
}

export default Home