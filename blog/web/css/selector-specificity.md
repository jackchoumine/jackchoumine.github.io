<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-28 20:58:01
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-29 02:40:58
 * @Description : 
-->

# css 选择器特异性

当有**多个选择器**中有**相同的属性**作用于同一个元素时，浏览器会根据选择器的特异性来决定哪个选择器的**属性值**生效。

```css
p.my-p {
  background-color: blue;
  color: red;
}

#my-p {
  background-color: green;
  color: yellow;
  box-sizing: border-box;
}
```

```html
<p id="my-p" class="my-p">Hello, world!</p>
```

上面的例子中， `p.my-p` 和 `#my-p` 选择器都作用于 `p` 元素，但是 `#my-p` 的特异性更高，所以 `#my-p` 中的 `color` 和 `background-color` 属性值生效。

> 在 chrome 开发者工具中，可查看失效的属性值。

![失效的属性值会显示删除线](https://cdn.jsdelivr.net/npm/zqj-pics/css/shi-xiao-sheng-ming.png)

> 在计算样式面板，可查看最后生效的所有样式声明。

![计算样式](https://cdn.jsdelivr.net/npm/zqj-pics/css/ji-suan-yang-shi.png)

## 规则 vs 声明 vs 属性 vs 属性值

很多文章没有明确区分这几个概念，这里先做一个区分：

* **规则**：CSS 规则由选择器和声明组成，如 `p { color: red; }`。
* **声明**：CSS 声明由属性和属性值组成，如 `color: red;`。
* **属性**：CSS 属性是 CSS 规则中的一部分，如 `color`。
* **属性值**：CSS 属性值是 CSS 规则中的一部分，如 `red`。

> 在 chrome 开发者工具中，可在右键菜单那种复制它们。

> 特异性影响的属于多个规则中的属性值，而不是规则本身。

## 特异性计算

特异性是一个四元组，如 `0, 0, 0, 0` ，每个元素的值都是一个非负整数，从左到右依次是:

1. **行内样式**：行内样式的特异性是 `1, 0, 0, 0`。
2. **ID 选择器**：ID 选择器的特异性是 `0, 1, 0, 0`。
3. **类选择器、属性选择器、伪类**：类选择器、属性选择器、伪类的特异性是 `0, 0, 1, 0`。
4. **元素选择器、伪元素**：元素选择器、伪元素的特异性是 `0, 0, 0, 1`。

> chrome 开发者工具中，鼠标移动到选择器上可以查看特异性，不会显示行内样式的特异性。

![查看特异性](https://cdn.jsdelivr.net/npm/zqj-pics/css/chrome-dev-tool-特异性.png.png)

> 常见的选择器特异性

```bash
*             {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
#x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */
```

### 特异性应用规则

1. **同类叠加**：`.a.b` 的特异性是 `0, 0, 2, 0`，因为有两个类选择器，`#a.b` 的特异性是 `0, 1, 1, 0`。
2. **特异性相同**：后定义的规则会覆盖先定义的规则。
3. **特异性不同**：特异性高的规则会覆盖特异性低的规则。
4. **!important**：`!important` 会覆盖任何规则，但是不推荐使用。

> 通配选择器( `*` )、组合选择器( `+, >, ~, '', ||` )和一些伪类选择器( `:not()` 、 `:where()` 、 `:is()` ) 不影响特异性。

### 慎用行内样式和 `!important`

> 何时应该使用行内样式？

只有覆盖id选择器的时候使用。

行内样式有三个严重的问题：

1. 不利于维护：行内样式和 HTML 混在一起，不利于维护。

2. 优先级高：行内样式的优先级非常高，会覆盖大部分样式，只有`!important`才能覆盖行内样式。

3. 不利于复用：行内样式只能作用于一个元素，不利于复用。

使用 `!important` 的时候，有引发其他一些问题。

> 何时应该使用 `!important` ?

1. 只有覆盖行内样式的时候使用。

2. 覆盖其他`!important`的时候使用。

其他情况，都尽可能不用。与其使用 `!important` ，不如：

1. 使用特异性高的选择器。

2. 使用级联特性降低某些规则的优先级。

> 何时不该用 `!important` ?

1.  在覆盖全站某些样式时使用，比如在黑暗模式下覆盖某些样式。

其他情况，都不要使用。

## 应该多用类选择器

类选择的特异性较低，容易被覆盖，且能够复用。

ID 选择器的特异性很高，难以被覆盖，无法复用。

> 慎用行内样式、ID 选择器和 `!important` 。
