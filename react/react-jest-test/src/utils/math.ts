/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-28 10:35:23
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-18 04:04:24
 * @Description :
 */
function sum(firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber
}

function subtract(firstNumber: number, secondNumber: number) {
  return firstNumber - secondNumber
}

function modulo(m: number, n: number) {
  return ((m % n) + n) % n
}

export { sum, subtract, modulo }
