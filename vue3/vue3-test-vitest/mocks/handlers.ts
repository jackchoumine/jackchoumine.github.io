/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-03-24 15:19:29
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-24 18:30:03
 * @Description : mock api
 */
import { http, HttpResponse } from 'msw'
import { json } from 'stream/consumers'

const joke = 'this is a joke'

export const handlers = [
  http.get('https://icanhazdadjoke.com', () => {
    return HttpResponse.json(() => {
      json: () => ({ joke })
    })
  }),
  http.get('/api/users', () => {
    return HttpResponse.json([{ name: 'test', id: 1 }])
  })
]
