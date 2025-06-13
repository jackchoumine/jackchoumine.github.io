# 浅谈 value 和 presentation

在 UI 开发中，比如前端，"value"(值)和"presentation"(表现/呈现)是两个重要的分离概念，它们体现了关注点分离的设计原则。

你是否思考过后端程序员往往使用 '01' 来表示 "男女" 等可枚举的数据？

这种选择仅仅是因为 01 方便吗？ 还是有什么内在逻辑或者设计原则的考虑？

## value -- 值/数据标识

数据代表应用的内部状态。

### 本质

原始 **数据标识(identifier)** 或者业务逻辑的表示，数据标识或者业务逻辑往往是不变或者变得不频繁的。

比如使用 `'0'` 表示女性，`'1'` 表示男性。

### 特点

#### 不包含展示相关信息

`'0'` 表示女性，`'1'` 表示男性，并不关心界面如何展示这些数据。

#### 通常是不可变的 -- immutable

`'0'` 表示女性，`'1'` 表示男性，确定了就不再变更，能有效保证数据一致性。

#### 只关注是什么，不管如何展示

只关注业务逻辑，不关注展示逻辑，能轻松达到用户界面和业务逻辑的解耦。

比如界面使用`'女'`表示女性，哪天使用`'female'`表示女生，或者使用`'♀'`，都不关注，始终使用`'0'`表示女性。

### 示例

比如通过 http 接口获取到一个 json:

```json
{
  "id": "abc131313adada",
  "name": "Jack Ma",
  "birth": "1964-09-10",
  "balance": 50009.89, //余额
  "currency": "usd" // 币种
}
```

接口返回的都是 value。

## presentation -- 数据呈现/数据展示

数据呈现表示如何展示数据，即用户看到的样子。

### 本质

数据的可视化表示，关注人类可读和用户体验。

### 特点

#### 包含 UI 相关的转换或者格式化

用 value 为 `'1984-01-10'` 标识生日，界面展示可以是 `'1989年1月10日'` 或者 `'January 10, 1989'`。

#### 通常是可变的

比如做本地化的时候，英文地区女性尊称使用`'ladies'`，中文地区使用`'女士'`。

#### 关注用户体验(比如人类可读)或者界面美观

### 示例

日期、性别、货币、根据数据条件性的改变展示样式。

```js
const displayUser = {
  id: 'abc131313adada',
  name: '马云',
  birth: '1964年9月10日', // 从 value 1964-09-10 转换而来
  balance: '$50009.89', // 余额 从 balance currency 结合而来
  balanceColor: balance > 2000 ? 'green' : 'red', // 展示逻辑
}
```

## 两者的关键区别

| 维度     | value              | presentation               |
| -------- | ------------------ | -------------------------- |
| 关注点   | 数据本身、数据标识 | 数据展示                   |
| 可变性   | 通常不可变         | 根据用户需求改变           |
| 来源     | 数据库、后端 api   | 转换 value                 |
| 变化频率 | 低频，业务变化时   | 高频，用户改变时，UI改变时 |
| 测试重点 | 数据一致性、正确性 | 人类可读性、用户体验       |

## 为何要区分 value 和 presentation

当业务逻辑和展示分离后，相应的数据也分离，职责更加单一，更加好测试和维护。

1. 职责单一：业务逻辑只关注 value ，展示逻辑只关注 presentation。
2. 更好维护：UI 变化不影响数据逻辑。
3. 测试更加简单：可独立测试 value 相关的逻辑，可独立测试 presentation 相关的逻辑。
4. 更好复用：不同的 presentation，可使用相同的 value。
5. 利于团队协作：界面展示逻辑和数据处理逻辑分离，前后端分离。
6. 适配多端：一套 value ，可服务多端。
7. 方便本地化：一套 value，适配多个地区。

这种分离使得用户界面更容易适应变化，例如当需要支持多语言或更改 UI 设计时，只需修改 presentation 部分而不影响内核数据逻辑。

### 区分 value 和 presentation 是怎么提出来的？

这种分离是随着技术发展和软件设计实践逐渐总结出来的，是一种非常重要的**分离关注点**的手段。介绍一些关键的历史节点：

### 前后端耦合时代

早期的网站使用 jsp 或者 php 开发，界面和后端逻辑耦合，用户修改数据需要刷新页面，体验差，不好维护。

### xhr 局部刷新 + jquery 时代

微软开发 xhr 技术后，谷歌一个程序员发现可使用 xhr 获取后端数据，然后局部刷新页面，可有效提高用户体验。

### backbone.js checkout.js 等 mvc 前端框架时代

这些前端框架的出现，使得前后端逐渐分离，前端只关注界面展示，后端只关注数据处理，网站开发从多页应用到单页面应用过度。

