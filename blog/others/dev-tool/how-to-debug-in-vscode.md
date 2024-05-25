# 如何在 vscode 中调试程序

vscode 调试程序需要满足的条件：

1. 具备编程语言的运行环境，比如 node、python、java 等。
2. 安装对应语言的 vscode 扩展。
3. 配置`launch.json`文件。

## launch.json 配置简介

几个作用：① 指定语言的运行环境 ② 指定调试类型 ③ 跳过某些文件，简化调试 ④ ……

一个需要打开浏览器才能调试的**vue 项目** 的 launch.json 配置如下：

```json
{
  "version": "0.2.0", // 配置文件版本 没有发现有很大的作用
  "configurations": [
    {
      "type": "chrome", // 运行环境为浏览器
      "request": "launch", // 调试类型为 launch
      "name": "debugInChrome", // 调试名称 在左上角选择调试时显示的名称
      "url": "http://localhost:3000", // 调试的 url，开启调试后会自动打开浏览器并访问这个 url
      "webRoot": "${workspaceFolder}", // 项目根目录
      "skipFiles": ["<node_internals>/**", "${workspaceFolder}/node_modules/**"] // 跳过的文件
    }
  ]
}
```

> 端口号要和非调试时的端口号一致，不然会出现调试时页面无法加载的情况。

configurations 是配置数组，可以配置多个调试项。每个配置的 `type` 、 `request` 、 `name` 三个属性是必须的。

> type 用于指定运行环境，request 用于指定调试类型，name 用于指定调试名称。

两种调试类型：launch 和 attach。

* launch：启动一个新的进程，然后调试这个进程。

* attach：连接到一个已经运行的进程，然后调试这个进程。

> 一般来说，launch 用于调试本地程序，attach 用于调试远程程序，或者重启程序需要很久的时候。

### 如何创建 launch.json 文件

大部分情况下，vscode 会打开一个项目的时候，询问是否需要自动创建 launch.json 文件，但是有时候需要手动创建。

> 如何手动创建？

点击左侧的调试按钮，然后点击配置按钮，选择一个调试类型，比如 node，然后就会自动在 `.vscode` 目录里创建一个 launch.json 文件。

## node 调试

vscode 是一个非常好用的编辑器，它支持调试 node 程序，下面是如何在 vscode 中调试 node 程序的方式。

三种方式：

1. launch 调试模式
2. attach 调试模式
3. vscode 自带 npm 脚本调试

### launch 调试模式

在 vscode 中创建一个 launch.json 文件，配置调试参数，然后点击 debug 按钮，开始调试。

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/app.js"
    }
  ]
}
```

配置说明：

* `type`：调试类型，这里是 node，可以支持其他类型，比如 chrome 等。
* `request`：请求类型，这里是 launch，还有 attach 类型等。
* `name`：调试名称，在左上角选择调试时显示的名称。
* `skipFiles`：跳过的文件。
* `program`：要调试的文件。

### attach 调试模式

有些时候，需要调试已经运行的程序，比如 web 服务，重启可能需要很久或者需要远程调试，这时候就需要使用 attach 模式，调试器会附加到已经运行的程序。

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to Process",
      "skipFiles": ["<node_internals>/**"],
      "processId": "${command:PickProcess}"
    }
  ]
}
```

> attach 模式需要一个 processId，这里使用了 `${command:PickProcess}` ，会弹出一个选择框，选择一个进程，然后连接到这个进程。

> attach 通常用来调试 web 服务，比如 koa、express 等，可以在服务启动时打断点，然后 attach 到进程上，这样就可以调试服务了。

### vscode 自带 npm 脚本调试

在 vscode 左下角选择选择带有 debugger 的图标 npm 脚本执行，点击后会出现一个 debug 控制台，点击绿色的三角形按钮，开始调试。

> 实际上，他会启动一个 attach 模式的调试器，然后连接到 npm 脚本启动的进程。

### vscode 中和调试相关的菜单

顶部菜单栏有一个 `运行` 菜单，包含了一些和调试相关的功能。

## 小结

vscode 是一个非常好用的编辑器，可调试各种程序。调试程序需要满足的条件：① 具备编程语言的运行环境 ② 安装对应语言的 vscode 扩展 ③ 配置 `launch.json` 文件。

* launch.json 需要有三个必须选项：`type`、`request`、`name`。
* vscode 自带 npm 脚本调试、launch 调试模式、attach 调试模式。
* vscode 中和调试相关的菜单在顶部菜单栏的`运行`菜单中。
