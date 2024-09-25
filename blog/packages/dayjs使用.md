# dayjs 使用

轻量的处理时间和日期的 JavaScript 库。
Dayjs 并没有改变或覆盖 Javascript 原生的 Date.prototype， 而是创造了一个全新的包含 Javascript Date 对象的 Dayjs 的对象。
Dayjs 对象是**不可变的**, 所有的 API 操作都将返回一个新的 Dayjs 对象。

[dayjs](https://day.js.org/zh-CN/) 是 Moment.js 的替代品，大部分 api 都兼容 Moment.js，体积小，性能好。

> Moment.js 不再维护，推荐使用 dayjs。

## 安装

```bash
npm i dayjs
```

## 常见 api

### 解析时间

> 当前时间

```js
const currentDay = dayjs()
console.log(currentDay) // Dayjs 对象
console.log(currentDay.$d) // Date 对象
```

> 时间戳

```js
// 13 位时间戳 毫秒
const ts1 = dayjs(1318781876406).format('YYYY-MM-DD HH:mm:ss')
console.log(ts1, 'zqj log')
// 10 位时间戳 秒
const ts2 = dayjs.unix(1318781876).format('YYYY-MM-DD HH:mm:ss')
console.log(ts2, 'zqj log')
```

> ISO 格式的字符串

```js
const t2 = dayjs('2020-12-18').format('YYYY-MM-DD HH:mm:ss')
const t3 = dayjs('2020-12').format('YYYY-MM-DD HH:mm:ss')
const t5 = dayjs('2020-12-18T08:24:35').format('YYYY-MM-DD HH:mm:ss')
const t4 = dayjs('2020-12-18 08:24:35').format('YYYY-MM-DD HH:mm:ss')
// 注意 ISO 要求 年份为 4 位，范围 0000 - 9999，月份和日期为 2 位，范围 01 - 12 和 01 - 31
// 时为 2 位，范围为 01 - 12   分秒为 2 位，范围 00 - 59
// 毫秒为 3 位，范围 000 - 999
// 但是 dayjs 并不严格要求，只要符合格式即可 比如 2020-1-9 8:4:5.123 也是合法的
const t5 = dayjs('2020-1-9 8:4:5.123').format('YYYY-MM-DD HH:mm:ss.SSS')
// 当年这些时间单位不在规定的范围内，会自动进位
const t6 = dayjs('2020-0-0 0:0:0.0').format('YYYY-MM-DD HH:mm:ss.SSS')
const t7 = dayjs('2020-13-32') // 没有 13 月 进位，年份加一年，2021 月份变成 1 月。 没有32号，月份进位，变2月，日期为1号
```

> string + format 格式，依赖 CustomParseFormat 插件，才能正常运行

```js
dayjs('1970-00-00', 'YYYY-MM-DD').isValid() // true
```

> 复制时间

```js
const d1 = dayjs()
const d2 = d1.clone()
```

> 验证

```js
dayjs().isValid() // 返回布尔值
```

### 取值和赋值

> 获取年月日时分秒，**年日**从 1 开始，月时分秒毫秒星期，从 0 开始。

> 析取值

```js
// dayjs().get('unit') 等同于 dayjs().unit()
const currentYear = dayjs().year() // 年份 2024
// 同 dayjs().get('year')
const currentMonth = dayjs().date() // 日份 1-31
// 同 dayjs().get('date')

const currentMonth = dayjs().month() // 月份 0-11
// 同 dayjs().get('month')
const currentDay = dayjs().day() // 星期 0-6
const currentHour = dayjs().hour() // 小时 0-23
const currentMinute = dayjs().minute() // 分钟 0-59
const currentSecond = dayjs().second() // 秒 0-59
const currentMillisecond = dayjs().millisecond() // 毫秒 0-999
```

> 时间开头和结束

```js
const day = dayjs('2020-12-18')
// 一天的开始 00:00
const start = day.startOf('day').format('YYYY-MM-DD HH:mm:ss')
// 一天的结束 23:59
const end = day.endOf('day').format('YYYY-MM-DD HH:mm:ss')
// 月初即月份的第一天
const startMonth = day.startOf('month').format('YYYY-MM-DD HH:mm:ss')
// 月底即月份的最后一天
const endMonth = day.endOf('month').format('YYYY-MM-DD HH:mm:ss')
```

> 设置值

```js
// 设置年月日时分秒，年从 1970 开始，年日从 1 开始，星期从 0 开始
// 设置时分秒毫秒，时分秒毫秒从 0 开始
// 2024-12-31 23:59:59.999
const newTime = dayjs().year(2024).month(11).date(31).hour(23).minute(59).second(59).millisecond(999).format('YYYY-MM-DD HH:mm:ss.SSS')
console.log(newTime, ' newTime zqj log')
// 超出范围的值会自动进位
const newTime2 = dayjs().year(2024).month(12).date(-1).hour(28).minute(61).second(59).millisecond(1099).format('YYYY-MM-DD HH:mm:ss.SSS')
console.log(newTime2, ' newTime2 zqj log')
```

### 时间计算

> 加减 `add(number, unit)`  `subtract(number, unit)`

```js
// 加减年月日时分秒毫秒
const newTime = dayjs().add(1, 'year').format('YYYY-MM-DD HH:mm:ss')
const newTime2 = dayjs().subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss')
```

> 常见单位

| 单位          | 缩写 | 详情                            |
| ------------- | ---- | ------------------------------- |
| `year` | `y` | 年                              |
| `quarter` | `Q` | 季度(依赖 `QuarterOfYear` 插件) |
| `month` | `M` | 月                              |
| `week` | `w` | 周                              |
| `day` | `d` | 天                              |
| `hour` | `h` | 小时                            |
| `minute` | `m` | 分钟                            |
| `second` | `s` | 秒                              |
| `millisecond` | `ms` | 毫秒                            |

> 时间间隔

```js
const day1 = dayjs('2020-12-18')
const day2 = dayjs('2020-12-20')
const diff = day2.diff(day1) // 毫秒
const diff1 = day2.diff(day1, 'y') // 年
const diff2 = day2.diff(day1, 'M') // 月
const diff3 = day2.diff(day1, 'd') // 天
const diff4 = day2.diff(day1, 'd'，
  true) // 天 小数
```

> 时间比较 -- `isBefore`  `isSame`  `isAfter` 默认按照毫秒比较

```js
const day1 = dayjs('2020-12-18')
const day2 = dayjs('2020-12-20')
const isBefore = day2.isBefore(day1) // false
const isAfter = day2.isAfter(day1, 'd') // true
const isSame = day2.isSame(day1, 'm') // true

const isSameOrBefore = day2.isSameOrBefore(day1, 'm') // true 依赖于 isSameOrBefore 插件
const isSameOrAfter = day2.isSameOrAfter(day1, 'm') // true 依赖于 isSameOrAfter 插件
const isBetween = day2.isBetween(day1, day2, 'd', '[)') // true 依赖于 isBetween 插件
```

### 格式化

常见的格式占位符

| 占位符 | 输出          | 详情                      |
| ------ | ------------- | ------------------------- |
| `YYYY` | 2013          | 四位年份                  |
| `MM` | 01            | 两位月份                  |
| `M` | 1             | 一位月份                  |
| `D` | 1             | 一位日期                  |
| `DD` | 01            | 两位月份                  |
| `HH` | 08            | 两位小时，24 小时制       |
| `H` | 8             | 一位小时，24 小时制       |
| `hh` | 08            | 两位小时，12 小时制       |
| `h` | 8             | 一位小时，12 小时制       |
| `mm` | 08            | 两位分                    |
| `m` | 8             | 两位分钟                  |
| `ss` | 08            | 两位秒                    |
| `s` | 8             | 一位秒                    |
| `SSS` | 008           | 三位毫秒                  |
| `X` | 1234554321    | Unix 时间戳, 十位, 秒     |
| `x` | 1234554321000 | Unix 时间戳, 十三位, 毫秒 |

> `X` 和 `x` 依赖于 `advancedFormat` 插件, 时间戳的其他获取方式：

`dayjs().valueOf()`  `+dayjs()` -- 毫秒 `dayjs().unix()` -- 秒。

> 常见的时间格式

```js
const YYYYMMDD = dayjs().format('YYYY-MM-DD')
const YYYYMMDDHHmmss = dayjs().format('YYYY-MM-DD HH:mm:ss')
const YYYYMMDDHHmmssSSS = dayjs().format('YYYY-MM-DD HH:mm')
```

### 插件使用

```js
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import isToday from 'dayjs/plugin/isToday'
import minMax from 'dayjs/plugin/minMax'

dayjs.extend(advancedFormat)
dayjs.extend(isToday).extend(minMax) // 支持链式调用

const unix_s = dayjs().format('X')
const unix_ms = dayjs().format('x')
const minDay = dayjs.min(dayjs('2020-12-18'), dayjs('2020-12-20'))
```

## dayjs 设计原理解读

### 待补充

## 总结

1. dayjs 是一个轻量的处理时间和日期的 JavaScript 库。
2. Dayjs 对象是**不可变的**, 所有的 API 操作都将返回一个新的 Dayjs 对象。
3. 常见的时间格式就几个，但是够用，通过`valueOf`和`unix`可以获取时间戳。
4. dayjs 有很多插件，可以根据需求引入。
