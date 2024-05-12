# vue 高级组件设计
01. 受控组件

02. 自定义的受控组件

03. 使用第三方库封装组件

04. 封装行为--全局事件

使用 ref 自动聚焦；

在 watch 里聚焦；

nextTick 里聚焦，tabIndex 进行导航，这个实现复杂了，同时不希望用户看到聚焦 而是秘密聚焦。

在 created hook 里监听按下 esc 键，实现关闭 modal，在 destroy 里清除事件监听 ，缺点，将事件处理器添加到响应式对象上，但是不希望这个函数时响应式的。

使用 ths.$once('hook:destroyed') + 局部变量 解决

[动态使用生命钩子](https://www.digitalocean.com/community/tutorials/vuejs-component-event-hooks)

06. 封装行为--操作 DOM

07. 封装行为--瞬移组件

08. 重用瞬移组件

9. 

10. vue3 中复用 props 的方法

```js
// Overlay.js
export default {
  name: 'Overlay',
  props: {
    name: String,
    age: Number,
    address: String,
  },
  setup(props, {
    expose
  }) {
    const innerName = ref('hello');
    expose({
      name: innerName,
    });
    return {
      name: props.name,
      age: props.age,
      address: props.address,
    };
  },
};
// Dialog.vue
```

```html
<script setup>
  import Overlay from './Overlay';
  export default {
    name: 'Dialog',
    props: {
      ...Overlay.props,
      // other props
    },
    setup(props, context) {
      const overlay = Overlay.setup(props, context);
      const hello = ref('hello Dialog');
      return {
        ...overlay,
        hello,
      }
    }
  }
</script>
```

> 这是一一种类似于 mixin 的方式，但是更加灵活，可以更加细粒度的控制 props 的复用。

## 自定义元素

https://maximomussini.com/posts/vue-custom-elements

https://zyszys.github.io/vue-patterns-cn/patterns/

https://github.com/guitarbien/advanced-vue-component-design

https://blog.q-bit.me/an-introduction-to-vue-3-typescript-functional-components-attrs-and-slots/
