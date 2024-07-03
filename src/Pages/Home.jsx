import React from 'react'
import chat from './GenAi/chatBot.png'
import tictactoe from './TicTacToe/tictactoe.png'
import Cards from './Cards'

const Home = () => {

    const projects = [
        { image: chat, name: "Gen AI", path:"/gen-ai" },
        { image: tictactoe, name: "TicTacToe", path:"/tic-tac-toe" }
    ]

    return (
        <div className='h-screen w-screen p-4'>

            <h1 className='text-2xl font-semibold text-center pt-4 mb-6'>Interesting Projects By <span className='cursor-pointer hover:underline text-indigo-200' onClick={() => window.open("https://r-u-bharti.github.io/portfolio", "_blank")}>R U Bharti</span></h1>

            <div className='flex flex-wrap gap-4'>
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