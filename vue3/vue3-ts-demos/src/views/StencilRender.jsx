import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: ['personArray'],
  setup(props) {
    // console.log('props')
    // console.log(props)
    const person = ref({ name: 'jack' })
    function ratingChange({ detail }) {
      console.log('ratingChange', detail)
    }
    return { person, ratingChange }
  },
  render() {
    console.log('this.personArray')
    console.log(this.personArray)
    console.log('this.person')
    console.log(this.person)
    // BUG 监听不到事件
    return (
      <div>
        <h1>render my-rating</h1>
        <my-rating
          max-value={15}
          value={5}
          is-show
          person={this.person}
          onRatingChange={this.ratingChange}
          personArray={this.personArray}
          onRatingChange={this.ratingChange}
        />
      </div>
    )
  },
})
