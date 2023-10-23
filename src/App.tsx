import { useState, useEffect } from 'react'

function App() {
    // State
    const [soDong, setSoDong] = useState<number>(0)
    const [soCot, setSoCot] = useState<number>(0)
    const [mangBanDau, setMangBanDau] = useState<number[][]>([])
    const [mangDuongDaDi, setMangDuongDaDi] = useState<number[][]>([])
    const [mangKetQua, setMangKetQua] = useState<number[][]>([])

    // Function
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className='bg-[#1f4287] w-full min-h-screen'>
            <h1 className='text-4xl font-bold text-center py-5'>Tìm đường đi trong mê cung bằng thuật toán DFS</h1>
            <form onSubmit={onSubmit} className='flex gap-20 pl-5'>
                <label>
                    <p className='text-2xl mb-1'>Nhập số dòng: </p>
                    <input type='text' className='outline-none p-1' />
                </label>
                <button type='submit'>Tạo mảng</button>
            </form>
        </div>
    )
}

export default App
