/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-13 17:35:38
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-25 01:29:28
 * @Description :
 */
import React, { useEffect, useState } from 'react'
import './HelloJest.scss'
// src/https/index.ts
import { getProfile } from '../https'

function HelloJest({ name = 'Hello Jest' }: { name?: string } = {}) {
  const [profile, setProfile] = useState()
  useEffect(() => {
    getProfile().then(res => {
      setProfile(res)
    })
  }, [])
  return <div className='hello-jest'>{name}!</div>
}

export { HelloJest }
