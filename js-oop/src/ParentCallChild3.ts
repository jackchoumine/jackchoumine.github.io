/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-09-17 11:18:08
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-09-17 14:33:44
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
// 向父类注入子类实例，父类调用子类实例方法。
// 注入方式：构造函数注入、方法参数注入、
interface IStrategy {
  execute(): void
}

class Parent {
  private strategy: IStrategy
  protected name: string
  constructor(strategy: IStrategy, name: string) {
    this.name = name
    this.strategy = strategy
  }

  public executeProcess(): void {
    console.log('父类准备执行')
    this.strategy.execute() // 调用注入的策略
    console.log('父类执行完成')
  }
}

class ChildStrategy implements IStrategy {
  public execute(): void {
    console.log('子类策略的具体执行')
    this.childOnlyLogic()
  }

  private childOnlyLogic(): void {
    console.log('子类独有的逻辑')
  }
}

class Child extends Parent {
  protected name: string
  protected age: number
  constructor(strategy: IStrategy, name: string, age: number) {
    super(strategy, name)
    this.age = age
    this.name = name
  }
  public executeProcess() {
    console.log('子类方法 executeProcess', {
      name: this.name,
      age: this.age,
    })
  }
}

// 使用
const strategy = new ChildStrategy()
const parent = new Parent(strategy, 'parent')
parent.executeProcess()

const child = new Child(strategy, 'child', 30)
child.executeProcess()
