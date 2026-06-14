<script setup>
import { usePlayerstore } from './state';
import { onMounted } from 'vue';
const store = usePlayerstore()

onMounted(async () => {
  await store.getAllPlayers()
  await store.loadUserData()
})

setInterval(()=>{
  if(store.dimes < 100){
    store.dimes += 5
  }
}, 1000)
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
