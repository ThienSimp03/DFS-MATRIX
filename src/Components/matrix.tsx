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
        <div className={`mt-10 w-max grid grid-rows-${rows}`}>
            {matrix.map((row, i) => {
                return (
                    <div key={i} className={`flex`}>
                        {row.map((cell, j) => {
                            return (
                                <Cell key={j} row={i} column={j} value={matrix[i][j]} setMangBanDau={setMangBanDau} />
                            )
                        })}
                    </div>
                )
            })}
            <p className={`text-xl font-bold py-2  text-center`}>{title}</p>
        </div>
    )
}

export default Matrix
