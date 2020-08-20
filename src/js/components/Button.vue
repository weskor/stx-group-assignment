<template>
  <div>
    <button
      class="button focus:outline-none focus:shadow-outline hover:bg-blue-700" type="button"
      @click="onClick">
        <slot/>
      </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    onClick: Function
  }
})
</script>

<style lang="postcss" scoped>
  .button {
    @apply bg-blue-500 text-white font-bold py-2 px-4 rounded
  }
</style>
