# jest 中的模拟

被代码会依赖一些外部环境，比如 http 接口，npm 模块、数据库等，集成这些环境往往会使得测试用例不可控，真实环境也许是缓慢和脆弱的，比如真实环境要求定时器的间隔为20分钟，测试不可能等待20分钟，需要使用代码模拟一个稳定的环境，jest 可模拟常见的"环境"，比如**回调函数**、**定时器**、**数据库**等。

通过模拟，可以使得测试用例更加可控，更加稳定，更加快速，且能方便的知道依赖的模块的调用情况：

1. 是否被调用
2. 调用次数
3. 调用时的参数
4. 调用时的返回值
6. 调用时的 this
5. 调用顺序

jest 有三种创建模拟函数的方式：

* jest.fn() -- 模拟函数
* jest.spyOn() -- 模拟对象的方法
* jest.mock() -- 模拟模块

先看 jest.fn 

## jest.fn 

## jest.spyOn

## jest.mock

## 参考

[Mock Functions or Spies Demystified - How Does jest.fn() Work?](https://www.pluralsight.com/guides/how-does-jest.fn()-work)

[How to Write Functional Tests in React (Part 1)](https://echobind.com/post/how-to-write-functional-tests-in-react-part-1)

[Jest Spyon: All You Need To Know About This Function](https://www.positioniseverything.net/jest-spyon/)

[The Jest Handbook](https://codewithhugo.com/guides/jest-handbook/)

[Spying on Functions and Changing Implementation](https://silvenon.com/blog/mocking-with-jest/functions)

[Frontend Unit Testing | Best Practices & Tutorial](https://www.meticulous.ai/blog/frontend-unit-testing-best-practices)
