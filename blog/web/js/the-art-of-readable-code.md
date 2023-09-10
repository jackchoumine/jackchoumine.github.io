# 编写可读性代码的艺术

最近阅读了《编写可读代码的艺术》一书，感觉很有收获，现在结合自己的理解再来总结编写可读性代码的技巧，会举很多例子，并且针对日常开发中常见的**代码异味**给出改我的进建议。

学会该书的大部分技巧并付诸实践，不能保证保证你写出完美的代码，但是能保证你写出能读的代码，保证你的**码德**下限。

可读性 = 可测试性 = 设计良好 = 可维护 = 代码质量 = ...，衡量代码的各种指标，都是正相关的，开发程序的大部分时间是在阅读代码（自己的和他人的），所以保证了可读性，其他指标也不会差。

[[TOC]]

## 衡量代码的可读性

大部分程序员，全靠自觉、灵感和经验编写代码，往往很难一步到位写出可读性高的代码。

我看过一些前端组长(猪长)、前端架构师(加狗屎)写的代码，简直惨不忍睹，让人有骂娘的冲动。

比如这种：

![](https://cdn.jsdelivr.net/gh/jackchoumine/jack-picture@master/bad-render-chart.png)

除了手写 render 函数，毫无可读性之外，行宽过大，编辑器都出现滚动条了，也会让人不想读。

不可读的代码往往都会有这样或那样的问题。

> 软件的成本由开发成本和维护成本组成，而往往维护成本要远高于开发成本，维护成本主要花在理解代码和修改代码上，可读性高、设计良好的代码可大大降理解和修改代码的成本。

可见代码的可读性至关重要。

### 如何衡量代码的可读性呢？

> 代码可读性和代码被他人理解的时间成正比，即他人**理解**代码的时间越少，可读性越高。

如何定义他人？根据我的经验，高年级本科生或者研究生或者工作 2 年内的程序员，又或者，你的一个普通同事。

> 同事是和你协作的人，让和你协作的人能快速地理解你的代码，至关重要。

如何定义理解？
理解是一个非常高的标准。真正理解了，就应该能**改动**它、**找出缺陷**且明白它**与外部代码交互的规则**。

### 可读性的标准可以降低吗？

当可读性和其他约束条件冲突时，比如性能、代码行数，如何取舍？

> 大部分情况，**可读性优先**，那些可能会经常被他人阅读、改动的代码，可读性再怎么强调都不为过。

### 编写可读性的代码很难吗？

编写可读性高的代码很难。如果一个程序员放弃了可读性这一目标，那么他一定不会成为更好的程序员。

编写可读性高的代码，前人已经总结了诸多技巧和经验，学习并实践这些经验，可以让代码的可读性不至于很糟糕。

## 命名的技巧

好的代码，从好的命名开始。

### 把信息放在名字里

#### 选择专业的词汇，使得意思更加清晰和精确。

比如 `fetchData` 比 `getData` 好；

| 单词  | 更多的选择                                                                               |
| ----- | ---------------------------------------------------------------------------------------- |
| send  | deliver、dispatch(派发)、announce(声明)、distribute(分配、广播)、route(按照指定路径投送) |
| find  | search、extract(提取)、locate(定位)、recover(还原)                                       |
| start | launch、create(创建)、begin、open                                                        |
| make  | create、setup(就绪)、build、generate(生成)、compose、add、new                            |

> 技巧：如果存在两个相对或者相反的操作，取名使最好能让他人知道一个，便能直接的猜到有一个操作。

`start` 和 `stop` 相对， `pause` 和 `resume` 相对。

> 技巧：取名符合生活或者数学的习惯。比如 `count` 一般为正数, `num` 使可正可负， `complexNumber` 复数。

#### 避免宽泛的名字，除非有特别的理由

避免使用 `tmp` 、 `retval` 这类宽泛的名字。**好的名字应该描述变量的目的或者它承载的值**， `tmp_file` 比如 `tmp` 好。

```js
const euclidean_norm = arr => {
  let retval = 0
  for (let i = 0 i < arr.length; i++) {
    retval += arr[i] * arr[i]
  }
  return Math.sqrt(retval)
}
```

> 这函数在累加数组中元素的平法，把 `retval` 改成 `sum_squares` 更好。

> sum_squares 包含它的目的，如果累加代码不小心写成 `retval += arr[i]` ，就非常容易发现缺陷。

> 使用 tmp、it 和 retval 等这些空范的名字时，你需要有足够好的理由。

#### 使用具体的名字，避免抽象的名字

力求把实体描述得更具体，而非抽象，越具体，会越明确。
`serverCanStart()` 没有 `canListenOnPort` 具体。

> 技巧：名字里名字和形容词时，会比较具体。感觉不够具体时，不妨加入名字和形容词。

#### 使用前缀或者后缀把重要的信息附加到名字上

常见的可以附加的信息：

① 单位
| 函数参数 | 参数带单位 |
| ----------------------- | ------------------- |
| start(delay) | delay -> delay_secs |
| createCache(size) | size -> size_mb |
| throttleDownload(limit) | limit -> max_kbps |
| rotate(angle) | angle -> degrees_cw |

> angle 角度，单位度。cw(circular_measure)，弧度。

在一个项目遇到一个函数的参数对象属性为 `rotate` :

```js
someFunction({
  rotate: rotate_value
})
```

它接收一个从后台接口返回的值，采用的单位是度，产品经理一直说不对，但是我们也找不到问题，就把这个问题放了很久。产品经理有一天又去找人确认是否正确，给的答复没问题。

产品又来找我，说那边反馈数据对的。我才猛然想到采用的单位是不是弧度，于是我把角度转成了弧度，产品就说对了。如果给属性加上单位，那么就一眼看出来了。

> 我们这个项目还涉及角度的方向，最后几经测试，需要做两件事情：角度转为弧度；三维地图下，旋转方向为逆时针。

> 把单位加入参数。

```js
someFunction({
  route_cw: cw_value // 顺时针的弧度 anticlockwise/counterclockwise 逆时针
})
```

> 如果把三维地图下逆时针也加入，参数就长了，选择不加，可通过函数注释的方式告知使用者。

② 变量存在危险或者意外
| 情形 | 变量 | 更好的选择 |
| ---------------------------------- | -------- | ------------------------ |
| 纯文本的密码 | password | plaintext_password |
| 用户提供的注释，需要转义后才能显示 | comment | unescaped_comment |
| 安全的 html 代码 | html | html_safe\\ html_escaped |

#### 变量作用域大小决定名字长短

> 小作用域，使用段名字，大作用域，使用长名字。

```js
const numList = [1, 2, 3]
let sum = 0
for (let i = 0; i < array.length; i++) {
  sum += array[i];
}
```

> i 的作用域很小，即使取名很短，也一眼能看出它的目的。

再看一例：

```js
for (i = 0; i < clubs.size(); i++) {
  for (j = 0; j < clubs[i].members.size(); j++) {
    for (k = 0; k < users.size(); k++) {
      // do something
    }
  }
}
```

> i j k 的作用域也很小，但是这里涉及到多层嵌套，当嵌套里操作复杂时，就很容易混淆它们，此时可以适当让各自的下标变长，以做区分。

```js
for (club_i = 0; club_i < clubs.size(); club_i++) {
  for (member_i = 0; member_i < clubs[club_i].members.size(); member_i++) {
    for (user_i = 0; user_i < users.size(); user_i++) {
      // do something
    }
  }
}
```

> 长名字不好打，而不使用？

有人会因为长名字需要输入更多字符而不想使用，现在而 IDE、AI 编程助手已经能自动补全了，不存在这个问题。

> 避免随意缩写，造单词。

随意缩写很让人费解。

> 技巧：开启编辑器拼写检查，可防止写错单词。

众所周知的缩写是可以使用的，比如

```BASH
button -> btn
background -> bg
backgroundColor -> bgColor
document -> doc
string -> str
number -> num
evaluation -> eval
index -> i
column -> col
hexadecimal -> hex
binary -> bin
octal -> oct # 八进制
decimal -> dec # 十进制
to -> 2 # to 在中间可，可缩写为 2, 比如 bin2dec 二进制转为十进制
address -> addr
application -> app
average -> avg # 平均数
command -> cmd
delete -> del
organization -> org # 组织
original -> orig
destination -> dest/des
source -> src # 源数据
resource -> res # 资源
decrease -> desc # 减少
increase -> inc # 增加
increment -> inc # 增加
Ascending -> asc # 升序
descending -> desc # 降序
device -> dev # 设备
different -> diff # 区别
directory -> dir # 目录
environment -> env # 环境
error -> err
execute -> exec # 执行
image -> img
information -> info # 信息
initialize -> init # 初始化
library -> lib # 库
maximum -> max # 最大
minimum -> min # 最小
message -> msg
number -> num
object -> obj
parameter -> param
parameters -> params # 实参 参数
arguments -> args # 实参 参数
argument -> arg # 形参 参数
package -> pkg # 包 n 打包 v
position -> pos # 位置
configuration -> config # 配置
calculate -> calc
array -> arr
previous -> pre
next -> next
middle -> mid # 中间
current -> cur # 当前的
password -> pwd
public -> pub
reference -> ref
summation -> sum
synchronization -> sync
asynchronization -> async
system -> sys # 系统
temporary -> tmp # 临时
text -> txt # 纯文本
variable -> var
control -> ctr # 控制
character -> char
status -> stat # 状态
standard -> std # 标准
trigger -> trig
escape -> esc # 退出
user -> usr # 用户
insert -> ins # 插入
length -> len # 长度
administrator -> adm # 管理员
database -> db # 数据库
coordinates -> coord # 坐标
# 经度维度
dictionary -> dic # 字典
extend -> ex/ext # 扩展
horizontal -> horz # 水平
vertical -> vert # 垂直
instance -> ins # 实例
link -> lnk # 链接
multiply -> mul # 乘
window -> win/wnd # 窗口
```

> 禁止拼音缩写

拼写的缩写意思很多。

```bash
# 书本
shuBen -> sb
# 想表示 book，却变成傻逼
# 价格
jiaGe -> jg
# 想表示 price，却变成鸡哥
```

> 使用缩写的经验法则：当新成员能理解这个缩写时，即可使用。

> 删除没有的词

拿掉某个词，不会损失信息，就删除它。
比如

```bash
convertToStr -> toStr # 意思一样
doStop -> stop #
```

有多个意思一样的动词，往往只需保留一个。

#### 使用格式表示含义

把特定的格式放在变量里，使得一眼能看出不同变量的区别。
常用的格式有： `_` 、 `-` 、 `#` 、 `$` 和 `大小写` 等。

```js
const YYYYMMDD = '2023-03-23' // 这个变量，就能一眼看出表示一个时间，在结合上下文，就能轻易知道的表示的时间
```

遵循编程语言或者团队的约定，且保持一致。

对前端来说，构造函数使用**大坨峰**(PascalCase/UpperCamelCase)，普通函数使用**小驼峰**(lowerCamelCase)。

```js
const person = new Person()
const age = getAge()
```

jquery 对象使用 `$` 开头，事件处理器使用 `onXxx` 或者 `handleXxx`

> 技巧： `onXxx` 作为属性或者参数，而 `handleXxx` 作为函数，会更好。

```js
const $allImges = $('img')
```

DOM 的 ID 属性值使用 `_` 连接，类名使用 `-` 或者 `--` 。

```html
<span class="icon-container" id="icon_edit"></span>
```

vue 和 react 组件中： `_ref` 表示模板引用：

```js
const div_ref = ref() // 表示引用一个 div
const com_ref = ref() // 表示引用一个 组件
```

### 不要使用有歧义的名字

名字容易歧义吗？当命名时，多问问自己，主动找到可能歧义的词语。

`filter` 就是一样容易有歧义的词语，可以是*挑出*一些，也可以是*删除*一些，剩下一些。

#### 用 `min` 和 `max` 表示极限

```js
const CART_TOO_BIG_LIMIT = 10 // 购物车最多10个物品
const MAX_ITEMS_IN_CART = 10 //  ✅  better
```

#### 用 `first` 和 `last` 表示包含末尾

```js
const str = 'abcd' // first = 0  last = 3 包含 d
```

#### 用 `start/begin` 和 `end` 表示不包含末尾

```js
const str = 'abcd' // start = 0  end = 3 不包含 d
```

#### 给布尔值命名

当命名布尔变量或者返回布尔值的函数命名时，要确保明确的返回 `true` 或者 `false` 。

```JS
const read_password = true // bad ❌ 两种理解：1. 读取密码，动作 2. 已经读取了密码
const need_password = true // ok 👌
const has_password = true // best  ✅
const edit = true // bad ❌
const shouldEdit = true // ok 👌
const enableEdit = true // better 😄
const canEdit = true // best  ✅
```

> 通过使用 `is` 、 `can` 、 `should` 、 `enable` 和 `has` 前缀或包含表示布尔变量。

```js
// `is` + 形容词 或者直接形容词，具有某写属性
const isGood = true //
const good = true // ok 👌 但是不够明确
const isFinished = true
const sortable = false // ok
const isSorted = true // ok
const hidden = true // ok
// `is` + 名字 表示是不是某个东西
const isSon = true
const isRiver = true
// 名词 + `is` + 形容词
const orders_is_closed = true
// 也可以 `is` + 名词 + 形容词
const isOrdersClosed = true
// `should` + 动词过去式 是否需要做某个动作
const shouldCloseDB = true
// `can` + 动词 具备某种能力
const canEdit = true // 有编辑权限
// `enable` + 动词， 表示是否开启某种能力
const enableEdit = true
const enableRemove = true
// `has` + 名词 存在某些东西
const hasKey = true // 存在 key
const hasValue = true // 有值
```

因为这些词在英语中常常使用来引导疑问句，而疑问句的回答一般是 `yes` 或者 `no` ，对应 `true` 或者 `false` 。

> 应该关注人称、单复数和时态的变化吗？

只需要关注动词时态，动词和 `has` 、 `is` 搭配，使用过去式就行，和 `should` 、 `can` 和 `enable` 搭配，使用原型。

> 技巧：should 往往用来命名返回布尔值的函数。

```js
function shouldRemoveBlank(remove) {
  //
}
```

> 避免使用反义

不使用反义的词，比如 `no` 、 `not` 、 `never` 、 `won't` 和 `dont` ，因为含有反义，容易有双重否定，认知负担大。

```js
const hasNoValue = arr.length === 0
// bad ❌
if (hasNoValue) {
  // do something
}
if (!hasNoValue) {
  // 不是没有值，产生双重否定
  // do something
}
```

理解这段代码思考两次，双重否定。

```JS
// ok 👌
const isEmpty = arr.length === 0
if (isEmpty) {
  // do something
}
```

数组为空，执行条件，也符合直觉

```JS
// best ✅
const hasValue = arr.length > 0
if (!hasValue) {
  // do something
}
```

没有值时，执行条件，非常自然。

> 如果可能，布尔变量的默认值为 `false` ，尤其是在函数参数中。

很多 html 的属性就是这样的。

```bash
autofocus
checked
disabled
formnovalidate
nowrap
readonly
required
selected
```

##### 参考

[Naming guidelines for boolean variables](https://www.serendipidata.com/posts/naming-guidelines-for-boolean-variables)
[why-am-i-seeing-more-boolean-naming-conventions-where-is-is-used-as-the-first](https://softwareengineering.stackexchange.com/questions/102736/why-am-i-seeing-more-boolean-naming-conventions-where-is-is-used-as-the-first)

#### 采用使用者的期望的名字

有些名字之所以会让人误解，是因为人们对它们的含义有先入为主的印象，就算你的本意并非如此。此时，你最好放弃这个名字，而采用一个不会被误解的名字。

很多程序员都习惯了使用 `get*` 作为**轻量访问器**的用法，它只是简单的返回一个内部成员变量，如果违背了这个习惯，就会误导使用者。

```js
class StatisticCollector {
  addSample(x) {
    //
  }
  getMean() {
    // 遍历所有的 samples 返回平均数
  }
}
```

上述例子中， `getMean` 的实现是遍历所有数据，然后求和，就个数，再求平均。如果有大量数据，就有很大的代价。但是使用者会以为没有什么代价，就随意调用。 `computeMean` 或者 `calcMean` 就个更加好，它更想有代价的操作。

然而，很多英语单词是多义的，要做到不让人误解或者误用，很难，很多程序员不是英语母语者，更加难了。好在我有一个做法，可以缓解它：

> 经验做法：不希望被频繁使用的变量，采用长一点的名字，难书写的名字，可以降低这个变量的使用频率。

比如 vue3 的 `getInstance` ，就是一个不那么常见的名字，vue3 的开发者们不希望使用者频繁使用它。

## 美观的格式

好的代码在格式上应该具备**美观的排版**、**合理的留白**和**符合认知的顺序**。这一节探讨如何使用留白、对齐和顺序，让代码更加易读。
排版的三原则：

01. 使用一致的布局，让读者快速习惯这种风格；
02. 让功能相似的代码排版相似；
03. 代码按照一定的逻辑分组，形成代码块。

### 为什么美观非常重要？

有一个类：

```js
class StackKeeper {
  // A class for keeping track of a series of doubles
  add(d) {
    /*
        and methods for quick statistics about them.
       */
  }
  _minimum = 10
  /* how many so
     for
     */
  average() {}
}
```

相比一个整洁的版本：

```js
// A class for keeping track of a series of doubles
// and methods for quick statistics about them.
class StackKeeper {
  add(d) {}
  _minimum = 10 // how many so for
  average() {}
}
```

你需要更多的时间去理解排版混乱的版本。

> 编程的大部分时间花在阅读代码上，阅读得越快，理解越快，代码越容易使用。

> 让代码变得难以阅读的手段之一：加入无关的混乱的注释，让代码排版混乱是常用的手段，希望你不要采用。

### 让换行保持一致和紧凑

有一个类 `TCPConnectionSimulator` ，评估程序在不同网络速度下的行为，构造函数有 4 个参数：

```bash
网速 -- kbps
平均时延 -- ms
时延抖动 -- ms
丢包率 -- %

```

调用三个不同的实例：

```js
class PerformanceTester {
  wifi = new TCPConnectionSimulator(
    500, /*kbps*/
    80, /*millisecs latency*/
    200, /*jitter*/
    1 /*packet loss  %*/ )
  t3_fiber =
    new TCPConnectionSimulator(
      45000, /*kbps*/
      10, /*millisecs latency*/
      0, /*jitter*/
      0 /*packet loss  %*/
    )
  cell = new TCPConnectionSimulator(
    100, /*kbps*/
    400, /*millisecs latency*/
    250, /*jitter*/
    5 /*packet loss  %*/
  )
}
```

`t3_fiber` 后的换行很突兀，违背了相似的代码看上去也要相似，且参数的注释产生了更多换行，很不美观。
调整一下：

```js
class PerformanceTester {
  // new TCPConnectionSimulator(throughput,latency,jitter,packet_loss)
  //                               [kbps]    [ms]   [ms]   [percent]
  wifi = new TCPConnectionSimulator(500, 80, 200, 1)
  t3_fiber = new TCPConnectionSimulator(45000, 10, 0, 0)
  cell = new TCPConnectionSimulator(100, 400, 250, 5)
}
```

把注释都放在上面了，更加紧凑，参数排成一行，参数像表格一样，看上去像一个紧凑的表格。

### 需要时使用列对齐

> 整齐的变和列可快速浏览，而且很容易发现代码中的拼写错误，因为排整齐了，就有了对比。

把参数调用排整齐。

```js
checkFullName('Doug Adams', 'Mr. Douglas Adams', '')
checkFullName(' Jake Brown', 'Mr. Jake Brown III', '')
checkFullName('No such Guy', '', 'no match found')
checkFullName('John', '', 'more than one results')
```

> 因为我的编辑器做不到这一点，可看图片的而情况：

![列对齐](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/_col-algin@2x.png)

#### 应该使用列对齐吗？

列对齐给代码提供了可见的边界，也符合让功能相似的代码看起来也相似。但是有些程序员不喜欢，主要两个原因：

01. 列对齐，有的编辑器不支持；
02. 列对齐会导致额外的改动，让代码的历史记录变得混乱。

> 经验法则：列对齐不必强求，保证项目成员之间一致即可。

### 让代码的排序有意义

要是代码的顺序不影响功能，不要随机的排序，而是选一个有意义的顺序，让认知负担更小。

常见的**有意义**的排序：

01. 对象中的 key 的顺序和 html 中表单的顺序一致；
02. 使用者最关心的在前，不太关心的在后，比如 css 属性；
03. 必需的在前，可选的在后，比如后端接口验证前端提交的数据；
04. 和代码的生命周期一致，有些代码有生命周期，比如 vue 组件，调用这些声明周期钩子函数时，最好按照生命周期的顺序调用；
05. 按照字母排序。

以第二条规则为例，看看顺序时如何影响可读性的：

```css
.page {
  flex-direction: column;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 0.2), 0 2px 2px 0 rgb(0 0 0 / 0.14),
    0 3px 1px -2px rgb(0 0 0 / 0.12);
  flex: 1;
  display: flex;
  align-items: center;
}
```

这一个段 css 代码，有一点前端开发经验的人，就会发现顺序出现的顺序非常奇怪： `display` 和 `flex-direction` 相关的属性，中间却多了一个 `box-shadow` ，display 的值为 `flex` 时，flex 相关的属性才会生效，但是 `flex-direction` 却在最前面，很费解。

> 在阅读 css 代码时，我们关注的顺序是：布局 -> 定位 -> 尺寸 -> 动画 -> 字体 -> 背景 -> 其他，这些属性的顺序对布局影响依次减弱。

按照这个顺序，重新排版上面的代码：

```css
.page {
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 0.2), 0 2px 2px 0 rgb(0 0 0 / 0.14),
    0 3px 1px -2px rgb(0 0 0 / 0.12);
}
```

这样就好理解多了，可以快速知道哪些属性影响了页面的布局。

> 关于 css 属性顺序的最佳实践：使用 [stylelint](https://stylelint.io/) 的[stylelint-order](https://www.npmjs.com/package/stylelint-order)插件让属性的顺序按照对布局的影响大小排列。

在看一个 js 例子：

```js
import hoverIntent from 'hoverintent'
import {
  ref
} from 'vue'
type InAndOut = {
  in ? : (target: HTMLElement) => void
  out ? : (target: HTMLElement) => void
}
const options = {
  in: target => undefined,
  out: target => undefined,
}
/**
 * 鼠标移入移出 hook，可设置鼠标停留时间。
 * 为何不使用 hover 事件：hover 事件瞬间触发，不能设置停留时间
 * @param target 目标元素
 * @param inAndOut 移入移除回调
 * @param inAndOut.in 移入回调
 * @param inAndOut.out 移出回调
 * @param updateTarget 是否更新 hover 的目标元素
 * @param opts hoverIntent配置
 * @link https://www.npmjs.com/package/hoverintent
 */
function useHover(inAndOut: InAndOut = options, updateTarget = false, opts = undefined) {
  const isHover = ref(false)
  const target = ref(null)
  watch(
    target,
    (target, oldTarget) => {
      if (target && target !== oldTarget) {
        detectHover(target)
      }
    }, {
      flush: 'post'
    }
  )

  function detectHover(target) {
    const _target = isRef(target) ? target.value : target
    if (!_target) return
    const {
      in: inTarget, out
    } = inAndOut
    opts &&
      hoverIntent(
        _target,
        () => {
          inTarget?.(_target)
          isHover.value = true
        },
        () => {
          out?.(_target)
          isHover.value = false
        }
      ).options(opts) !opts &&
      hoverIntent(
        _target,
        () => {
          inTarget?.(_target)
          isHover.value = true
        },
        () => {
          out?.(_target)
          isHover.value = false
        }
      )
  }
  return {
    isHover,
    setHoverTarget: ele => {
      if (!updateTarget && target.value) return
      target.value = ele
    },
  }
}

export {
  useHover
}
```

阅读一个函数时，我们更加关注函数的名字、参数和返回值，因为这三个要素决定了函数的用法。useHover 函数没有把返回值放在前面，需要滚动到后面才知道返回值，把返回值提前，让阅读者快速知道它的存在。

```js
function useHover(inAndOut: InAndOut = options, updateTarget = false, opts = undefined) {
  const isHover = ref(false)
  const target = ref(null)

  watch(
    target,
    (target, oldTarget) => {
      if (target && target !== oldTarget) {
        detectHover(target)
      }
    }, {
      flush: 'post'
    }
  )

  return {
    isHover,
    setHoverTarget: ele => {
      if (!updateTarget && target.value) return
      target.value = ele
    },
  }

  function detectHover(target) {
    const _target = isRef(target) ? target.value : target
    if (!_target) return
    const {
      in: inTarget, out
    } = inAndOut
    opts &&
      hoverIntent(
        _target,
        () => {
          inTarget?.(_target)
          isHover.value = true
        },
        () => {
          out?.(_target)
          isHover.value = false
        }
      ).options(opts)

      !opts &&
      hoverIntent(
        _target,
        () => {
          inTarget?.(_target)
          isHover.value = true
        },
        () => {
          out?.(_target)
          isHover.value = false
        }
      )
  }
}
```

这个例子中，return 语句之前的代码只是一个函数，代码行输不是很多，把 return 语句放在最后，可读性提高不大，但是当 return 语句之前有很多代码时，这种改变，可让阅读快速了解到返回值，而不用滚动到下面。

> js 使用 `function` 定义函数，定义可在后面，调用在前面，使用 `const let` 和函数声明定义函数，不支持调用在前，声明在后。

> 经验法则：使用 function 定义函数，因为它的声明可以在调用之后，function 也一眼能让读者知道它是一个函数，而不是其他类型的变量。

> 经验法则：一个 js 文件有多于**3 个以上**的导出，统一放在**文件底部**导出。

> 经验法则：相似的代码，选择一个有意义的顺序，并保持一致。一段代码中 `A` 、 `B` 和 `C` ，在另一段代码中 `C` 、 `A` 和 `B` 会降低可读性。这样的做法，也符合让功能相似的代码看起来也相似的原则。

### 把代码拆分成段落

把文字分段的原因：

01. 分段是一种把相似的想法放在一起，与其他想法分开的方式，方便组织写作思路；
02. 分段提供了可见的边界，没有边界，读者很容易不知道读到哪儿了；
03. 分段便于段落之间导航。

类似的原因，代码也应该分段。

### 个人风格和一致性

相当一部分代码格式，是程序员的个人偏好，比如类的大括号是否应换行，缩进是两个 2 个 tab，还是 4 个空格等，但是两种偏好不应该同时出现在代码中，会降低可读性。

> 一致风格比正确的风格更加重要。

### 关于格式的最佳实践

项目开始之前，和团队成员讨论，指定编码规范，不花精力制定规范的，采用社区的最佳实践即可，并借助 eslint + prettier + stylelint + gitHook 等工具在代码提交前，检查代码质量，统一格式。

当有新成员加入时，先让他熟悉规范。

## 言简意赅的注释

当你根据直觉写下一段代码，几周甚至几天后在阅读它时，不会有你写下代码时的直觉。注释可以在代码中记录写代码时的想法，让阅读代码的人快速理解你的想法。

> 注释的目的是帮助读者快速了解作者写代码时的想法。

### 何时不需要注释

注释会占用阅读时间和屏幕空间，应该编写必要的注释，错误的或者不必要的注释，不能给出有用的信息，反而可能误导他人。

> 经验法则：能从代码本身**快速推断**的信息，不需要注释。

### 不要给不好的名字添加注释

注释不应掩盖不好的命名，而是应该把名字改好。

> 好代码 > 坏代码 + 好注释 >> 坏代码 + 坏注释。

### 需要怎样的注释

好的代码往往能反映你写下代码时的想法，以帮助他人理解你的想法

#### 加入代码评论

在注释中，加入一些有价值的见解，可以帮助他人理解为何这么写。

一些例子：

```JS
// 出乎意料的是，对于这些数据使用二叉树比哈希表快 40%
// 哈比运算的代码比左/右比较大得多
```

> 这个注释告诉了读者，为何使用使用二叉树，防止它们为谓的优化而浪费时间。

```JS
// 作为整体，可能会丢掉几个词。目前没发现bug，想要 100% 解决，太难了。
```

> 没有这段注释，你的队友可能会过于负责，尝试修复它。

```JS
// 这个函数很混乱
// 也许需要另外一种方案，不如提取部分代码到新的函数中
```

> 这个注释，给出代码的问题和改进建议。

### 为代码中的瑕疵写注释

项目一直在迭代，代码一直在演进，难以存在瑕疵。应该把这些瑕疵记录下来，方便他人或者自己改进。

| 标记  | 意义             |
| ----- | ---------------- |
| TODO  | 还没完成的事件   |
| BUG   | 存在缺陷         |
| FIXME |   需要改进的代码 |
| NOTE  | 读者需要特别留意 |

> 经验法则：以上标记可借助编辑器，可注释显示不同的颜色，方便快速阅读和统计，比如 vscode 的[Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)扩展。

![todo-tree使用效果](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/todo-tree@2x.png)

在编辑器左侧显示不同的 icon，状态栏也有统计信息。

### 给常量添加注释

```js
// as long as it is >= 2 * num_processors, its enough.
const MUN_THREADS = 8
```

有些常量名字本身足够见名知义，可不加注释。

```js
const SECONDS_1DAY = 24 * 60 * 60;
```

### 站在读者的角度给出注释

#### 意料之中的提问

他人阅读你的代码时，可能会产生各种疑问：为何这样？为何不使用简便的写法？

当你预料到读者的问题时，最好在注释中给出回答。

#### 公布可能的陷阱

在注释中说出可能的陷阱，可以防止使用者误用。

#### 全局的注释

全局的注释，可以帮助项目新成员快速了解项目或者文件。

```JS
// 这个文件包含了一些辅助函数，为我们的文件系统提供了边界的接口
// 它处理了文件权限以及其他基本细节
```

> 经验法则：文件级别的注释，告诉这个文件的目的。vscode 可使用[koroFileHeader](https://marketplace.visualstudio.com/items?itemName=OBKoro1.korofileheader) 插件快速插入文件头注释。

使用效果：

![文件头注释](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/koroFileHeader@2x.png)

#### 总结性注释

在大块代码的之间写一些总结性注释，可帮助读者快速了解代码之间的联系。

### 如何写好注释

你可能听过这种说法: 注释应该回答为什么，而不是做什么。这种总结过于粗暴。

> 能帮助读者快速理解代码的注释，都可以写。

写好注释需要的技巧

#### 让注释精简

```cpp
// This int is the CategoryType
// The first float in the inner pair is the 'score',
// the second is the weight.
typedef hash_map<int,pair<float,float> > ScoreMap
```

更加精简的注释

```cpp
// CategoryType -> (score,weight)
typedef hash_map<int,pair<float,float> > ScoreMap
```

#### 避免指代不明

### 说明特殊的输入和输出

## 简化控制流程

好的命名、美观的排版和精简的注释，只是代码表面上的改进，代码的控制结构对可读性也有巨大影响，优化代码代码结构，让代码具备更好的设计，可以有效提高可读性。

### 条件结构中的参数顺序

### if else 的顺序

### 避免使用 `do {} while` 循环

### 提前返回

### 最小化嵌套

### js 中可提高可读性的写法

01. 模板字符串

02. 可选链

03. 空值合并

04. 可选参数

05. 剩余参数和合并对象

06. JSON.parse 的第二个参数

07. 善用数组方法

08. 善用字符串方法

09. 生成随机字符串

10. 一些不常用却很有用的 api

## 拆分超长表达式

## 减少变量和收缩作用域

## 一次只做一件事

## 少写代码

## 让测试用例更加可读

## 参考

<!-- [](https://pegasuswang.readthedocs.io/zh/latest/code/%E7%BC%96%E5%86%99%E5%8F%AF%E8%AF%BB%E4%BB%A3%E7%A0%81%E7%9A%84%E8%89%BA%E6%9C%AF/)
[](https://pdai.tech/md/about/book/book-read-code-art.html#%E3%80%8A%E7%BC%96%E5%86%99%E5%8F%AF%E8%AF%BB%E4%BB%A3%E7%A0%81%E7%9A%84%E8%89%BA%E6%9C%AF%E3%80%8B) -->
