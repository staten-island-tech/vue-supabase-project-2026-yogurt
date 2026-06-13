<template>
  <div>
    <h2 class="text-lg font-bold text-gray-800 mb-2">{{ name }}</h2>
    <div class="flex flex-row gap-2 overflow-x-auto pb-2">
      <div v-for="(pos, index) in ['PG', 'SG', 'SF', 'PF', 'C']" :key="pos" class="flex flex-col items-center gap-1 shrink-0">
        <span class="text-xs font-bold text-gray-600">{{ pos }}</span>
        <card
          v-if="team[index]"
          :name="team[index].name"
          :img="team[index].playerImage"
          :overall="team[index].overall"
          :pos="team[index].positions.toString()">
        </card>
        <div v-else class="w-16 h-24 md:w-24 md:h-36 bg-gray-300 rounded-2xl flex items-center justify-center shadow">
          <span class="text-3xl text-gray-400 font-light">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import card from '@/components/card.vue'

const props = defineProps({
  name: { type: String },
  team: { type: Array }
})
</script>

<style scoped>

</style>