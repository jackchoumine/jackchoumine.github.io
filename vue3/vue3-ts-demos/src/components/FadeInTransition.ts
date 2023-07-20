import { h, SetupContext } from 'vue'
import './FadeInTransition.scss'
const FadeIn = (props: { [key: string]: unknown; }, context: SetupContext) => {
  return h(`transition`, { name: 'fade', ...props, ...context.attrs }, context.slots)
}
FadeIn.props = {
  appear: Boolean,
}
export default FadeIn
