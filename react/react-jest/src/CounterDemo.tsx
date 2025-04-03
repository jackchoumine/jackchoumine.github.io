import { useState } from 'react'

export function useCounter(init = 0) {
  const [count, setCount] = useState(init)

  function plus(step: number) {
    setCount(count + step)
  }

  return [count, plus]
}

export default function CounterDemo() {
  const [count, plus] = useCounter()
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => plus(10)}>plus</button>
    </div>
  )
}
