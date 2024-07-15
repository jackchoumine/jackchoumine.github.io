# tailwind 和组件库样式冲突

tailwind 在组件库样式之前引入，会导致 tailwind 样式被组件库样式覆盖，比如 `flex` 添加到 `el-col` 组件上，flex 样式会被 `el-col` 样式覆盖。

## 解决方案

组件库不使用自动引入，而是手动在 `tailwind` 之后引入，这样可确保 tailwind 的工具类生效。

然而，tailwind 后引入，它的 `@tailwind base` ，又会重置组件的库的样式。

经过搜索，得知 `base` 是重置样式，以保证页面在不同浏览器中的一致性。如果已经有了一套自己的重置样式，可不引入。

```scss
// @tailwind base; // 不引入重置样式
@tailwind components;
@tailwind utilities;
```

## 相似的问题

[remove specific style from tailwind base](https://stackoverflow.com/questions/71783177/remove-specific-style-from-tailwind-base)

[How to safely remove Tailwind CSS base rules when building Chrome Extensions](https://medium.com/@trungpv1601/how-to-safely-remove-tailwind-css-base-rules-when-building-chrome-extensions-f5ca9f9a9d04)

## 参考

[Tailwind CSS 大全](https://powerkaifu.github.io/2020/09/24/lesson-tailwind-css/)

[Tailwind使用技巧：在配置时，可以省略掉@tailwind base吗](https://blog.csdn.net/andy_68147772/article/details/134679114)

[TailwindCSS](https://hsuchihting.github.io/categories/TailwindCSS/)

[带你探索Tailwind Css](https://mdnice.com/writing/a8fb53dcc8654401802fe1c935c41104)

[tailwind css](https://blackglory.me/notes/tailwind-css)
