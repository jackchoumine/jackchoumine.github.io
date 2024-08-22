import { useEffect, useState } from 'react'

export default function ContainerParent() {
  const { joke, loading, updateJoke } = useJoke()
  return (
    <>
      <h3>容器组件</h3>
      <button onClick={() => updateJoke()}>Update Joke</button>
      <DisplayData joke={joke} loading={loading} />
      <hr />
    </>
  )
}

function DisplayData(props) {
  const { loading, joke } = props
  return (
    <div>
      <h3>展示组件</h3>
      <p>{loading ? 'Loading...' : joke}</p>
    </div>
  )
}

function useJoke() {
  const [update, setUpdate] = useState(false)
  const [joke, setJoke] = useState()
  const [loading, setLoading] = useState()
  useEffect(() => {
    setLoading(true)
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setJoke(data.joke))
      .finally(() => setLoading(false))
  }, [update])

  function updateJoke() {
    setUpdate(isUpdate => !isUpdate)
  }
  return { joke, loading, updateJoke }
}
