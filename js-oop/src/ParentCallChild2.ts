/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-09-17 11:14:02
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-09-17 11:20:22
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
// 继承父类方法，同时覆写父类方法，子类调用自身方法时，间接调用继承方法，继承方法有又调用覆写的方法。
class Parent {
  public process(): void {
    console.log('标准处理流程')
    this.hookMethod() // 调用钩子方法
    console.log('流程结束')
  }

  // 钩子方法，提供默认实现 子类可重写
  protected hookMethod(): void {
    console.log('父类的默认钩子实现')
  }
}

class Child extends Parent {
  // 可选的重写钩子方法
  protected hookMethod(): void {
    console.log('子类重写的钩子实现')
    this.childSpecialMethod()
  }

  private childSpecialMethod(): void {
    console.log('子类特殊方法')
  }
}

// 使用
const child = new Child()
child.process()

//const parent = new Parent()
//parent.process()
