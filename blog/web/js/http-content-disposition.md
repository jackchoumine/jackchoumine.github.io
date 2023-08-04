# 更加优雅的下载文件 --- http header Content-Disposition 学习

Content-Disposition 在响应头中，告诉浏览器如何处理返回的内容，在表单提交中，说明表单字段信息。

## 在响应头中

用在响应头中，告诉浏览器如何处理返回的内容。

```bash
'Content-Disposition': 'inline'
```

预览，返回的内容替换当前页面，可使用 `a` 标签的 `target="_blank"` 打开新标签。

```bash
'Content-Disposition': 'attachment'
```

下载，使用 a 访问，会把**路径**作为名字，文件后缀名浏览器自动识别。

```bash
'Content-Disposition': 'attachment;filename=filename'
```

下载，接口指定文件名字。

> 文件名含有中文，使用 `encodeURIComponent` 编码，否则报错。

Invalid character in header content ["Content-Disposition"]。

## 在请求头中

页面上有表单，并且我们选择的表单提交方式为 `multipart/form-data` 时， `Content-Disposition ` 会出现在请求体中。

可能会这样出现：

```bash
Content-Disposition: form-data
Content-Disposition: form-data; name="fieldName"
Content-Disposition: form-data; name="fieldName"; filename="filename.jpg"
```

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/form-data-content-disposition.jpg)

[实例代码](https://github.com/jackchoumine/crud-node)

## a 标签的 download 属性

`download` 属性是 `a` 标签的属性，用于指定下载或者指定文件的名字。

```html
<!-- 下载 -->
<a href="http://localhost:3000/download" download>download</a>
<!-- 下载且指定名字 -->
<a href="http://localhost:3000/download" download="filename">download</a>
```

download 用于指定名字，如果不指定，浏览器会使用路径的最后一部分作为文件名。

```JS
/**
 * 从链接下载文件
 * @param {string} fileId 文件 id
 * @param {string} fileName 文件名，默认为 ''
 * @param {string} path 文件下载路径，默认为 FILE_PATH
 * @example downloadFile('123', '文件名') // 下载 文件名.docx
 * @example downloadFile('docFile') // 下载 docFile.docx
 * @example downloadFile('docFile','file-name','download/path') // 下载 docFile.docx
 */
export function downloadFile(fileId, fileName = '', path = FILE_PATH) {
  if (!fileId) return
  const dotIndex = fileName.lastIndexOf('.')
  const name = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName
  const dateName = dayjs().format('YYYY年MM月DD日HH时mm分ss秒')
  const a = document.createElement('a')
  a.setAttribute('download', name || dateName)
  a.href = `${path}/${fileId}?fileName=${fileName}`
  a.click()
  a.remove()
}
```

指定文件名字成功的两个条件：

* 同源
* 而且，接口**没设置** `Content-Disposition` 的 `filename` 属性

## 小结

* `Content-Disposition` 用于告诉浏览器如何处理返回的内容，用在响应头中，可用于下载文件。
* `a`标签用于的 download 属性用于下载文件，同源，且接口没设置 `Content-Disposition` 的 `filename` 属性才能指定文件名字。
