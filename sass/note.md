## 混入

### 无参混入

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.info {
  @include flex-center;
  width: 100%;
  background-color: lightgreen;
}
```

编译后：

```css
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  background-color: lightgreen;
}
```

### 有参混入

```scss
@mixin opacity($opacity) {
  opacity: $opacity;
  filter: alpha(opacity=$opacity * 100);
}
.info {
  @include flex-center;
  @include opacity(0.5);
  width: 100%;
  background-color: lightgreen;
}
```

> 参数以 `$`开头，可提供默认值。

编译后：

```css
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  filter: alpha(opacity=50);
  width: 100%;
  background-color: lightgreen;
}
```

混入只是复制样式规则，即复制选择和样式声明。

## 继承

混入是不同选择器之间有相同的样式规则，提取后复制到选择器中。

继承是不同选择器之间有相同的样式规则，提取后使用**分组选择器**共享相同的`样式声明`,不是样式规则。

```scss
.error {
  border: #f00 solid;
  background-color: #fdd;

  &--serious {
    border-width: 3px;
  }
}
```

编译后：

```css
.error {
  border: #f00 solid;
  background-color: #fdd;
}
.error--serious {
  border-width: 3px;
}
```

使用 `@extend` 继承：

```scss
.error {
  border: #f00 solid;
  background-color: #fdd;

  &--serious {
    @extend .error;
    border-width: 3px;
  }
}
```

编译后：

```css
.error,
.error--serious {
  border: #f00 solid;
  background-color: #fdd;
}
.error--serious {
  border-width: 3px;
}
```

继承后，生成了分组选择器，`.error` 和 `.error--serious` 共享相同的样式声明。

## BEM vs mixin vs extend

有如下两个按钮：

```html
<button class="button button--primary">primary按钮</button>
<button class="button button--warning">waring按钮</button>
<button class="btn--primary">primary按钮</button>
<button class="btn--warning">waring按钮</button>
<button class="btn-primary">primary按钮</button>
<button class="btn-warning">waring按钮</button>
```

分别使用 BEM、mixin 和 extend 来实现，看看它们的区别。

### BEM

```scss
.button {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  &--primary {
    background-color: $main-color;
    color: white;
    &:hover {
      background-color: color.adjust($main-color, $lightness: -10%);
    }
  }
  &--warning {
    background-color: orange;
    color: white;
    &:hover {
      background-color: color.adjust(orange, $lightness: -10%);
    }
  }
}
```

编译后：

```css
.button {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.button--primary {
  background-color: #3498db;
  color: white;
}
.button--primary:hover {
  background-color: rgb(33.1380753138, 125.1882845188, 186.8619246862);
}
.button--warning {
  background-color: orange;
  color: white;
}
.button--warning:hover {
  background-color: #cc8400;
}
```

### mixin

```scss
@mixin button($p-y: 6px, $p-x: 10px) {
  padding: $p-y $p-x;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.btn--primary {
  @include button();
  background-color: $main-color;
  color: white;
  &:hover {
    background-color: color.adjust($main-color, $lightness: -10%);
  }
}

.btn--warning {
  @include button();
  background-color: orange;
  color: white;
  &:hover {
    background-color: color.adjust(orange, $lightness: -10%);
  }
}
```

编译后：

```css
.btn--primary {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: #3498db;
  color: white;
}
.btn--primary:hover {
  background-color: rgb(33.1380753138, 125.1882845188, 186.8619246862);
}

.btn--warning {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: orange;
  color: white;
}
.btn--warning:hover {
  background-color: #cc8400;
}
```

mixin 是在不同的选择器中复制样式规则，编译后每个选择器都有一份样式规则，非常适合重置组件库的样式。

### extend

```scss
.btn {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  @extend .btn;
  background-color: $main-color;
  color: white;
  &:hover {
    background-color: color.adjust($main-color, $lightness: -10%);
  }
}

.btn-warning {
  @extend .btn;
  background-color: orange;
  color: white;
  &:hover {
    background-color: color.adjust(orange, $lightness: -10%);
  }
}
```

编译后：

```css
.btn,
.btn-warning,
.btn-primary {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}
.btn-primary:hover {
  background-color: rgb(33.1380753138, 125.1882845188, 186.8619246862);
}

.btn-warning {
  background-color: orange;
  color: white;
}
.btn-warning:hover {
  background-color: #cc8400;
}
```

extend 容易产生冗余的分组选择器，比如：

```scss
.btn {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  span {
    color: red;
  }
}

.btn-primary {
  @extend .btn;
  background-color: $main-color;
  color: white;
  &:hover {
    background-color: color.adjust($main-color, $lightness: -10%);
  }
}

.btn-warning {
  @extend .btn;
  background-color: orange;
  color: white;
  &:hover {
    background-color: color.adjust(orange, $lightness: -10%);
  }
}
```

编译后：

```css
.btn,
.btn-warning,
.btn-primary {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.btn span,
.btn-warning span,
.btn-primary span {
  color: red;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}
.btn-primary:hover {
  background-color: rgb(33.1380753138, 125.1882845188, 186.8619246862);
}

.btn-warning {
  background-color: orange;
  color: white;
}
.btn-warning:hover {
  background-color: #cc8400;
}
```

html 中只使用到了 `.btn-primary` 和 `.btn-warning`， `.btn` 是冗余的。

`%placeholder` +`@extends` 可减少编译后的分组选择器冗余：

```scss
%btn {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  span {
    color: red;
  }
}

.btn-primary {
  @extend %btn;
  background-color: $main-color;
  color: white;
  &:hover {
    background-color: color.adjust($main-color, $lightness: -10%);
  }
}

.btn-warning {
  @extend %btn;
  background-color: orange;
  color: white;
  &:hover {
    background-color: color.adjust(orange, $lightness: -10%);
  }
}
```

编译后：

```css
.btn-warning,
.btn-primary {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.btn-warning span,
.btn-primary span {
  color: red;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}
.btn-primary:hover {
  background-color: rgb(33.1380753138, 125.1882845188, 186.8619246862);
}

.btn-warning {
  background-color: orange;
  color: white;
}
.btn-warning:hover {
  background-color: #cc8400;
}
```

分组选择器只包含 `.btn-warning` 和 `.btn-primary`，没有冗余的 `.btn`。

extend 是把具有相同样式声明的选择器提取出来，使用**分组选择器共享样式声明**，是结构上的复用。当选择器对应的样式声明分散在多个地方时，非常容易冲突且不易确定来源，不易调试，因此不可以滥用。

### 比较

通过比较发现，总结如下：

|          | BEM                    | mixin                                                   | extend                         |
| -------- | ---------------------- | ------------------------------------------------------- | ------------------------------ |
| 可读性   | 高                     | 中                                                      | 低，容易产生多余的分组         |
| 复用级别 | 样式规则，通过类名复用 | 样式规则                                                | 样式规则，通过类名复用         |
| 使用场景 | 适合复杂的组件         | 不同的选择器具有相同的**样式规则** ，**重置组件库样式** | 不同的选择器具有相同的样式规则 |
| 冗余程度 | 几乎没有冗余           | 规则冗余，混入的样式规则都会被复制一份                  | 选择器冗余                     |
| 实践难度 | 较难，不好区分B E M    | 较简单                                                  | 较简单                         |

### 小结

- BEM 适合复杂的组件，具有较高的可读性和复用性，常用于开发组件库。
- mixin 适合不同的选择器应用相同的样式规则，使用简单，不易冲突，方便调试，但会有样式规则的冗余。
- extend 适合不同的选择器具有相同的样式规则，通过类名复用样式规则，容易冲突，不易调试。
- 使用 `%placeholder` + `@extends` 可以减少编译后的分组选择器冗余。
