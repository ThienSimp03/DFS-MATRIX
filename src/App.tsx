import { useState, useEffect } from 'react'
import Matrix from './Components/matrix'

function App() {
    // State
    const [soDong, setSoDong] = useState<string>()
    const [soCot, setSoCot] = useState<string>()
    const [check, setCheck] = useState<boolean>(false)
    const [run, setRun] = useState<boolean>(false)
    const [soDongMatrix, setSoDongMatrix] = useState<number>(0)
    const [soCotMatrix, setSoCotMatrix] = useState<number>(0)
    const [mangBanDau, setMangBanDau] = useState<number[][]>([])
    const [mangDuongDaDi, setMangDuongDaDi] = useState<number[][]>([])
    const [mangKetQua, setMangKetQua] = useState<number[][]>([])
    const [mangThucThi, setMangThucThi] = useState<number[][]>([])
    const [mangDuongDi, setMangDuongDi] = useState<{ x: number; y: number }[]>([])
    const p = [
        [-1, 0],
        [0, -1],
        [0, 1],
        [1, 0]
    ]
    let tmp1: number[][] = []
    let tmp2: number[][] = []
    let tmp3: { x: number; y: number }[] = []
    let checkTmp: boolean = false

    // Function
    const create2DArray = (rows: number, columns: number) => {
        if (rows === 0 || columns === 0) return []
        let arr = new Array(rows)
        for (let i = 0; i < rows; i++) {
            arr[i] = new Array(columns)
        }
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                arr[i][j] = 1 // gán ban đầu là ô đi được
            }
        }
        arr[0][0] = 3 // gán ô đầu tiên là ô bắt đầu
        arr[rows - 1][columns - 1] = 4 // gán ô cuối cùng là ô kết thúc
        return arr
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Number.isNaN(Number(soDong)) || Number.isNaN(Number(soCot))) {
            alert('Số dòng và số cột phải là số')
            return
        }
        if (Number(soDong) > 20 || Number(soCot) > 20) {
            alert('Số dòng phải <= 20 và số cột phải <= 20')
            return
        }
        setSoDongMatrix(Number(soDong))
        setSoCotMatrix(Number(soCot))
    }
    const Reset = () => {
        setSoDongMatrix(Number(0))
        setSoCotMatrix(Number(0))
        setSoCot('')
        setSoDong('')
        setCheck(false)
        setRun(false)
    }
    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    async function dfs(x: number, y: number) {
        tmp3.push({ x: x, y: y })
        await sleep(1000)
        setMangThucThi((prev) => {
            console.log(x, y)
            let tmp = JSON.parse(JSON.stringify(prev))
            tmp[x][y] = 5
            return tmp
        })
        if (checkTmp === true) return
        if (tmp1[x][y] === 4) {
            alert('Tìm thấy đường đi')
            checkTmp = true
            return
        }
        if (tmp1[x][y] !== 3) {
            // Kiểm tra không phải là điểm bắt đầu
            tmp1[x][y] = 5
            tmp2[x][y] = 5
        }
        for (let i = 0; i < 4; i++) {
            const x1 = x + p[i][0]
            const y1 = y + p[i][1]
            if (x1 < 0 || y1 < 0 || x1 >= soCotMatrix || y1 >= soDongMatrix) continue
            if (tmp1[x1][y1] !== 5 && mangBanDau[x1][y1] !== 0 && mangBanDau[x1][y1] !== 3 && !checkTmp) {
                // console.log(x1, y1)

                await dfs(x1, y1)
            }
        }
        if (!checkTmp && tmp1[x][y] !== 3) {
            tmp2[x][y] = 1
            tmp3.pop()
            setMangThucThi((prev) => {
                console.log(x, y)
                let tmp = JSON.parse(JSON.stringify(prev))
                tmp[x][y] = 1
                return tmp
            })
        }
    }

    const DFS = async () => {
        setRun(true)
        // Sao chép mảng mangDuongDaDi vào tmp1
        tmp1 = JSON.parse(JSON.stringify(mangDuongDaDi))
        // Sao chép mảng mangKetQua vào tmp2
        tmp2 = JSON.parse(JSON.stringify(mangKetQua))
        await dfs(0, 0)
        if (checkTmp === false) {
            alert('Không tìm thấy đường đi')
            return
        }
        setCheck(true)
        setMangDuongDaDi(tmp1)
        setMangKetQua(tmp2)
        setMangDuongDi(JSON.parse(JSON.stringify(tmp3)))
    }

    useEffect(() => {
        setMangBanDau(create2DArray(soDongMatrix, soCotMatrix))
    }, [soDongMatrix, soCotMatrix])
    useEffect(() => {
        let tmp3 = mangBanDau
        setMangDuongDaDi(tmp3)
        setMangKetQua(tmp3)
        setMangThucThi(tmp3)
    }, [mangBanDau])

    return (
        <div className='bg-[#085f63] w-full min-h-screen p-10'>
            <h1 className='text-4xl font-bold text-center py-5'>Tìm đường đi trong mê cung bằng thuật toán DFS</h1>
            <form onSubmit={onSubmit} className='flex items-end gap-10 justify-center'>
                <label>
                    <p className='text-2xl mb-3 font-bold'>Nhập số dòng &lt;= 20: </p>
                    <input
                        type='text'
                        className='outline-none py-1 px-2 min-w-[300px] h-10'
                        onChange={(e) => setSoDong(e.target.value)}
                        value={soDong}
                    />
                </label>
                <label>
                    <p className='text-2xl mb-3 font-bold'>Nhập số cột &lt;= 20: </p>
                    <input
                        type='text'
                        className='outline-none py-1 px-2 min-w-[300px] h-10'
                        onChange={(e) => setSoCot(e.target.value)}
                        value={soCot}
                    />
                </label>
                <button
                    type='submit'
                    className='border border-solid max-h-10 p-2 bg-slate-200 hover:bg-slate-600 rounded-s-sm font-semibold'
                >
                    Tạo mảng
                </button>
                <button
                    className='border border-solid max-h-10 p-2 bg-slate-200 hover:bg-slate-600 rounded-s-sm font-semibold'
                    onClick={Reset}
                >
                    Reset
                </button>
                <button
                    className='border border-solid max-h-10 p-2 bg-slate-200 hover:bg-slate-600 rounded-s-sm font-semibold'
                    onClick={DFS}
                >
                    DFS
                </button>
            </form>
            <div className='flex items-center flex-wrap gap-5 justify-center'>
                {soCotMatrix !== 0 && soDongMatrix !== 0 && (
                    <Matrix
                        rows={soDongMatrix}
                        columns={soCotMatrix}
                        matrix={mangBanDau}
                        setMangBanDau={setMangBanDau}
                        title='Mảng ban đầu'
                    />
                )}
                {soCotMatrix !== 0 && soDongMatrix !== 0 && run && (
                    <Matrix
                        rows={soDongMatrix}
                        columns={soCotMatrix}
                        matrix={mangThucThi}
                        setMangBanDau={setMangDuongDaDi}
                        title='Mảng đường DFS đang di chuyển'
                    />
                )}
                {soCotMatrix !== 0 && soDongMatrix !== 0 && run && (
                    <Matrix
                        rows={soDongMatrix}
                        columns={soCotMatrix}
                        matrix={mangDuongDaDi}
                        setMangBanDau={setMangDuongDaDi}
                        title='Mảng đường DFS đã đi'
                    />
                )}
                {soCotMatrix !== 0 && soDongMatrix !== 0 && check && (
                    <Matrix
                        rows={soDongMatrix}
                        columns={soCotMatrix}
                        matrix={mangKetQua}
                        setMangBanDau={setMangKetQua}
                        title='Mảng kết quả'
                    />
                )}
            </div>
            <div className='max-w-xl mx-auto'>
                {check && (
                    <div className='grid grid-cols-4'>
                        Đường đi: <br />
                        {mangDuongDi.map((item, index) => (
                            <span key={index}>
                                Ô:({item.x + 1}, {item.y + 1}){index !== mangDuongDi.length - 1 && ' -> '}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
