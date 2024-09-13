<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-13 23:34:04
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-14 01:38:26
 * @Description : 棋盘组件
-->
<script setup>
import { computed, ref } from 'vue'
import { useChessboard } from './useChessboard'
const { curBoard, winner, moveChessboard } = useChessboard()
</script>

<template>
  <div class="Chessboard">
    <!-- <div class="player-panel">
      <label for="red" class="player">
        <span class="red"> 红方 </span>
        <input type="radio" value="red" v-model="player" name="player" id="red" />
      </label>
      <label for="blue" class="player">
        <span class="blue"> 蓝方 </span>
        <input type="radio" value="blue" v-model="player" name="player" id="blue" />
      </label>
    </div> -->
    <p>
      获胜方：
      <span
        :class="{
          red: winner === '红方',
          blue: winner === '蓝方'
        }"
      >
        {{ winner }}
      </span>
    </p>
    <table>
      <tr v-for="(row, index) in curBoard" :key="index">
        <td v-for="(cell, i) in row" :key="i" @click="moveChessboard({ row: index, col: i })">
          <span :class="['cell', cell]">{{ cell }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss">
.Chessboard {
  .player-panel {
    text-align: center;
    margin-bottom: 10px;
    .player {
      display: inline-block;
      margin-right: 10px;
      .red {
        color: #f00;
      }
      .blue {
        color: #00f;
      }
    }
  }
  p {
    text-align: center;
    margin-bottom: 10px;
    span {
      font-weight: bold;
    }
    .red {
      color: #f00;
    }
    .blue {
      color: #00f;
    }
  }
  table {
    border-collapse: collapse;
    margin: 0 auto;
  }
  td {
    width: 50px;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #2c3d49;
    color: #aaa;
    cursor: pointer;
    .cell {
      display: inline-block;
      border-radius: 50%;
      width: 30px;
      height: 30px;
    }
    .X {
      color: #f00;
      background-color: #f00;
    }
    .O {
      color: #00f;
      background-color: #00f;
    }
  }
}
</style>
