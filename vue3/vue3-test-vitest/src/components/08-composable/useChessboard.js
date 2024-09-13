/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-13 23:18:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-14 01:35:52
 * @Description : 棋盘 hook
 */
import { shallowRef, ref, readonly } from 'vue'

const initBoard = [
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-']
]
export function useChessboard() {
  const curBoard = ref([
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-']
  ])
  const isEnd = ref(false)
  const winner = ref('')
  // const boards = shallowRef([initBoard])
  //  X - 红方 O - 蓝方
  const playerMap = {
    X: '红方',
    O: '蓝方'
  }
  const curPlayer = ref('X')
  function moveChessboard({ row, col }) {
    // 如果当前位置已经有棋子，则不允许再次放置
    if (winner.value) return
    if (curBoard.value[row][col] !== '-') return
    curBoard.value[row][col] = curPlayer.value
    winner.value = playerMap[whoWin(curPlayer.value, row, col)]
    if (curPlayer.value === 'X') {
      curPlayer.value = 'O'
    } else {
      curPlayer.value = 'X'
    }
  }
  function whoWin(player, row, col) {
    // 横向
    let count = 0
    for (let i = 0; i < 8; i++) {
      if (curBoard.value[row][i] === player) {
        count++
        if (count === 5) return player
      } else {
        count = 0
      }
    }
    // 纵向
    count = 0
    for (let i = 0; i < 8; i++) {
      if (curBoard.value[i][col] === player) {
        count++
        if (count === 5) return player
      } else {
        count = 0
      }
    }
    // 左上到右下
    count = 0
    for (let i = 0; i < 8; i++) {
      if (curBoard.value[i][i] === player) {
        count++
        if (count === 5) return player
      } else {
        count = 0
      }
    }
    // 右上到左下
    count = 0
    for (let i = 0; i < 8; i++) {
      if (curBoard.value[i][7 - i] === player) {
        count++
        if (count === 5) return player
      } else {
        count = 0
      }
    }
    return ''
  }
  return {
    // isEnd: readonly(isEnd),
    winner: readonly(winner),
    curBoard: readonly(curBoard),
    curPlayer: readonly(curPlayer),
    moveChessboard
  }
}
