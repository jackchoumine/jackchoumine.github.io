/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-18 17:40:08
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-18 19:46:33
 * @Description :
 */
import childProcess from 'child_process'
import { readFile, writeFile } from 'fs'
import path from 'path'

export function genVersionInfo(pkg) {
  const commitHash = childProcess.execSync('git rev-parse HEAD').toString()

  const buildTime = new Date() // .toLocaleString()
  const year = buildTime.getFullYear()
  const month = buildTime.getMonth() + 1
  const date = buildTime.getDate()
  const hours = buildTime.getHours()
  const minutes = buildTime.getMinutes()
  const seconds = buildTime.getSeconds()

  const _date = `${year}-${month}-${date}`
  const time = `${hours}:${minutes}:${seconds}`
  const _buildTime = `${_date} ${time}`
  const shortTime = `${month}月${date}日 ${hours}:${minutes}`

  const filePath = path.resolve('./public/manifest.json')
  // 读取文件内容
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('读取文件时出错:', err)
      return
    }
    // 将文件内容转换JSON
    const dataObj = JSON.parse(data)
    dataObj.updateTime = _buildTime
    dataObj.shortTime = shortTime
    dataObj.commitHash = commitHash.replace('\n', '')
    dataObj.shortHash = commitHash.slice(0, 7)
    dataObj.version = pkg.version
    // 将修改后的内容写回文件
    writeFile(filePath, JSON.stringify(dataObj), 'utf8', err => {
      if (err) {
        console.error('写入文件时出错:', err)
      }
    })
  })
  return { commitHash, buildTime }
}
