<template>
  <div class="flex flex-row">
    <card
      class="w-50 h-100 bg-gray-200 rounded-2xl mr-10"
      :name="'lebron'"
      :img="'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254'"
      :overall="99"
    ></card>
  </div>
  <button @click="roll">Roll</button>
</template>

<script setup>
import { ref } from 'vue'
import card from '@/components/card.vue'
import { getPlayer } from '@/state'

async function roll() {
  console.log(await getPlayer(115))
  //console.log(getPlayer("lebron-james").data)
}
console.log(data) // array of players
</script>

<style scoped></style>
