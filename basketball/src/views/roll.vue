<template>
  <div class="flex flex-row">
    <card v-if="current"
      class="w-50 h-100 bg-gray-200 rounded-2xl mr-10"
      :name="`${current.name}`"
      :img="'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254'"
      :overall="99"
    ></card>
  </div>
  <button @click="randomNumber">Roll</button>
</template>

<script setup>
import { ref } from 'vue'
import card from '@/components/card.vue'
import { usePlayerstore } from '@/state'
const store = usePlayerstore()

const current = ref()
async function randomNumber() {
  console.log(store.allPlayerCount)
  const id = Math.floor(Math.random() * store.allPlayerCount)
  console.log(await store.getPlayer(id))
  current.value = await store.getPlayer(id)
}
</script>

<style scoped></style>
