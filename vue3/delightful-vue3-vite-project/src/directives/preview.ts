/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-27 02:45:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-27 02:45:14
 * @Description : 图片预览指令
 */
export default {
  mounted(el) {
    el.addEventListener('mouseenter', e => {
      const img = e.target
      const src = img.src
      const parent = img.closest('.img-preview-container')
      parent.style.position = 'relative'
      const preview = document.createElement('div')
      preview.style.position = 'absolute'
      preview.style.top = '0px'
      preview.style.left = '0px'
      preview.style.background = 'url(' + src + ') no-repeat center center'
      preview.style.backgroundSize = 'contain'
      preview.style.width = '100%'
      preview.style.height = '100%'
      parent.append(preview)
    })
    el.addEventListener('mouseleave', e => {
      const parent = e.target.closest('.img-preview-container')
      parent.style.position = ''
      const preview = parent.querySelector('div')
      preview.remove()
    })
  },
}
