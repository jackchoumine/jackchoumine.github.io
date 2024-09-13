/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-13 23:18:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-14 02:54:33
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
    if (winner.value) return
    // 如果当前位置已经有棋子，则不允许再次放置
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
    // 横向 row 不变 col 变化
    let count = 0
    for (let i = 0; i < 8; i++) {
      if (curBoard.value[row][i] === player) {
        count++
        if (count === 5) return player
      } else {
        count = 0
      }
    }
    // 纵向 col 不变 row 变化
    count = 0
    for (let i = 0; i < 8; i++) {
      if (curBoard.value[i][col] === player) {
        count++
        if (count === 5) return player
      } else {
        count = 0
      }
    }
    // 左上到右下 差固定  i + j = row + col => j = row + col - i
    // [0][0] [1][1] 【[2][2]】 [3][3] [4][4] [5][5] [6][6] [7][7]
    // [0][3] [1][4] 【[2][5]】 [3][6] [4][7]
    // 左上
    count = 0
    console.log('当前')
    console.log({
      x: row,
      y: col
    })
    console.log('左上')
    for (let i = row - 1; i > -1; i--) {
      let j = i - row + col
      console.log({
        i,
        j
      })
      if (j < 0 || j > 7) break
      if (curBoard.value[i][j] === player) {
        count++
        if (count === 4) return player
      } else {
        count = 0
      }
    }
    // 右下
    count = 0
    console.log('右下')
    for (let i = row + 1; i < 8; i++) {
      let j = i - row + col
      console.log({
        i,
        j
      })
      if (j < 0 || j > 7) break
      if (curBoard.value[i][j] === player) {
        count++
        if (count === 4) return player
      } else {
        count = 0
      }
    }
    // 左下到右上 和固定 row + col = i + j => j = row + col - i
    // [0][7] [1][6] 【[2][5]】 [3][4] [4][3] [5][2] [6][1] [7][0]
    // 左下
    count = 0
    console.log('左下')
    for (let i = row + 1; i < 8; i++) {
      let j = row + col - i
      console.log({
        i,
        j
      })
      if (j < 0 || j > 7) continue
      if (curBoard.value[i][j] === player) {
        count++
        if (count === 4) return player
      } else {
        count = 0
      }
    }
    // 右上
    count = 0
    console.log('右上')
    for (let i = row - 1; i > -1; i--) {
      let j = row + col - i
      console.log({
        i,
        j
      })
      if (j < 0 || j > 7) continue
      if (curBoard.value[i][j] === player) {
        count++
        if (count === 4) return player
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
    moveChessboard,
    nextRound
  }
  function nextRound() {
    console.log('nextRound')
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // console.log(initBoard[i][j])
        curBoard.value[i][j] = '-'
      }
    }
    curPlayer.value = 'X'
    // NOTE 操作得快，会导致数据同步错乱, 无法重置
    // curBoard.value = initBoard
    winner.value = ''
  }
}
