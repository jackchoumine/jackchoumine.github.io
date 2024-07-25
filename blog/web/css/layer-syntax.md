# @layer 语法学习

`@layer` 是CSS的一种 `@规则` ，用于声明样式的**级联层**，可以把同一个层内的样式规则级联到一起，让开发人员对层叠机制有更多控制权。 

## 出现的原因

在日常开发中，一个项目里的样式表可能会有很多，比如项目自身的样式、组件库A的样式、组件库B的样式，要考虑样式的引入顺序和选择器特异性，样式表的层叠关系很快变得复杂，非常容易冲突，有时候希望重置组件库的某些样式，不得不使用 `高特异性` 的**选择器**来覆盖，甚至使用 `!important` 来覆盖，这又导致了进一步的复杂性。
比如有一 `element-plus` 的组件库，它的样式是这样的：

```css
.el-form--inline .el-form-item {
  display: inline-flex;
  margin-right: 2rem;
  vertical-align: middle;
}
```

希望把 `margin-right` 重置为 `1rem` ，就需要这样写：

```css
.my-component .el-form--inline .el-form-item {
  margin-right: 1rem;
}
```

原来的选择器特异性为 `(0,2,0)` ，使用特异性为 `(0,3,0)` 选择器来覆盖。这种写法非常不优雅，而且容易出错，样式变得复杂后，不易找到一个特异性恰好的选择器。
希望有一种方式，把有些CSS样式设置低的优先级，且这种优先级不受选择器特异性的影响。
`@layer` 就是为了解决这个问题而出现的 -- 它可把多个样式规则放在同一个层级，然后改变一个层级的优先级。
一个例子：

```html
    <head>
      <style>
        p {
          background-color: lightcoral;
          font-size: 20px;
          border: 2px solid black;
        }

        .container p {
          background-color: lightblue;
          font-size: 25px;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <p>This is a sample text.</p>
      </div>
    </body>
```

`.box p` 的选择器特异性为 `(0,1,1)` ， `p` 特异性为 `(0,0,1)` ，最后 `.box p` 背景和字体大小生效。
在 `.box p` 外部添加一个 `@layer` ，可以改变选择器的优先级：

```css
@layer component {
  .box p {
    background-color: lightblue;
    font-size: 25px;
  }
}
```

![.box p 的样式失效了](https://cdnjson.com/images/2024/07/24/82dacc91b5249b5a39afefcbdb2d4035.png)

## 语法和优先级

### 不嵌套的 `@layer`

```css
@layer <layer-name> {
  /* CSS rules */
}

/* 
some css rules
*/
/* 在后面继续向级联层添加规则 */
@layer <layer-name> {
  /* CSS rules */
}
```

`<layer-name>` 是一个标识符，用于级联层的名称，可以是任意字符串。 

> 优先级情况：后添加的规则优先。

```CSS
@layer component {
  .box p {
    background-color: lightblue;
    font-size: 25px;
    color: red;
  }
}

/*
  some css code
 */
@layer component {
  .box p {
    color: blue;
  }
}
```

`color:blue` 生效。
`CSS rules` 是一组CSS规则，可以是任何CSS规则，包括 `@layer` 规则，即可嵌套。

### 嵌套的 `@layer`

```css
@layer outer {

  /* CSS rules */
  @layer inner {
    /* CSS rules */
  }
}
```

> 嵌套的 `.` 写法

```css
@Layer outer {
  /* CSS rules */
}

@Layer outer.inner {
  /* CSS rules */
}
```

效果和上面的写法是一样的。

> 优先级情况：外层的规则优先。

```css
@layer component {
  .box p {
    background-color: lightblue;
    font-size: 25px;
    color: red;
  }

  @layer inner {
    .box p {
      font-size: 50px;
    }
  }
}
```

`font-size: 25px;` 生效。
声明每被layer包裹一层，优先级降低一层。

### 同一个规则被多个 `@layer` 包裹

```css
@layer component {
  .box p {
    background-color: lightblue;
    font-size: 25px;
    color: red;
  }
}

@layer component-1 {
  .box p {
    color: blue;
  }
}
```

> 优先级情况：后面的 layer 优先级高。

### 匿名 `@layer`

```css
@layer {
  /* CSS rules */
}
```

匿名 `@layer` 不能在后续添加 CSS 规则，也不能改变其顺序，顺序默认 `在最后` , 优先级最高。

> 不建议使用匿名 `@layer` ，因为无法改变其顺序和追加样式规则。

## 如何改变优先级？

通过 `@layer layer-name1,[...]layer-name2` 指定层级的优先级：位于会面的级联层优先级高。

```css
@layer component {
  .box p {
    background-color: lightblue;
    font-size: 25px;
    color: red;
  }
}

@layer component-1 {
  .box p {
    color: blue;
  }
}
```

默认的级联层和layer出现的顺序一样，即 `@layer component-1,component` ，所以 `color: blue` 生效。

希望 `color: red` 生效，在样式表顶部改变级联层顺序：

```css
@layer component-1,
component;

@layer component {
  .box p {
    background-color: lightblue;
    font-size: 25px;
    color: red;
  }
}

@layer component-1 {
  .box p {
    color: blue;
  }
}
```

### 外部样式的优先级如何修改？

使用 `@import url(path) layer(layer-name)` 为外部样式表指定级联层，再使用上面的方式修改。

```css
@import url('./import.css') layer(importLayer);

@layer component {
  .box p {
    background-color: lightblue;
    font-size: 25px;
    color: red;
  }
}

@layer component-1 {
  .box p {
    color: blue;
  }
}
```

`import.css` 文件内容：

```css
.box p {
  color: yellow;
}
```

<!-- > `@import` 只能在样式表的顶部使用。 -->

`component-1` 的 `color: blue` 生效。

希望 `import.css` 的 `color: yellow` 生效，需要修改 `import.css` 的级联层：

我希望 import.css 的优先级最高，把 `importLayer` 放在最后。

```css
@layer component-1,
component,
importLayer;

@import url('./import.css') layer(importLayer);

/**
...
*/
```

这样不生效，不知道为何。
