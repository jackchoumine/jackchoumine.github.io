/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-02 23:31:38
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-02 23:33:17
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
export default function FormCheck() {
  return (
    <form>
      <label htmlFor="username">
        username
        <input type="text" name="username" disabled defaultValue="zhenmin" />
      </label>
      <label htmlFor="age">
        age
        <input type="number" name="age" defaultValue={23} required />
      </label>
      <label htmlFor="sex">
        sex
        <input type="radio" name="sex" value="man" defaultChecked />
        <input type="radio" name="sex" value="woman" />
      </label>
    </form>
  )
}
