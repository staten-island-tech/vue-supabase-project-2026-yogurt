<script setup>
import { usePlayerstore } from './state';
import { onMounted } from 'vue';
const store = usePlayerstore()

onMounted(async () => {
  await store.getAllPlayers()
})
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
