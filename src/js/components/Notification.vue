<template>
  <div
    class="border-l-4 p-4"
    role="alert"
    v-bind:class="notificationStyle">
    <p class="font-bold">{{title}}</p>
    <ul class="list-disc ml-6">
      <li v-for="(message, index) in messagesList" :key="index">{{message}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

type NotificationType = 'error' | 'success'

@Component
export default class Notification extends Vue {
  @Prop() messages!: []
  @Prop({ required: true }) title!: string
  @Prop({ default: 'error' }) notificationType!: NotificationType

  get messagesList() {
    return this.messages
  }

  get notificationStyle() {
    return this.notificationType === 'error'
      ? 'bg-orange-100 border-orange-500 text-orange-700'
      : 'bg-green-100 border-green-500 text-green-700'
  }
}
</script>
