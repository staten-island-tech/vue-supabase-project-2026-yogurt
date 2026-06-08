<template>
  <div class="flex flex-row">
    <card v-if="current"
      class="w-50 h-100 bg-gray-200 rounded-2xl mr-10"
      :name="`${current.name}`"
      :img="`${current.playerImage}`"
      :overall="current.overall"
    ></card>
  </div>
  <button v-if="store.allPlayerCount != 643">Loading...</button>
  <button v-if="store.allPlayerCount === 643" @click="randomNumber">Roll</button>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import card from '@/components/card.vue'
import { usePlayerstore } from '@/state'
const store = usePlayerstore()

onMounted(async ()=>{
  await store.getAllPlayers()
})
const current = ref()

async function randomNumber() {
  if(store.allPlayerCount === 643){
    const id = Math.floor(Math.random() * store.allPlayerCount)
    current.value = await store.getPlayer(null, id)
    console.log(current.value)
  }
}
</script>

<style scoped></style>
