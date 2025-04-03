import { useEffect, useMemo, useState } from 'react'

export default function AsyncUpdate() {
  const [todo, setTodo] = useState('nothing')
  const loading = useMemo(() => {
    return todo === 'nothing'
  }, [todo])

  useEffect(() => {
    setTimeout(() => {
      setTodo('code')
    }, 200)
  }, [])

  return (
    <div>
      <span>{todo}</span>
      {loading && <span>loading</span>}
    </div>
  )
}
