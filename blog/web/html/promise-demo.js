function promise1(p) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(p)
    }, 1000)
  })
}

function promise2(o) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(o)
    }, 2000)
  })
}

// 1 1 2
const promiseArr = [p => promise1(p), p => promise2(p)]
const sumPromise = promiseArr.reduce((curr, next) => {
  return curr.then(res => {
    console.log(res, 'zqj log')
    return next(res).then(res2 => res + res2)
  })
}, Promise.resolve(1))

console.log(
  sumPromise.then(res => {
    console.log(res, 'zqj log ---1')
  }),
  'zqj log'
)