### vue react 等新兴前端框架时代

react 的问世，把网站界面简化成 `UI = render(data)`, 虚拟 DOM 等技术，进一步简化了复杂网站的开发，flux 架构倡导 value 和 presentation 分离。

后来的 vue、svelte 等框架，也继承和发展了 react、checkout.js 等框架的理念。

### 推动分离关注点的动力

#### 复杂度管理

软件的复杂度随着规模的增长而增加，而复杂度难以消除，只能转移，因此通过分层设计，把复杂控制在局部，是很有效的手段。

#### 变更隔离

后端业务逻辑变更，不影响 UI 展示；UI 改变，不影响业务逻辑。

变更隔离后，前后端扩展都更加方便。

#### 团队协作

前后端分离后更利于团队协作，前后端可同步开发，互不影响。

#### 可测试性

前后端代码分离后，可独立测试；

业务逻辑和展示逻辑分离后，可单独测试。

### value 和 presentation 分离的最佳实践原则

1. 保持 value 尽可能纯净，不含展示逻辑；
2. 使用**纯函数**转换 value 为 presentation；
3. 在靠近 UI 展示层转换 value；
4. 使用 ts 编写类型时，区分 value 的类型和 presentation 的类型。

## 前端框架中的在哪些地方转化 value 为 presentation？

在前端架构中，value (原始数据/业务数据)和 presentation (展示数据/UI数据)的转换位置选择直接影响代码的**可维护性**和**可测试性**。

通常在哪些地方转换最适合呢？

### react

#### 1. http 接口调用处

在收到**接口数据后**或者**提交数据前**转换。

```js
// apiService.js
async function getUserData() {
  const response = await fetch('/api/user')
  const rawData = await response.json() // Value

  // 转换为Presentation数据
  return {
    ...rawData,
    fullName: `${rawData.firstName} ${rawData.lastName}`,
    joinDate: formatDate(rawData.registrationDate),
    avatarUrl: rawData.avatar || '/default-avatar.png',
  }
}
```

优点：

1. 集中处理，避免转换逻辑分散在各组件中；
2. 保证进入应用的数据是 UI 可用的格式；
3. 便于统一处理错误或者默认值。

> 如果不确定多个地方展示要求是一致，一定要给原始值 value，方便格式不满足要求时再次转换。
#### 2. Selector 函数(状态管理场景)

位置：在 Redux/Zustand 等状态管理的 selector 中

```js
// selectors.js
const selectFormattedProducts = createSelector([state => state.products], products =>
  products.map(p => ({
    ...p,
    price: `$${p.price.toFixed(2)}`,
    inStock: p.stock > 0 ? 'Available' : 'Out of stock',
  }))
)

// 组件中使用
const formattedProducts = useSelector(selectFormattedProducts)
```

优点：

1. 派生状态可缓存(如Reselect)
2. 保持原始数据不变，方便 presentation 要求不同时再次转换
3. 便于跨组件复用转换逻辑

#### 3. 自定义 hook

位置：封装数据转换逻辑为可复用 hook

```js
function useUserPresentation(userId) {
  const [rawUser, setRawUser] = useState(null)

  useEffect(() => {
    fetchUser(userId).then(setRawUser)
  }, [userId])

  // 转换逻辑
  const displayUser = useMemo(() => {
    if (!rawUser) return null

    return {
      ...rawUser,
      lastActive: timeAgo(rawUser.lastLogin),
      activityLevel: calculateActivityLevel(rawUser.loginCount),
    }
  }, [rawUser])

  return displayUser
}
```

优点：

1. 逻辑高度可复用
2. 自动处理依赖和缓存
3. 保持组件纯净

#### 4. 组件 props 预处理

位置：在容器组件中转换后传给展示组件

```jsx
// 容器组件
function UserContainer() {
  const [rawUser, setRawUser] = useState(null)

  useEffect(() => {
    fetchUser().then(setRawUser)
  }, [])

  if (!rawUser) return <Loading />

  // 转换逻辑
  const userProps = {
    name: formatName(rawUser.name),
    stats: {
      posts: abbreviateNumber(rawUser.postCount),
      followers: abbreviateNumber(rawUser.followerCount),
    },
  }

  return <UserProfile {...userProps} />
}

// 展示组件（纯UI）
function UserProfile({ name, stats }) {
  return (
    <div>
      <h1>{name}</h1>
      <div>Posts: {stats.posts}</div>
      <div>Followers: {stats.followers}</div>
    </div>
  )
}
```

优点：

1. 展示组件保持纯净无逻辑
2. 转换逻辑靠近数据源
3. 易于测试

#### 5. 模板/JSX中的轻量转换(简单场景)

位置：直接在渲染层做简单格式化

