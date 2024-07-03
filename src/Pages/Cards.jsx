import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cards = ({ data }) => {
    
    const navigate = useNavigate()

    return (
        <>
            <div onClick={() => navigate(data?.path)} className='transition-all duration-300 group w-[25%] h-[300px] hover:scale-90 hover:shadow-[0_05px_60px_-15px_rgba(0,0,255,0.5)] border rounded-md border-blue-800 cursor-pointer flex flex-col items-center'>
                <img src={data?.image} alt="" srcset="" className='w-full object-cover transition-all duration-300 ease-in-out bg-blue-950/50 p-2 h-[260px]' />
                <div className=' transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-950 to-blue-400  w-full text-xl font-semibold h-[40px] flex items-center justify-center'>{data?.name}</div>
            </div>
        </>
    )
}

export default Cards