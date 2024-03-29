# 如何选择技术栈？

很多时候，程序员不知道现有的库能解决他们的问题，就自己造轮子，但很可能造出一个方的轮子 -- 问题轮子。又或者，他们不熟悉周边库的使用技巧，写出难以阅读的代码。

了解常用的周边库，掌握使用技巧，是很有必要的。常用的库，经过社区千锤百炼，不太可能出现大问题，能帮你又快又好的解决问题。

## 如何选择你使用的库？或者如何做技术选型？

选择一个框架或者库时，应该注意哪些问题？

这些因素对决策的影响程度依次降低。

00. 是否安全

存在严重安全漏洞吗？ 出现了，是否有代替方案？

01. 是否允许商用

软件许可证是什么？商用版贵吗？公司是否有预算？

02. 是否有被制裁的风险

被制裁了，有低成本的代替方案吗？

03. 库维护是否活跃

不活跃，意味着出现问题，没人修复，如果是安全问题，就更加麻烦了。

04. 文档是否完善

没有完善使用文档，意味着你的团队成员不好上手。

05. 周边生态是否壮大

周边生态壮大，意味着你能找到围绕库或者框架的解决方案。

06. 社区支持是否好

比如在 `stackOverflow` 的问题和回答是否多，多就意味着，使用广泛，你遇到问题，有解决办法。

问题数量趋势如何？是在逐渐增加还是逐渐减少？逐渐增加意味着是未来的趋势，文档、周边生态等会越来越完善，你的项目一旦采用，未来几年不会换技术。

在 github 上的 issue 解决是否及时等。

> 从库的**下载量**、**问答社区的问题数量**、**最后一个版本的发布时间**和**issue 数量**，大致能反映一个库的质量。

07. 升级是否稳定

升级不稳定，很可能给你的项目带来很多问题。

08. 学习难度是否大

学习难度越大，意味着你在团队里推广越困难，团队成员抵触，然后拉低开发效率。

09. 是否需要支持低版本浏览器和移动端浏览器

10. 依赖多吗，包有多大？

## 前端常用库推荐

<!-- TODO 待总结 -->

### 数据处理

库|功能|显著特性|中文文档|类似的库
-----|-----|-----|----|-----
[dayjs](https://github.com/iamkun/dayjs/)|处理日期|轻便、API友好|[dayjs](https://day.js.org/zh-CN/)| `date-fns` 、 `fecha` |
[Numeral.js](https://github.com/adamwdraper/Numeral-js)|数值格式化|轻便、API友好|无| `accounting.js` |
[lodash](https://github.com/lodash/lodash)|函数式数据处理工具库，体积比较大|性能卓越，模块化设计|[lodash](https://www.lodashjs.com/)| `lodash-es` ，采用ES6，体积小 `underscore.js` |
|[number-precision](https://github.com/nefe/number-precision)|数值计算|小|无| `big.js` 、 `math.js` |
|[qs](https://github.com/ljharb/qs)|处理查询字符串|小，api友好|无| |
|[voca](https://github.com/panzerdp/voca)|处理字符串|小，api友好|无| |
|[chance](https://github.com/chancejs/chancejs)|生成随机字符串内容|小，api友好|无| `UUID` 、 `nanoid` |
|[validator.js](https://github.com/validatorjs/validator.js)|数据验证|小，api友好|无| `validate.js` 、 `vest` |

### 文件处理

库|功能|显著特性|中文文档|类似的库
-----|-----|-----|-----|---
[videojs](https://github.com/videojs/video.js)|播放视频|支持HTML5和flash|[中文文档](https://gitcode.gitcode.host/docs-cn/video.js-docs-cn/index.html)| `plyr` 、 `mediaElement.js` 、 `howler.js` |
[pdf.js](https://github.com/mozilla/pdf.js)|处理PDF| 使用广泛 | `jsPDF` 、 `pdfmake` 、 `pdf-lib` 、 `pdfkit` 、 `react-pdf` |
[file-saver](https://github.com/mozilla/pdf.js)|浏览器大文件存储| 流式处理| | `StreamSaver.js` |
[sheetjs](https://github.com/SheetJS/sheetjs)|处理Excel| 使用广泛| | `js-xlsx` 、 `handsontable` 、 `ag-grid` |
[cropperjs](https://github.com/fengyuanchen/cropperjs)|图片剪切| 功能强大| | `sharp` 、 `tui.image-editor` 、 `compressorjs` 、 `viewerjs` |
[uppy](https://github.com/transloadit/uppy)|文件上传|速度快，api友好| | `filepond` 、 `dropzone` 、 `uppload` |
[JSZip](https://github.com/Stuk/jszip)|读取编辑zip|api友好| |  |
[PapaParse](https://github.com/mholt/PapaParse)|快速而强大的 CSV（分隔文本）解析器|api友好| |  |

### 网络请求

库|功能|显著特性|中文文档|类似的库
-----|-----|-----|-----|---
[axios](https://github.com/axios/axios)|基于promise的xhr请求库| 使用广泛 |[axios](https://www.axios-http.cn/)| `superagent` 、 `fly.js` |

### cookie

库|功能|显著特性|中文文档|类似的库
-----|-----|-----|-----|---
[js-cookie](https://github.com/js-cookie/js-cookie)|处理cookie| 小、API 友好 |[js-cookie](https://github.com/js-cookie/js-cookie)| `cookies` |

### 动画处理

库|功能|显著特性|中文文档|类似的库
-----|-----|-----|-----|---
[animejs](https://github.com/juliangarnier/anime)|处理动画| 轻量强大 ||
[swiper](https://github.com/nolimits4web/swiper)|轮播动画| 轻量强大 |[swiper](https://www.swiper.com.cn/)||

### DOM 加强

库|功能|显著特性|中文文档|类似的库
-----|-----|-----|----|-----
[bounds.js](https://github.com/ChrisCavs/bounds.js)|异步监测DOM边界，方便实现延迟加载、无限滚动等功能|api友好|无|
[daterangepicker](https://github.com/dangrossman/daterangepicker)|日期选择|api友好|无
[hoverintent](https://github.com/tristen/hoverintent)|可设置停留时间的hover事件加强|体积小，api友好|无
[html2canvas](https://github.com/niklasvh/html2canvas)|把HTML转成canvas|体积小，api友好||
[DOMPurify](https://github.com/cure53/DOMPurify)|DOM净化工具|体积小，api友好||
[diff2html](https://github.com/rtfpessoa/diff2html)|将 Git diff 或 SVN diff 转换为漂亮的 HTML 格式|||

### 浏览器特性检测

这类库用于判断浏览器信息。

库|功能|显著特性|中文文档|类似的库
-----|-----|-----|----|-----
|[bowser.js](https://github.com/lancedikson/bowser)|判断浏览器信息|模块化设计|无||
|[broprint.js](https://github.com/Rajesh-Royal/Broprint.js)|生成浏览器ID|api友好|无||

> 浏览器指纹：浏览器的唯一标识，可用于识别用户登录的浏览器设备。

### CSS

库|功能|显著特性|中文文档|类似的库

参考：

## 参考

[选择 npm 时，应考虑的 5 个事项](https://www.arryblog.com/guide/es6/npm-selection.html#_1%E3%80%81%E6%A3%80%E6%9F%A5%E5%BC%80%E6%BA%90%E8%AE%B8%E5%8F%AF%E8%AF%81-license)

[如何快速找到一个合适的 npm 库](https://shanyue.tech/frontend-engineering/quick-find-npm.html)

[9 Device Fingerprinting Solutions for Developers](https://blog.castle.io/9-device-fingerprinting-solutions-for-developers/)
