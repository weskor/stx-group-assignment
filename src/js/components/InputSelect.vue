<template>
  <div>
    <label class="font-bold mb-1 text-gray-700 block">{{label}}</label>
    <select
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
      v-model="selectedOption"
      @input="event => { $emit('input', event.target.value) }">
      <option v-for="option in options" v-bind:value="option.id" v-bind:key="option.id">
        {{ option.name }}
      </option>
    </select>
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
  @Prop({ type: Array, required: true }) options!: Option[]

  public selectedOption: null | number = null

  mounted() {
    this.selectedOption = this.value
  }

  @Watch('value')
  onValChanged(val: number) {
    this.selectedOption = val
  }
}
</script>

<style scoped>

</style>
