import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Counter, { submitValidator } from './Counter.vue'

describe('Counter.vue', () => {
  describe('submitValidator', () => {
    it('throw error when count is not number', function () {
      const actual = () => submitValidator('1')

      expect(actual).toThrowError()
    })
    it('return true when count is number', function () {
      const actual = () => submitValidator(1)

      expect(actual).not.toThrowError()
      expect(actual()).toBe(true)
    })
  })
  it('emit with current count', async () => {
    const { getByRole, user, emitted } = setup(<Counter />)

    await user.click(getByRole('increment'))
    await user.click(getByRole('submit'))

    expect(emitted('submit')[0]).toEqual([1])
  })
})

function setup(component) {
  // console.log({ ...render(component) })
  const result = render(component)
  return {
    user: userEvent.setup(),
    ...result,
  }
}
