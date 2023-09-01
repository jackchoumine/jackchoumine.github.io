import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Counter from './Counter.vue'

describe('Counter.vue', () => {
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
