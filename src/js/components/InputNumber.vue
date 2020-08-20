<template>
  <div>
    <label class="font-bold mb-1 text-gray-700 block">{{label}}</label>
    <input
      type="number"
      :placeholder="placeholder"
      v-model="inputValue"
      @input="event => { $emit('input', event.target.value) }"
      @blur="$emit('blur', $event.target.value)"
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
  @Prop() value!: number
  @Prop() label!: string
  @Prop() placeholder!: string

  public inputValue: number | null = null

  mounted() {
    this.inputValue = this.value
  }

  @Watch('value')
  onValChanged(val: number) {
    this.inputValue = val
  }
}
</script>

<style scoped>

</style>
