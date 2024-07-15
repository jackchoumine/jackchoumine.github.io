# vite 使用问题记录

## WebStorm 编辑器，修改组件后，没有聚焦到命令行，页面不会热更新

WebStorm 版本号：

```BASH
WebStorm 2024.1.5
Build #WS-241.18034.50, built on June 19, 2024
Runtime version: 17.0.11+1-b1207.24 amd64
VM: OpenJDK 64-Bit Server VM by JetBrains s.r.o.
```

vite 版本号：

```BASH
"vite": "3.1.3"
```

根据 [HMR does not work with certain code in Vue](https://github.com/vitejs/vite/issues/8224)，
升级 vite 到 `3.2.8` ，还是没有解决问题。
