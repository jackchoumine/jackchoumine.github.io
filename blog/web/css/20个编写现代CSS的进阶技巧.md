# 20 个编写现代CSS高级技巧

翻译自：[20 Advanced CSS Tips & Tricks](https://tutorialzine.com/2016/05/20-advanced-css-tips-tricks)

在这篇文章中，想与您分享 CSS 社区推荐的 20 个有用的约定和最佳实践。有些更适合初学者，有些则有点高级，但我们希望每个人都能找到他们不知道的很酷的技巧。

## 1. 注意 margin 折叠

与大多数其他属性不同，垂直边距相遇时会折叠。这意味着，当一个元素的下边距接触另一个元素的上边距时，只有两个元素中较大的一个能够起效。这是一个简单的例子：

```html
<style>
  .square {
    width: 80px;
    height: 80px;
  }

  .red {
    background-color: #F44336;
    margin-bottom: 40px;
  }

  .blue {
    background-color: #2196F3;
    margin-top: 30px;
  }
</style>
<div class="square red"></div>
<div class="square blue"></div>
```

红色和蓝色方块之间的距离不是 70 像素，而是只有 40 像素，蓝色方块的边距根本没有被考虑在内。有很多方法可以避免这种行为，但最好**仅在一个方向上使用边距，最好是 margin-bottom**。

## 2. 使用 flex 布局

flexbox 经过专门设计，可以轻松地按照设想的方式创建任何布局。现在的浏览器支持几乎是完美的，所以应该没有什么可以阻止你全部使用 Flex 进行布局。

```css
.container {
  display: flex;
}
```

我们之前在Tutorialzine 上介绍过一些使用flexbox 的技巧和技巧。在这里查看：[您需要了解的 5 种 Flexbox 技术](https://tutorialzine.com/2016/04/5-flexbox-techniques-you-need-to-know-about)

## 3. 重置样式

尽管多年来情况已经有了很大改善，但不同浏览器的行为方式仍然存在很大差异。解决此问题的最佳方法是应用 CSS 重置，为所有元素设置通用默认值，从而处理干净的样式表，保证样式表在各个浏览器都产生相同的效果。

有一些库，比如 [normalize.css](http://necolas.github.io/normalize.css/)、[minireset](http://jgthms.com/minireset.css/) 和 [ress](https://github.com/filipelinhares/ress), 可以很好地做到这一点，纠正所有可以想象到的浏览器不一致问题。

不想使用库，您可以使用以下样式自行进行非常基本的 CSS 重置：

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

这可能看起来有点苛刻，但取消边距和填充实际上使布局元素变得更加容易，因为它们之间没有默认的空间需要考虑。 box-sizing: border-box; 属性是另一个很好的默认值，我们将在下一个技巧中详细讨论它。

## 4. 使用 border-box

大多数初学者不知道 box-sizing 属性，但它实际上非常重要。了解它的作用的最佳方法是查看它的两个可能值: 

* content-box: 默认值，元素的宽度和高度仅包括内容，不包括边框和填充。border 和 padding 会影响布局的大小。

* border-box: 元素的宽度和高度包括内容、填充和边框，所以不会影响布局的大小。

为所有元素设置 border-box 可以更轻松地设置所有内容的样式，因为您不必一直进行数学计算。

```css
div.content-box {
  width: 100px;
  padding: 10px;
  border: 5px solid black;
}

/*
 div.content-box 的宽度是 100px + 10px + 10px + 5px + 5px = 130px
*/

div.border-box {
  width: 100px;
  padding: 10px;
  border: 5px solid black;
  box-sizing: border-box;
}

/*
 div.border-box 的宽度是 100px 
 border 和 padding 不会影响布局的大小
 内容区域的宽度是 100px - 10px - 10px - 5px - 5px  = 70px
*/
```

## 5. 使用 div 的 background 代替 img 

将图像添加到设计中时，尤其是要响应式设计时，请使用带有 background CSS 属性的 `div` 标记，而不是 `img` 。

> 由于 background-size、 background-position 和其他属性，它实际上使正确设置图像样式变得更加容易，保持其原始大小和纵横比特性。

```HTML
<style>
  img {
    width: 300px;
    height: 200px;
  }

  div {
    width: 300px;
    height: 200px;
    background: url('https://tutorialzine.com/media/2016/08/bicycle.jpg');
    background-position: center center;
    background-size: cover;
  }

  section {
    float: left;
    margin: 15px;
  }
</style>

<section>
  <p>Img element</p>
  <img src="https://tutorialzine.com/media/2016/08/bicycle.jpg" alt="bicycle">
</section>

<section>
  <p>Div with background image</p>
  <div></div>
</section>
```

> 缺点是，页面的网络可访问性会受到轻微影响，因为屏幕阅读器和搜索引擎无法正确抓取图像。

## 6. 合并表格的边框

表格很古怪，几乎不可能做出响应式的，并且总体上很难设计。例如，默认情况会产生边框，很难看。

手动设置表格的边框样式是一个很好的解决方案，可以使表格看起来更现代，更干净。

```CSS
table {
  width: 600px;
  border: 1px solid #505050;
  margin-bottom: 15px;
  color: #505050;
  border-collapse: collapse;
  /* 合并边框 */
}

td {
  border: 1px solid #505050;
  padding: 10px;
}
```

## 7. 更好的编写注释

CSS 不是一种编程语言，但它的代码仍然需要文档。只需一些简单的注释即可组织样式表并使您的同事或未来的自己更容易使用它。

大部分情况一些关键的组件或者媒体查询，使用多行注释并在后面留下几行空行：

```css
/*---------------
    #Header
---------------*/
header {}

header nav {}

/*---------------
    #Slideshow
---------------*/
.slideshow {}
```

设计中的细节或不太重要的组件可以用单行注释进行标记。

```css
/* Footer Buttons   */
.footer button {}

.footer button:hover {}
```

## 8. 使用 kebab-case 命名风格

当类名和 ID 包含多个单词时，应使用 `连字符` (-)。 CSS 类名、ID区分大小写，因此不能选择驼峰命名法。

```css 
/*  Do   */
.footer-column-left { }

/*  Don't  */
.footerColumnLeft { }

.footer_column_left { }

```

在命名时，还可以考虑使用 [BEM](https://en.bem.info/)，它遵循一组增加一致性的原则并提供基于组件的开发方法。您可以在这篇优秀的 [CSS-Tricks](https://css-tricks.com/bem-101/) 文章中阅读更多相关内容。

> CSS 属性不缺分大小写。

## 9. 使用继承特性减少重复

大部分CSS属性值都从DOM树中的上一层继承，因此称为层叠样式表。这意味着您可以在父元素上设置一些通用的样式，而不必在每个子元素上重复。

以 font 属性为例 - 它几乎总是从父级继承，您不必为页面上的每个元素再次单独设置它。

只需将设计中最流行的字体样式添加到 `html` 或 `body` 元素中，让后代元素继承它。

```css
html {
    font: normal 16px/1.4 sans-serif;
}
```

随时更改任何给定元素的样式。我们所说的只是避免重复，尽可能使用继承。

## 10. 使用 transform 创建动画

不要通过直接更改 width 和 height 或 left/top/bottom/right 来对元素进行动画处理。最好使用 `transform` 属性，因为它提供更平滑的过渡，并使您在阅读代码时更容易理解您的意图。

```css
.ball {
  left: 50px;
  transition: 0.4s ease-out;
}

/* bad */
.ball.slide-out {
  left: 500px;
}

/* better */
.ball.slide-out {
  transform: translateX(450px);
}
```

transform 及其所有功能（translate 、 rotate 、 scale 等）几乎具有通用的浏览器兼容性，可以自由使用。

## 11. 不要DIY, 使用现成的库

CSS 社区非常庞大，并且不断有新的库出现。它们具有各种用途，从微小的片段到用于构建响应式应用程序的成熟框架。其中大多数也是开源的。

下次当你遇到 CSS 问题时，在尝试用尽全力和技巧解决它之前，请检查 GitHub 或 CodePen 上是否还没有可用的解决方案。

## 12. 保持选择器具有较低的特异性

使用具有高特异性的选择器将导致您不断地用更高的选择器胜过旧的选择器，并最终导致 `!important` ， `!important` 再导致 `!important` ，样式很快失控，成为调试的噩梦。

`(inline-style,id,class-name|pseudo-class|attribute,|element)` 是 CSS 选择器的特异性计算方式。在编写 CSS 时，尽量使用较低特异性的选择器，以便更容易覆盖。

> 在 chrome 开发者工具中，可以查看选择器的特异性，鼠标移动到选择上面，显示 `(0,2,1)` ，就是选择器特异性。开发者工具看不到行内样式的特异性，但是行内样式的特异性是最高的。

## 13. 慎用 `!important`

尽量使用较低特异性的选择器，否则你就可能会被迫使用 `!important` 来覆盖样式，覆盖 `!important` 又引入 `!important` ，最终导致样式失控。

> 覆盖样式的最佳方法是使用具有**更高特异性的选择器**，而不是使用 `!important` 。

> `!important` 会覆盖所有其他样式，包括行内样式。写行内样式本身不是一个好的实践。

## 14. 使用 `text-transform` 转换文本

`text-transform` 属性可以将文本转换为大写、小写或首字母大写。这是一个很好的技巧，可以节省时间并确保文本的一致性。

```css
h1 {
  text-transform: uppercase;
}
```

> 中文不受 `text-transform` 影响。

## 15. em、rem 和 px 的使用

人们是否应该使用 em、rem 或 px 值来设置元素和文本的大小存在很多争论。事实上，这三种选择都是可行的，并且各有利弊。

所有的开发人员和项目都是不同的，因此对于何时使用哪个没有任何严格的规则。不过，以下是针对每个单元的一些提示和一般良好实践：

* em - 1 em 的值相对于直接父级的 font-size 。 em 经常用于媒体查询，对于响应能力来说非常有用，但是em和px的转换关系的可能会让人非常困惑，因为它不固定。

* rem - 相对于 html 元素的字体大小，rem 使得缩放页面上的所有标题和段落变得非常容易。将 html 保留为默认字体大小并使用 rem 设置其他所有内容是可访问性方面的一个很好的方法。

* px - 像素为您提供最精确的精度，但在响应式设计中使用时不提供任何缩放。它们可靠、易于理解，并且在值和实际结果之间呈现出良好的视觉联系。

最重要的是，不要害怕尝试，尝试所有的方法，看看你最喜欢什么。有时 em 和 rem 可以为您节省大量工作，尤其是在构建响应式页面时。

## 16. 在大型项目中使用预处理器

Sass、Less、PostCSS、Stylus等预处理器是 CSS 发展的下一步。它们提供变量、CSS 函数、选择器嵌套和许多其他很酷的东西等功能，使 CSS 代码更易于管理，尤其是在大型项目中。

## 17. 自动添加浏览器

编写特定于浏览器的前缀是 CSS 中最烦人的事情之一。它们不一致，您永远不知道到底需要哪些，并且如果您执行将它们放入样式表的实际过程，那将是一场无聊的噩梦。

值得庆幸的是，有一些工具可以自动为您执行此操作，甚至可以让您决定需要支持哪些浏览器：

* 在线工具：[Autoprefixer](https://autoprefixer.github.io/)

* 构建工具：[PostCSS - Autoprefixer](https://github.com/postcss/autoprefixer)

## 18. 生产环境中压缩 CSS

为了提高网站和应用程序的页面负载，应该始终使压缩的资源。

有许多不同的方法可以缩小 CSS 代码：

* 在线工具：[CSS Minifier](https://cssminifier.com/)、[CSS Compressor](http://csscompressor.com/)

* [CSSNano](http://cssnano.co/)

根据您的工作流程，可以使用上述任何选项，但建议以一种或另一种方式自动化该过程。

## 19. 多参考 can i use

[Can I Use](https://caniuse.com/) 是一个非常有用的网站，可以查看各种 CSS 属性和功能的浏览器支持情况。这对于决定是否使用某个新功能或属性非常有用。

## 20. lint css

验证 CSS 可能不像验证 HTML 或 JavaScript 代码那么重要，但通过 CSS Linter 运行代码仍然非常有帮助。它会告诉您是否犯了任何错误，警告您不良做法，并为您提供改进代码的一般提示。

就像 minfier 和 autoprefixer 一样，有很多免费的验证器可用：

* 在线工具：[W3 Validator](https://jigsaw.w3.org/css-validator/)、[CSS Lint](http://csslint.net/)

* 库：[stylelint](http://stylelint.io/)、[css-validator](https://www.npmjs.com/package/css-validator)

压缩CSS、添加浏览器前缀、lint CSS 最好和你的工作流结合，可结合构建工具自动完成。
