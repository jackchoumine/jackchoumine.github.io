# 再学跨域（三） -- HTML标签上的跨域

前两篇文章我们讲了同源策略和和CORS，这篇文章我们来讲一下 HTML 标签上的跨域。

默认情况下，一些 html 标签不受同源策略的限制，比如 `<img>` 、 `<link>` 、 `<script>` 、 `<iframe>` 、 `<audio>` 、 `<video>` 等标签。

当它们跨域请求资源时，会受到一些限制，比如不能**读取**资源的内容，不能**读取**资源的错误信息等。

crossorigin 属性在 `<audio>` 、 `<img>` 、 `<link>` 、 `<script>` 、 `iframe` 和 `<video>` 元素中有效，它们提供对 CORS 的支持， crossorigin 定义该元素如何处理跨源请求，从而实现对该元素获取数据的 CORS 请求的配置。

crossorigin 属性有三个值：

* anonymous：不发送用户凭据（如 cookie 或 HTTP 认证信息）。
* 空字符串：不发送任何凭据。
* use-credentials：发送用户凭据（如 cookie 或 HTTP 认证信息）。

```html
<img src="http://example.com/image.png"> <!-- 默认值，不启用跨域 即请求头中不含 origin -->
<!-- 启用用跨域，即请求头中含有 origin -->
<img src="http://example.com/image.png" crossorigin="anonymous"> <!-- 不发送用户凭据 -->
<img src="http://example.com/image.png" crossorigin=""> <!-- 不发送任何凭据 -->
<img src="http://example.com/image.png" crossorigin="use-credentials"> <!-- 发送用户凭据 -->
```

## html 标签加载第三方资源时的安全问题

加载第三方资源不受同源策略的限制，但是会有一些安全问题。

比如第三方脚本能访问本网站的错误信息和 cookie，这样就会泄露一些敏感信息。

为了应对这些问题，我们可以使用 crossorigin 属性来限制第三方资源的访问。

在 img 标签上使用 crossorigin 属性，允许来自第三方的图片与 canvas 一起使用。

[purpose-of-the-crossorigin-attribute -- 问题回答](https://stackoverflow.com/a/18336863/6524962)

## 服务器不支持跨域，加上 crossorigin 会怎样？

会报错跨域错误。

```html
<img src="https://www.baidu.com/img/bd_logo1.png" alt="百度logo，不支持跨域" crossorigin="anonymous" width="100" height="100" />
```

百度的图片服务器不支持跨域，所以会报错：

```bash
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 跨域的资源不启用跨域请求时，对 JS 读写的限制是什么？

| 元素| 限制|
| --- | --- |
|img、audio、video|	当资源被放置在 `<canvas>` 中时，元素会标记为被污染的。|
|script	|对错误日志 window.onerror 的访问将会被限制。|

### img 跨域读取限制

同源的图片，对写入 canvas 和读取操作是没有限制的。跨域的图片，对js读取是有限制的。

在"被污染"的 canvas 中调用以下方法将会抛出安全错误：

* 在 canvas 的上下文上调用 getImageData()；
* 在 `<canvas>` 元素本身调用 toBlob()、toDataURL() 或 captureStream()。

主要关注跨域的情况，对于同源的图片，没有限制。

|服务器支持跨域|crossorigin 属性|读取|写入|
|---|---|---|---|
|否|不设置|不报错|报错|
|否|设置|报错|报错|
|是|不设置|报错|不报错|
|是|设置|不报错|不报错|

图片跨之后为了不报错，解决方案是：

> 服务器开启图片跨域访问和在 img 标签上加上 crossorigin 属性。

以上情况可通过下面的函数来验证：

```js
/**
 * @Author: ZhouQiJun
 * @Description: 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信: MasonChou123，进技术交流群
 */
function draw(src, crossOrigin) {
  // 页面上的 canvas 元素
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  var img = new Image()
  if (typeof crossOrigin !== 'undefined') {
    img.crossOrigin = crossOrigin
  }
  img.src = src
  img.addEventListener('load', function() {
    canvas.width = img.width
    canvas.height = img.height
    canvas.innerText = '加载成功'
    context.drawImage(img, 40, 40)
    console.log('img', img)
    localStorage.setItem('img', canvas.toDataURL('image/png'))
  })
}
```

### script 跨域读取限制

script 是否开启跨域访问，主要影响的加载脚本的页面是否有权限访问**跨域脚本**的错误信息。

|服务器支持跨域|crossorigin 属性|能否读取跨域脚本的错误信息|
|---|---|---|
|否|不设置|不能，只有 `Script error` |
|否|设置|报跨域错误 |
|是|不设置|不能，只有 `Script error` |
|是|设置|能读取具体信息 |

> 这个属性的使用场景：

当产品以 JS SDK 的形式通过 CDN 提供给第三方使用时，为了不让第三方看到错误信息，在服务器就不开启跨域。

这是脚本的提供方控制的，而不是使用方控制的，使用方可通过 `SameSite=Strict` 或者 `SameSite=Lax` 来控制 cookie 不被跨域脚本读取。

crossorigin 是无法限制跨域的脚本获取本网站的错误信息的，也是无法限制使用脚本的人进行 debug 的。

## 小结

* html 标签不受同源策略的限制，但是会有一些安全问题。
* crossorigin 属性在 `<audio>` 、 `<img>` 、 `<link>` 、 `<script>` 、 `iframe` 和 `<video>` 元素中有效，它们提供对 CORS 的支持， crossorigin 定义该元素如何处理跨源请求，从而实现对该元素获取数据的 CORS 请求的配置。
* 服务器不支持跨域，加上 crossorigin 会报错跨域错误。
* 跨域的资源不启用跨域请求时，对 JS 读写的限制是：img、audio、video 元素在被放置在 `<canvas>` 中时，元素会标记为被污染的；script 对错误日志 window.onerror 的访问将会被限制。
* 图片跨域后，为了不报错，解决方案是：服务器开启图片跨域访问和在 img 标签上加上 crossorigin 属性。
* script 是否开启跨域访问，主要影响的加载脚本的页面是否有权限访问**跨域脚本**的错误信息。
* crossorigin 是无法限制跨域的脚本获取本网站的错误信息的，也无法限制使用脚本的人进行 debug。
