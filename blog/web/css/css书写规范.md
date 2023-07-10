# CSS 书写规范

## 属性书写顺序

> 布局属性

1. display
2. position
3. float
4. clear
5. visibility
6. overflow

> 尺寸属性

1. width / height
2. margin
3. padding
4. border
5. background

> 文本属性

1. color
2. font
3. text-algin
4. text-decoration
5. vertical-algin

> 其他属性

1. content
2. cursor
3. border-radius
4. box-shadow
5. text-shadow

### vscode 扩展约束顺序

stylelint + [csscomb 设置 css 顺序](https://www.zhihu.com/column/p/113222681)

## 常见的五种应该避免的书写方式

1. 字体使用绝对单位 px

> 为了适应不同的屏幕，字体应该使用相对单位 em 或 rem，当屏幕放缩时，字体也会跟着放缩，保证了页面的整体比例不会被破坏。

```css
:root{
  font-size: 62.5%;
}
body{
  font-size: 1.6rem; /* 16px */
}
```

2. 使用深度嵌套的选择器

```css
nav li ul li a {
  font-size: 2rem;
}
```

> 选择器的层级越深，浏览器渲染页面所需要的时间就越长，所以应该尽量避免使用深度嵌套的选择器。

> 使用子选择器，选择和 div 结构耦合了，当页面结构发生变化时，样式也需要跟着变化，这样就增加了维护成本。

使用类选择器

```css
.nav__link {
  font-size: 2rem;
}
```

3. 移除聚焦样式

```css
input:focus {
  outline: none;
}
```

所有交互元素都应该有聚焦样式，否则会影响用户体验。

```css
input:focus {
  outline: 2px solid #000;
}
input:focus:not(:focus-visible) {
    outline:none;
    box-shadow: 1px 1px 5px rgba(1,1,0,0.7);
}
```

4. z-index 不使用合理的值

```css
.top{
    z-index: 9999;
}
.bottom {
    z-index: 9;
}
```

> z-index 的值应该是合理的，不应该是一个很大的值，也不应该是一个很小的值，应该是一个合理的值。

在网站布局时，合理规划 z-index 的值，避免出现 z-index 的值过大或过小的情况，也方便调试。

```css
.top {
   z-index: 200;
}
.bottom {
   z-index: 100;
}
```

[Rational Z-Index Values](https://css-tricks.com/rational-z-index-values/)

[What The Heck, z-index??](https://www.joshwcomeau.com/css/stacking-contexts/)

[4 reasons your z-index isn’t working (and how to fix it)](https://www.freecodecamp.org/news/4-reasons-your-z-index-isnt-working-and-how-to-fix-it-coder-coder-6bc05f103e6c/)
