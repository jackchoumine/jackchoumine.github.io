/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-02 21:48:39
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-02 23:22:12
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
function DomCheck() {
  return (
    <div>
      <div aria-label="empty_note"></div>
      <div role="note" style={{ display: 'none' }} aria-hidden>
        1234
      </div>
      <div className="hidden" style={{ visibility: 'hidden' }}>
        1234
      </div>
      <div role="note">1234</div>
    </div>
  )
}

export default DomCheck
