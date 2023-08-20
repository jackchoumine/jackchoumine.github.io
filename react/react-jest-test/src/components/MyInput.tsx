import React, { useState } from 'react'

function MyInput() {
  const [name, setName] = useState('')
  return (
    <div>
      <input
        value={name}
        placeholder='请输入名字'
        onChange={e => setName(e.target.value)}
      />
      <p>
        this is my name: <span>{name}</span>
      </p>
    </div>
  )
}

export { MyInput }
