/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-13 23:18:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-14 03:39:47
 * @Description : 棋盘 hook
 */
import { shallowRef, ref, readonly } from 'vue'

let initBoard = [
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
  let set = false
  function moveChessboard({ row, col }) {
    if (!set) {
      initBoard = curBoard.value
      set = true
    }
    console.log('moveChessboard')

    if (winner.value) {
      console.log('游戏结束')
      console.log(initBoard)
      return
    }
    // 如果当前位置已经有棋子，则不允许再次放置
    if (curBoard.value[row][col] !== '-') return
    curBoard.value[row][col] = curPlayer.value
    winner.value = playerMap[whoWin(curPlayer.value, row, col)]
    if (curPlayer.value === 'X') {
      curPlayer.value = 'O'
    } else {
      curPlayer.value = 'X'
    }
    console.log('curBoard.value')
    console.log(curBoard.value)
    console.log('initBoard')
    console.log(initBoard)
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
    // console.log('当前')
    // console.log({
    //   x: row,
    //   y: col
    // })
    // console.log('左上')
    for (let i = row - 1; i > -1; i--) {
      let j = i - row + col
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
    for (let i = row + 1; i < 8; i++) {
      let j = i - row + col
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
    for (let i = row + 1; i < 8; i++) {
      let j = row + col - i
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
    for (let i = row - 1; i > -1; i--) {
      let j = row + col - i
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
        // curBoard.value[i][j] = '-'
      }
    }
    winner.value = ''
    curPlayer.value = 'X'
    // NOTE 操作得快，会导致数据同步错乱, 无法重置
    // FIXME ref 和 reactive 都是对象，再使用另一个对象赋值时，修改响应式对象的值，会导致另一个对象的值也发生变化
    // 为了避免这种情况，1. 赋值是使用深度拷贝 2. 修改响应式对象（数组和对象）的值时，重新赋新的值
    // const arr = ref([1, 2])
    // const initArr = ['X', 'O']
    // setTimeout(() => {
    //   arr.value = initArr
    // }, 100)
    // setTimeout(() => {
    //   // NOTE 不要直接修改数组的元素，而是赋值新数组
    //   // arr.value[0] = 'hello' // ❌ initArr 被修改
    //   const [first, ...rest] = arr.value // 👌
    //   arr.value = ['hello', ...rest]
    //   // arr.value.push('A') // ❌ initArr 被修改
    //   arr.value = [...arr.value, 'A'] // 👌
    //   setTimeout(() => {
    //     console.log('arr', arr.value)
    //     console.log('initArr', initArr)
    //   }, 10)
    // }, 200)
    curBoard.value = initBoard
  }
}
