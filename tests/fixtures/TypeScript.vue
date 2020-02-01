<template>
  <div>TypeScript</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

interface Setup {
  msg: Ref<string>
}

export default defineComponent({
  name: 'TypeScript',

  setup(): Setup {
    return {
      msg: ref('msg')
    }
  }
})
</script>
