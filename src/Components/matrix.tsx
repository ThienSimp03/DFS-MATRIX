import React from 'react'
import Cell from './cell'

type Props = {
    rows: number
    columns: number
    matrix: number[][]
    setMangBanDau: React.Dispatch<React.SetStateAction<number[][]>>
    title: string
}

const Matrix = ({ rows, columns, matrix, setMangBanDau, title }: Props) => {
    return (
        <div className='flex flex-col justify-center items-center px-5 relative'>
            <div className={`mt-10 w-max grid grid-rows-${rows} z-10`}>
                {matrix.map((row, i) => {
                    return (
                        <div key={i} className={`flex`}>
                            {row.map((cell, j) => {
                                return (
                                    <Cell
                                        key={j}
                                        row={i}
                                        column={j}
                                        value={matrix[i][j]}
                                        setMangBanDau={setMangBanDau}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <p className={`text-xl font-bold py-2 text-center z-10`}>{title}</p>
            <div className='absolute inset-0 blur-sm bg-[#581b98] z-0'></div>
        </div>
    )
}

export default Matrix
