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
        <div className="flex flex-wrap gap-4 md:px-8 justify-center px-2 md:py-4 py-2 animate__animated animate__fadeIn">

            <div className="w-full flex justify-center">
                <h1 className='text-2xl font-medium text-center py-2 mt-2 mb-4 border-b border-gray-400 w-max px-10'>Entertaining Projects By <span className="font-bold text-amber-400 hover:underline cursor-pointer" onClick={() => window.open('https://r-u-bharti.github.io/portfolio', '_blank')}>R U Bharti</span></h1>
            </div>

                {
                    projects?.map((elem, index) =>
                        <Cards key={index} data={elem} />
                    )
                }

        </div>
    )
}

export default Home