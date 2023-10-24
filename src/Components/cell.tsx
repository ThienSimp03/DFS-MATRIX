import React from 'react'

type Props = {
    row: number
    column: number
    value: number
    setMangBanDau?: React.Dispatch<React.SetStateAction<number[][]>>
}

const Cell = ({ row, column, value, setMangBanDau }: Props) => {
    return (
        <div
            className={`h-12 w-12 border border-solid ${
                value === 1
                    ? 'bg-white'
                    : value === 0
                    ? 'bg-slate-700'
                    : value === 3
                    ? 'bg-red-500'
                    : value === 4
                    ? 'bg-green-500'
                    : 'bg-yellow-400'
            }`}
            onClick={() => {
                if (setMangBanDau) {
                    setMangBanDau((prev) => {
                        const newArr = [...prev]
                        newArr[row][column] = 0
                        return newArr
                    })
                }
            }}
        ></div>
    )
}

export default Cell
