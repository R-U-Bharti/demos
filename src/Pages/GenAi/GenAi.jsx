import React, { useEffect, useRef, useState } from 'react'
import chatBot from './chatBot.png'
import { GoogleGenerativeAI } from "@google/generative-ai";

const GenAi = () => {

    const chatContainerRef = useRef(null);

    const [chatHistory, setChatHistory] = useState([])

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [chatHistory])


    // AI Logics
    const [prompt, setPrompt] = useState('')
    const [tempImage, setTempImage] = useState(null)
    const [loader, setLoader] = useState(false)

    const API_KEY = import.meta.env.VITE_AI_KEY;

    const genAI = new GoogleGenerativeAI(API_KEY);

    const parseContent = (text) => {

        let parsedText = text;

        // Replace < and > with &lt; and &gt;
        parsedText = parsedText.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Replace ```code``` with <pre><code> tags
        parsedText = parsedText.replace(/```(\w+)([\s\S]*?)```/g, '<code style="background-color: green; padding: 4px;">$1</code><pre style="overflow: auto; padding: 0px 8px; background-color: black"><code>$2</code></pre>');

        // Replace ## with <h2> tags
        parsedText = parsedText.replace(/##\s*(.*?)\s*\n/g, '<h2>$1</h2>');

        // Replace **text** with <strong> tags
        parsedText = parsedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Replace \n with <br> for line breaks
        parsedText = parsedText.replace(/\n/g, '<br>');


        return parsedText;

    };

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const saveHistory = async (type = 'user', rText) => {

        setChatHistory((prev) => [...prev, {
            role: type,
            parts: [{ text: rText }]
        }])

        return true;

    }

    async function chatAi() {

        setLoader(true)

        // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: [...chatHistory, {
                role: 'user',
                parts: [{ text: prompt }]
            }],
            // generationConfig: {
            //   maxOutputTokens: 1000,
            // },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        await saveHistory('model', text)
        setPrompt('')
        setDocument(null)
        setTempImage(null)
        setLoader(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const saved = await saveHistory('user', prompt)

        if (saved)
            chatAi()

    }

    return (
        <>
            {/* Main Section */}
            <div className={`h-screen w-screen bg-transparent backdrop-blur-xl flex flex-col justify-start`}>

                {/* Chat Section */}
                <main ref={chatContainerRef} style={{ scrollBehavior: 'smooth' }} className='h-[88vh] py-2 overflow-auto w-full flex-col p-4 relative'>

                    {/* Static Chat */}
                    <div className='flex items-end gap-2 text-sm'>
                        <img src={chatBot} alt="Chatbot" className='md:w-[2.2vw] w-[7vw]  select-none' />
                        <div className='flex flex-col gap-1'>
                            <span className='rounded-md bg-gray-200/30 w-max flex flex-col px-4 p-2'>
                                <span>Hi there 👋 </span>
                                <span>Welcome to <span className='font-bold text-lg'>Gen AI</span> </span>
                            </span>
                            <span className='rounded-md bg-gray-200/30 w-max px-4 p-2'>
                                How can I help you ?
                            </span>
                        </div>
                    </div>

                    {/* Dynamic Chat */}
                    <div className='w-full mt-6'>

                        {
                            chatHistory?.map((elem) => <>
                                {elem?.role === 'user' &&
                                    <div className='w-full flex justify-end mt-4 select-none'>
                                        <div className='w-full md:w-[75%] flex flex-wrap items-end justify-end gap-2 animate__animated animate__fadeInRight '>
                                            <span className='w-max text-sm px-4 p-1 rounded-md border border-indigo-600 bg-indigo-400 text-white'>{elem?.parts[0]?.text}</span>
                                        </div>
                                    </div>
                                }

                                {elem?.role === 'model' &&
                                    <div className='flex items-end gap-2 mt-4 w-full md:w-[80%] animate__animated animate__fadeInLeft animate__faster'>
                                        <img src={chatBot} alt="Chatbot" className='md:block hidden md:w-[2.2vw] w-[7vw]  select-none' />
                                        <div className='w-full overflow-auto'>
                                            <div className='rounded-md bg-gray-200/30 w-full md:w-[90%] p-2 text-sm md:text-base md:text-start text-justify' dangerouslySetInnerHTML={{ __html: parseContent(elem?.parts[0]?.text) }} />
                                        </div>
                                    </div>
                                }
                            </>)
                        }

                    </div>

                </main>

                <div className='w-full text-sm h-[7vh]'>
                    <div className='flex w-full'>
                        <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                            {tempImage && <img className='border w-full md:w-[50%]' src={URL.createObjectURL(tempImage)} alt="" srcset="" />}

                            <div className='flex w-full'>
                                <textarea value={prompt} cols={2} style={{ resize: 'none' }} placeholder='Prompt Here...' type="text" name="" id="" onChange={e => setPrompt(e.target.value)} className='w-full px-2 md:py-1.5 py-1 bg-black/30 focus:outline-none border border-gray-300/40' />
                                <button disabled={loader} type="submit" className='text-sm px-3 py-1.5 bg-green-500 hover:bg-green-600'>{loader ? "Thinking...." : "Go"}</button>
                            </div>

                        </form>
                    </div>
                </div>

                <div className="mt-3 h-[4vh] md:text-sm text-xs italic text-center">
                    Created By @ R U Bharti
                </div>

            </div>

        </>
    )
}

export default GenAi