import React, { useEffect, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server';
import toast from 'react-hot-toast';
import './TicTac.css'

const TicTac = () => {

    const [first, setFirst] = useState(true)
    const [matchEnd, setMatchEnd] = useState(false)

    const [squares, setSquares] = useState(['', '', '', '', '', '', '', '', ''])

    const cell1 = useRef(null)
    const cell2 = useRef(null)
    const cell3 = useRef(null)
    const cell4 = useRef(null)
    const cell5 = useRef(null)
    const cell6 = useRef(null)
    const cell7 = useRef(null)
    const cell8 = useRef(null)
    const cell9 = useRef(null)

    const dialogRef = useRef(null)

    let cross = <div className="relative animate__animated animate__zoomIn animate__faster h-full w-full bg-red-200 flex items-center justify-center">
        <div className="h-[10vh] w-[1vh] border border-red-600 bg-red-300 rotate-45 absolute"></div>
        <div className="h-[10vh] w-[1vh] border border-red-600 bg-red-300 -rotate-45"></div>
    </div>


    let circle = <div className="relative animate__animated animate__zoomIn animate__faster h-full w-full bg-green-200 flex items-center justify-center">
        <div className="h-[10vh] w-[10vh] rounded-full border border-green-600 bg-green-300"></div>
        <div className="h-[7vh] w-[7vh] rounded-full border border-green-600 bg-green-200 absolute"></div>
    </div>

    const resetFun = () => {
        cell1.current.innerHTML = '';
        cell1.current.accessKey = '';

        cell2.current.innerHTML = '';
        cell2.current.accessKey = '';

        cell3.current.innerHTML = '';
        cell3.current.accessKey = '';

        cell4.current.innerHTML = '';
        cell4.current.accessKey = '';

        cell5.current.innerHTML = '';
        cell5.current.accessKey = '';

        cell6.current.innerHTML = '';
        cell6.current.accessKey = '';

        cell7.current.innerHTML = '';
        cell7.current.accessKey = '';

        cell8.current.innerHTML = '';
        cell8.current.accessKey = '';

        cell9.current.innerHTML = '';
        cell9.current.accessKey = '';

        setFirst(true)
        setSquares(['', '', '', '', '', '', '', '', ''])
        setMatchEnd(false)
    }

    const checkWinner = (cells, user, bot) => {

        let sqr = cells ?? squares;

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (sqr[a] && sqr[a] === sqr[b] && sqr[a] === sqr[c]) {
                toast(`🥳🥳 Player ${sqr[a] === 'x' ? "1" : '2'} Won the match 🥳🥳`, {
                    icon: '🤗', style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                })
                setMatchEnd(true)
                return;
            }
        }

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (sqr[a] === bot && sqr[a] === sqr[b] && sqr[c] === '')
                return c;

            if (sqr[a] === bot && sqr[a] === sqr[c] && sqr[b] === '')
                return b;

            if (sqr[b] === bot && sqr[b] === sqr[c] && sqr[a] === '')
                return a;

        }

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (sqr[a] === user && sqr[a] === sqr[b] && sqr[c] === '')
                return c;

            if (sqr[a] === user && sqr[a] === sqr[c] && sqr[b] === '')
                return b;

            if (sqr[b] === user && sqr[b] === sqr[c] && sqr[a] === '')
                return a;

        }

        // let draw = sqr.includes('')

        // if (!draw) {
        //     toast("🥴🥴 Match Draw 🥴🥴", {
        //         icon: '🤭', style: {
        //             borderRadius: '10px',
        //             background: '#333',
        //             color: '#fff',
        //         },
        //     })
        //     setMatchEnd(true)
        // }

    }

    const XPlayerStep = (cell) => {

        if (matchEnd) {
            return;
        }

        let cellId = cell.current.id
        const crossHtml = ReactDOMServer.renderToString(cross);

        cell.current.innerHTML = crossHtml
        cell.current.accessKey = 'x'

        let sq = [];

        if (!squares[parseInt(cellId)]) {
            setFirst(false)
            setSquares(prevSquares => {
                const newSquares = [...prevSquares];
                newSquares[parseInt(cellId)] = 'x';
                sq = newSquares;
                return newSquares;
            });

            if (!matchEnd && player == '1' && choose === 'x') {
                setTimeout(() => {
                    autoOMove(sq)
                }, 1000);
            }
        }

        checkWinner(sq)

    }

    const OPlayerStep = (cell) => {

        if (matchEnd) {
            return;
        }

        let cellId = cell.current.id
        const circleHtml = ReactDOMServer.renderToString(circle);

        cell.current.innerHTML = circleHtml
        cell.current.accessKey = 'o'

        let sq = [];

        if (!squares[parseInt(cellId)]) {
            setFirst(true)
            setSquares(prevSquares => {
                const newSquares = [...prevSquares];
                newSquares[parseInt(cellId)] = 'o';
                sq = newSquares;
                return newSquares;
            });

            if (!matchEnd && player == '1' && choose === 'o') {
                setTimeout(() => {
                    autoOMove(sq)
                }, 1000);
            }
        }

        checkWinner(sq)

    }

    const getCellRef = (ind) => {
        if (ind == 0)
            return cell1;

        if (ind == 1)
            return cell2;

        if (ind == 2)
            return cell3;

        if (ind == 3)
            return cell4;

        if (ind == 4)
            return cell5;

        if (ind == 5)
            return cell6;

        if (ind == 6)
            return cell7;

        if (ind == 7)
            return cell8;

        if (ind == 8)
            return cell9;
    }

    const autoOMove = (sqr) => {

        let cells = sqr ?? squares;

        if (matchEnd) {
            return;
        }

        let indexes = cells?.map((item, index) => {
            if (!item) {
                return index;
            }
        })?.filter(item => item !== undefined)

        console.log(cells, '\n', indexes)

        let ind = Math.floor(Math.random() * indexes.length);

        let beatIndex = checkWinner(cells, choose, choose === 'x' ? 'o' : 'x') || indexes[ind]

        console.log('check winner: ', beatIndex)

        setTimeout(() => {
            if (choose === 'x') {
                OPlayerStep(getCellRef(beatIndex))
            } else {
                XPlayerStep(getCellRef(beatIndex))
            }
        }, 500);
    }

    const handleCell = (cell) => {

        if (matchEnd) {
            return;
        }

        let cellId = cell.current.id

        if (!cell.current.accessKey) {
            if (first) {
                if (player == '2') {
                    XPlayerStep(cell, cellId)
                } else if (player == '1' && choose === 'x') {
                    XPlayerStep(cell, cellId)
                }
            } else {
                if (player == '2') {
                    OPlayerStep(cell, cellId)
                } else if (player == '1' && choose === 'o') {
                    OPlayerStep(cell, cellId)
                }
            }
        }

    }

    useEffect(() => {
        checkWinner()
    }, [squares])

    const [player, setPlayer] = useState('')
    const [choose, setChoose] = useState('')
    const [error, setError] = useState(false)

    const openModal = () => {
        dialogRef.current.showModal()
        setPlayer('')
        setChoose('')
        resetFun()
    }

    const closeModal = () => {
        dialogRef.current.close()
    }

    const selectPlayer = (value) => {
        setPlayer(value)
    }

    const startGame = () => {

        if (!player) {
            toast("Select Player", {
                icon: '🤳', style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        }

        if (player == '1') {
            if (!choose) {
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 500);
                return
            } else {
                toast("Single Player Started", {
                    icon: '🚀', style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    }
                })
                if (choose === 'x') {
                    toast("Your Turn", {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        }
                    })
                } else {
                    autoOMove()
                }
                closeModal()
            }
        }

        if (player == '2') {
            toast("Multi Player Started", {
                icon: '🚀', style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
            closeModal()
        }
    }

    useEffect(() => {
        openModal()
    }, [])

    const restartGame = () => {
        resetFun()
        openModal()
    }

    return (
        <>
            <div className='flex flex-col items-center justify-center w-screen gap-4'>

                <div className="text-xl font-bold uppercase">🥴 Tic Tac Toe 🥴</div>
                <div className="md:h-[60vh] h-[45vh] md:w-[60vh] w-[45vh] rounded-sm shadow-[0px_0px_10px_#152d47] border border-gray-500 bg-white/5 backdrop-blur-lg grid grid-cols-12">

                    <div ref={cell1} id='0' onClick={() => handleCell(cell1)} className={`col-span-4 cursor-pointer md:h-[20vh] h-[15vh] md:w-[20vh] w-[15vh] border-b-2 border-r-2 border-gray-500`} />
                    <div ref={cell2} id='1' onClick={() => handleCell(cell2)} className={`col-span-4 cursor-pointer md:h-[20vh] h-[15vh] md:w-[20vh] w-[15vh] border-b-2 border-r-2 border-gray-500`} />
                    <div ref={cell3} id='2' onClick={() => handleCell(cell3)} className={`col-span-4 cursor-pointer md:h-[20vh] h-[15vh] md:w-[20vh] w-[15vh] border-b-2 border-gray-500`} />

                    <div ref={cell4} id='3' onClick={() => handleCell(cell4)} className={`col-span-4 cursor-pointer md:h-[20vh] h-[15vh] md:w-[20vh] w-[15vh] border-b-2 border-r-2 border-gray-500`} />
                    <div ref={cell5} id='4' onClick={() => handleCell(cell5)} className={`col-span-4 cursor-pointer md:h-[20vh] h-[15vh] md:w-[20vh] w-[15vh] border-b-2 border-r-2 border-gray-500`} />
                    <div ref={cell6} id='5' onClick={() => handleCell(cell6)} className={`col-span-4 cursor-pointer md:h-[20vh] h-[15vh] md:w-[20vh] w-[15vh] border-b-2 border-gray-500`} />

                    <div ref={cell7} id='6' onClick={() => handleCell(cell7)} className={`col-span-4 cursor-pointer md:h-[20vh] h-[15vh] md:w-[20vh] w-[15vh] border-r-2 border-gray-500`} />
                    <div ref={cell8} id='7' onClick={() => handleCell(cell8)} className={`col-span-4 cursor-pointer md:h-[20vh] h-[15vh] md:w-[20vh] w-[15vh] border-r-2 border-gray-500`} />
                    <div ref={cell9} id='8' onClick={() => handleCell(cell9)} className={`col-span-4 cursor-pointer md:h-[20vh] h-[15vh] md:w-[20vh] w-[15vh]`} />

                </div>

                <button className='button1' onClick={() => restartGame()}>Restart</button>

            </div>

            <dialog ref={dialogRef} className='h-screen w-screen bg-transparent backdrop-brightness-50 focus:outline-none'>
                <div className="w-full h-full flex justify-center items-center p-10 overflow-clip">
                    <div className="animate__animated animate__flipInY animate__faster bg-white/10 backdrop-blur-sm border border-white/40">
                        <form action="" class="container p-[2rem]">

                            <input class="input-btn" type="radio" id="valueIs-2" onClick={() => selectPlayer('2')} name="valueIs-radio" value="2" />
                            <label onClick={() => selectPlayer('2')} class="neon-btn" for="valueIs-2">
                                <span class="span"></span>
                                <span class="txt">Multi Player</span>
                            </label>

                            <input class="input-btn" type="radio" id="valueIs-1" onClick={() => selectPlayer('1')} name="valueIs-radio" value="1" />
                            <label onClick={() => selectPlayer('1')} class="neon-btn" for="valueIs-1">
                                <span class="span"></span>
                                <span class="txt">Single Player</span>
                            </label>

                        </form>

                        <div className={`flex flex-col w-full gap-2 items-center pb-10 px-10 animate__animated ${error ? 'animate__shakeX animate__faster' : ''}`}>
                            <h3 className='w-full text-center text-lg font-semibold'>Select Element</h3>
                            <div className='flex w-[100%] gap-4'>
                                <div onClick={() => setChoose('x')} className={`w-1/2 p-2 ${choose === 'x' ? 'bg-green-700' : 'bg-white'} cursor-pointer`}>{cross}</div>
                                <div onClick={() => setChoose('o')} className={`w-1/2 p-2 ${choose === 'o' ? 'bg-green-700' : 'bg-white'} cursor-pointer`}>{circle}</div>
                            </div>
                        </div>

                        <div className='flex justify-center mb-10'>
                            <button className='button' onClick={() => startGame()}>Start</button>
                        </div>

                    </div>
                </div>
            </dialog>

        </>
    )
}

export default TicTac
