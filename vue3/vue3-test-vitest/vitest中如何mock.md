# vitest 中如何使用 mock

为何需要 mock？在编写测试时，被测试代码可能依赖复杂的外部依赖，比如网络请求、数据库查询等，这些资源可能会导致测试变得复杂、不稳定，甚至无法测试。mock 可以模拟这些外部资源，让测试变得简单、稳定。

vitest 提供了模拟外部依赖的方法，可模拟几种不同的依赖:

* 外部模块：比如`axios`。
* 全局方法： 比如`localStorage`、`navigator`、`fetch`等。
* 全局变量：比如`window`、`document`、`xhr`等。
* 定时器：`setTimeout`、`setInterval`等。

## mock 的优缺点

### 优点

* 无需真实的网络请求，加快测试速度
* 可以控制返回的数据，让测试更加稳定
* 降低测试的复杂度

### 缺点

* 无法测试真实的网络请求，可能是无效的测试
* 恰如其分的 mock 会很困难

## 参考

* [An advanced guide to Vitest testing and mocking](https://blog.logrocket.com/advanced-guide-vitest-testing-mocking/)
