/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-09-17 11:10:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-09-17 11:12:46
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
// 抽象方法模式
abstract class Parent {
  // 公共方法，定义了算法骨架
  public templateMethod(): void {
    console.log('父类通用逻辑 - 开始')
    this.childSpecificMethod() // 调用子类必须实现的方法
    console.log('父类通用逻辑 - 结束')
  }

  // 抽象方法，子类必须实现
  protected abstract childSpecificMethod(): void
}

class Child extends Parent {
  // 实现父类要求的抽象方法
  protected childSpecificMethod(): void {
    console.log('子类的具体实现')
  }

  // 子类独有的其他方法
  public childOnlyMethod(): void {
    console.log('只有子类有的方法')
  }
}

// 使用
const child = new Child()
child.templateMethod()
// 输出：
// 父类通用逻辑 - 开始
// 子类的具体实现
// 父类通用逻辑 - 结束
