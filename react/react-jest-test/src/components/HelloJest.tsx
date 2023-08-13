/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-13 17:35:38
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-13 17:57:05
 * @Description :
 */
import React from 'react'
import './HelloJest.scss'

function HelloJest({ name = 'Hello Jest' }: { name?: string } = {}) {
  return <div className='hello-jest'>{name}!</div>
}

export { HelloJest }
