/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-19 11:53:30
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-19 11:55:52
 * @Description :
 */
import React from 'react'

export default class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.childRef = React.createRef()
  }
  handleClick = () => {
    this.childRef.current.method(Math.random())
  }
  render() {
    return (
      <div>
        <Child ref={this.childRef} />
        <button onClick={this.handleClick}>Click</button>
      </div>
    )
  }
}

class Child extends React.Component {
  method(num) {
    console.log('I am method in Child', num)
  }
  render() {
    return <div>I am Child</div>
  }
}
