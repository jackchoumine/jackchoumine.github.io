function say(greeting = 'Hello', name = 'World!') {
  //   console.log(`${greeting}, ${name}!`)
  return `${greeting}, ${name}!`
}

function sum(a: number, b: number) {
  return a + b
}

export { say, sum }
// import {sum} from './mockExportObj'
// sum()

export default { say }
// import exportObj from './mockExportObj'
// exportObj.say()
