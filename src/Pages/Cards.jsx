import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cards = ({ data }) => {

    const navigate = useNavigate()

    return (
        <>
            <div onClick={() => navigate(data?.path)} className="w-full md:w-max transition-all duration-200 cursor-pointer border-2 flex flex-col items-center justify-between p-2 rounded-md border-white/80 hover:border-blue-700 hover:shadow-[0px_0px_20px_rgba(0,0,255,0.5)] hover:bg-blue-800/10">
                <img src={data?.image} alt="" srcset="" className='w-full object-cover transition-all duration-300 rounded-md ease-in-out bg-blue-800/10 md:h-[260px]' />
                <div className=' transition-all duration-300 ease-in-out  w-full text-xl font-semibold h-[40px] flex items-center justify-center'>{data?.name}</div>
            </div>
        </>
    )
}

export default Cards