```jsx
function UserCard({ user }) {
  return (
    <div className={user.isPremium ? 'premium' : ''}>
      <h2>
        {user.firstName} {user.lastName[0]}.
      </h2>
      <p>Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
      <p>
        Balance:{' '}
        {user.balance.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </p>
    </div>
  )
}
```

适用场景：

1. 极其简单的转换
2. 不会复用的展示逻辑
3. 不影响组件可读性的情况

#### 如何选择转换位置

```bash
是否需要在多个地方复用？
├─ 是 → 选择1/2/3
└─ 否 →
    转换是否复杂？
    ├─ 是 → 选择4
    └─ 否 → 选择5
```

### vue

#### 1. http 接口调用处

和 react 类似，不再赘述。

#### 2. pinia store 的getter 或者 compute (状态管理场景)

和 react 类似，不再赘述。

#### 3. 自定义 hook

和 react 类似，不再赘述。

#### 4. computed 属性

位置：在组件中使用计算属性进行转换。

```html
<script setup>
  import { computed, ref } from 'vue'

  const rawProducts = ref([])

  // 从API获取原始数据
  fetch('/api/products')
    .then(res => res.json())
    .then(data => (rawProducts.value = data))

  // Value → Presentation 转换
  const formattedProducts = computed(() => {
    return rawProducts.value.map(product => ({
      ...product,
      price: new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
      }).format(product.price),
      isNew:
        new Date(product.releaseDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    }))
  })
</script>

<template>
  <div v-for="product in formattedProducts" :key="product.id">
    {{ product.name }} - {{ product.price }}
    <span v-if="product.isNew">New!</span>
  </div>
</template>
```

#### 5. 组件 props 预处理

和 react 类似，可把 props 转成 computed 或者 data 再使用。

> 转成 computed , props 和 computed 保持着连接（props 变化，computed 重新计算），而转成 data，props 和 data 不保持着连接。

#### 6. 自定义格式化指令

位置：创建自定义指令处理显示格式化

```js
// directives/v-format.js
export default {
  mounted(el, binding) {
    if (binding.arg === 'date') {
      el.textContent = new Date(binding.value).toLocaleDateString()
    } else if (binding.arg === 'currency') {
      el.textContent = new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
      }).format(binding.value)
    }
  },
  updated(el, binding) {
    this.mounted(el, binding)
  },
}
```

注册为全局指令：

```js
// main.js
import formatDirective from '@/directives/v-format'

const app = createApp(App)
app.directive('format', formatDirective)
```

使用方式：

```html
<template>
  <div>
    <p v-format:date="user.joinDate"></p>
    <p v-format:currency="product.price"></p>
  </div>
</template>
```

#### 7. 在模板中转换

和 react 在 render 函数中转换类似，不再赘述。

#### vue3 转换策略总结

| 策略         | 适用场景       | 优点           | 缺点               |
| ------------ | -------------- | -------------- | ------------------ |
| http 调用处  | 获取或提交数据 | 集中管理       | 需要额外的代码     |
| pinia getter | 状态管理，state 中保留 value       | 跨组件共享     |
| computed     | 组件内派生数据 | 响应式         | -                  |
| 自定义指令   | 格式化显示     | 简洁、便于复用 | 只能在模板中复用   |
| props 预处理 | 父子组件通信   | 保持子组件纯净 | 父组件可能变得复杂 |
| 模板中转换   | 简单转换       | 简单           | 不适合复杂转换     |


### 转换时应该考虑的原则

- 尽量保留 value ： 一个 value 在可能在多个地方使用，不同 presentation 要求可能不多，保留 value 能提供更大的灵活性;
- 尽量在接近展示的地方转换：在接近展示的地方转换，当发现展示错误时，能从页面快速定位问题。
- 展示组件仅负责展示：展示组件仅仅负责布局和展示数据，转换 value 后再传入展示组件，能保证组件的复用性。

## 参考

[为什么后端喜欢把「男女」等枚举类型的数据转成 01？](https://www.zhihu.com/question/441048558)

## 总结

- value 为数据标识或者原始数据，presentation 为展示数据，两者关注点不同，应该分离；
- value 关注正确性和一致性，用在业务逻辑中，而 presentation 关注可读性和用户体验，用于界面展示；
- 界面开发中，把转 value 为 presentation 的函数写成纯函数，更易测试和复用；
- 数据随着业务逻辑分离，数据格式也发生变化；
- 前后端分离和其他关注点分离的普及，反映了软件工程从"如何让机器执行"到"如何让人更好的协作，更容易的维护代码"的转变；
- 分离的内在价值：**约束带来自由** --- 限制原始数据与展示数据耦合，反而获得更大的架构灵活性和可维护性。
