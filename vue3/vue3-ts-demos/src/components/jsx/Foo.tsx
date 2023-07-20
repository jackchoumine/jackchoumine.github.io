export interface Props<T> {
  data?: T[]
  keys?: keyof T
}
export const Foo = <T extends { a?: string }>(props: Props<T>) => {
  return <div {...props}></div>
}
