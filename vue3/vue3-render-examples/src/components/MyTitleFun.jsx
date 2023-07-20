const MyTitleFun = (props, { slots, emit, attrs }) => {
  console.log(attrs)
  console.log(slots)
  const onClick = () => {
    emit('my-click', Math.random().toString(36))
  }
  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={onClick}>点击</button>
      {slots?.default()}
      <p>attrs.id {attrs.id}</p>
    </div>
  )
}

MyTitleFun.props = {
  title: {
    type: String,
    required: true,
  },
}
// NOTE 使用函数定义函数式组件可明确地声明事件
MyTitleFun.emits = ['my-click']

export default MyTitleFun
