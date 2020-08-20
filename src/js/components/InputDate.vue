<template>
  <div>
    <label class="font-bold mb-1 text-gray-700 block">{{label}}</label>
    <input
      type="date"
      v-model="selectedDate"
      @input="event => { $emit('input', event.target.value) }"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

interface Option {
  id: number;
  name: string;
}

@Component
export default class InputSelect extends Vue {
  @Prop() value!: string
  @Prop() label!: string

  public selectedDate: string | null = null

  mounted() {
    this.selectedDate = this.value
  }

  @Watch('value')
  onValChanged(val: string) {
    this.selectedDate = val
  }
}
</script>

<style scoped>

</style>
