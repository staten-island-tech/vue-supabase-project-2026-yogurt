<template>
  <div class="flex flex-row">
    <card
      class="w-50 h-100 bg-gray-200 rounded-2xl mr-10"
      :name="'lebron'"
      :img="'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254'"
      :overall="99"
    ></card>
  </div>
  <button @click="randomNumber">Roll</button>
</template>

<script setup>
import { ref } from 'vue'
import card from '@/components/card.vue'
import { getPlayer } from '@/state'

async function randomNumber() {
  const id = Math.floor(Math.random() * 3000)
  console.log(await getPlayer(id))
}
</script>

<style scoped></style>
