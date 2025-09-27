const key = Symbol('unique')
const key2 = Symbol('unique')
console.log(typeof key) // symbol
console.log(key == key2) // false
console.log(key === key2) // false
console.log(key.description) // unique
console.log(key2.toString() === key.toString()) // true

const id = Symbol.for('id')
console.log(id)

const age = Symbol('age')
const obj = {
  name: 'jack',
  [age]: 30,
}
console.log({ ...obj })
console.log(obj.age)
console.log(obj[age])

for (const property in obj) {
  console.log(`${property}: ${obj[property]}`)
}

const bigInt = 1234567890123456789012345678901234567890n
console.log(typeof bigInt)
console.log(typeof (9007199254740991 + 1)) // 9007199254740992
console.log(9007199254740991 + 2) // 9007199254740992

function type(value) {
  console.log(arguments.length)
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

console.log(type(undefined, 1))
console.log('--', type.length)
console.log('name', type.name)
console.log(type(Object.prototype))
console.log(type({}))
console.log(type(''))
console.log(type(1))
console.log(type([]))
console.log(type(() => {}))
console.log(type(Symbol()))
console.log(type(new Date()))
console.log(type(/\w/))
console.log(type(new Error('error')))
console.log(type(Object.create(null)))
