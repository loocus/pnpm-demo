<template>
  <span>{{ count }}</span>
</template>

<script setup lang="ts">
const count = ref(0)

defineExpose({
  count
})
</script>