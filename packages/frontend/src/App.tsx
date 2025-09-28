import { Virtuoso } from 'react-virtuoso'
import { useState, useEffect, useRef } from 'react'
// import { cn } from 'tailwind-variants'
import Map from './Map'
import './index.css'

export function App() {
    const [count, setCount] = useState(0)
    const [height, setHeight] = useState<number | null>(null)
    const [unitHeight, setUnitHeight] = useState<number | null>(null)
    const probeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = probeRef.current
        if (el) {
            const h = el.getBoundingClientRect().height
            setHeight(h)
            setUnitHeight(h)
        }
        window.addEventListener('resize', () => setHeight(window.innerHeight))
    }, [])

    return (<div>
        <aside>
            <Virtuoso
                style={{ height: '100vh', border: '1px solid red ', borderWidth: 'thick', backgroundColor: 'green' }}
                totalCount={count}
                itemContent={(index) => <div> Item {index} </div>}
            />
            <button onClick={() => setCount(count + 1)} className="bg-blue-500 on-hover:bg-blue-600 text-white p-2 rounded-md"> Increment Count </button>
            <Map />
        </aside>

    </div>)
}