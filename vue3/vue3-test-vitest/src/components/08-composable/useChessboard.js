/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-13 23:18:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-14 00:49:29
 * @Description : 棋盘 hook
 */
import { shallowRef, ref, readonly } from 'vue'

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
  //  X - 红方 O - 蓝方
  const curPlayer = ref('X')
  function moveChessboard({ row, col }) {
    // 如果当前位置已经有棋子，则不允许再次放置
    if (curBoard.value[row][col] !== '-') return
    curBoard.value[row][col] = curPlayer.value
    if (curPlayer.value === 'X') {
      curPlayer.value = 'O'
    } else {
      curPlayer.value = 'X'
    }
  }
  return {
    curBoard: readonly(curBoard),
    curPlayer: readonly(curPlayer),
    moveChessboard
  }
}
