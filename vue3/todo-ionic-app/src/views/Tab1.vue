<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>title--todo list</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 一</ion-title>
        </ion-toolbar>
      </ion-header> -->

      <ion-list>
        <ion-item :key="todo.id" v-for="todo in todosRef">
          <ion-label>{{ todo.content }}</ion-label>
        </ion-item>
           <p>{{msg}}</p>
      </ion-list>
      <ion-footer>
        <ion-toolbar>
          <ion-input placeholder="Enter Item"  v-model="inputState"></ion-input>
          <ion-button slot="end" @click="addTodo">Add</ion-button>
        </ion-toolbar>
      </ion-footer>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">

export default {
  name: 'Tab1',
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { IonPage, IonFooter, IonButton, IonInput, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

const todos = [
  { id: 1, content: "Do the laundry" },
  { id: 2, content: "Buy Christmas gifts" },
  { id: 3, content: "Spellcheck my draft" },
]
const inputState= ref('')
function addTodo() {
  if(!inputState.value||todosRef.value.find(item=>inputState.value===item.content)) return

  todosRef.value.push({
    id: todos.length + 1,
    content:inputState.value,
  })
  inputState.value = ''
}
const todosRef = ref(todos)
const msg = ref('hello')
onMounted(() => {
  changeState()
  msg.value = 'world'
})
function changeState(){
  msg.value = 'Niha'
}
</script>