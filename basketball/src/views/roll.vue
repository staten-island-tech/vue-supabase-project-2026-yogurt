<template>
  <div class="bg-sky-300 min-h-screen flex flex-col md:flex-row">
    
    <div class="w-full md:w-1/4 flex flex-col items-center justify-center gap-4 p-6">
      <card v-if="current"
        class="w-full max-w-xs bg-white rounded-2xl shadow-lg p-4"
        :name="`${current.name}`"
        :img="`${current.playerImage}`"
        :overall="current.overall"
        :pos="current.positions.toString()"></card>

      <button 
        v-if="store.allPlayerCount != 643" 
        class="w-full max-w-xs bg-gray-300 text-gray-500 text-lg font-bold py-4 rounded-2xl text-center shadow-lg cursor-not-allowed"
        disabled>Loading...</button>

      <button 
        v-if="store.allPlayerCount === 643" 
        class="w-full max-w-xs cursor-pointer bg-red-400 hover:bg-red-500 text-white text-lg font-bold py-4 rounded-2xl text-center transition duration-200 shadow-lg"
        @click="randomNumber">Roll</button>

      <div v-if="rolled" class="flex gap-2 w-full max-w-xs">
        <button 
          class="flex-1 cursor-pointer bg-teal-400 hover:bg-teal-500 text-white text-sm font-bold py-3 rounded-2xl text-center transition duration-200 shadow-lg"
          @click="replace = 'team1'">Team 1</button>
        <button 
          class="flex-1 cursor-pointer bg-teal-400 hover:bg-teal-500 text-white text-sm font-bold py-3 rounded-2xl text-center transition duration-200 shadow-lg"
          @click="replace = 'team2'">Team 2</button>
        <button 
          class="flex-1 cursor-pointer bg-teal-400 hover:bg-teal-500 text-white text-sm font-bold py-3 rounded-2xl text-center transition duration-200 shadow-lg"
          @click="replace = 'team3'">Team 3</button>
      </div>

      <template v-if="replace">
        <button 
          class="w-full max-w-xs cursor-pointer bg-teal-400 hover:bg-teal-500 text-white text-lg font-bold py-3 rounded-2xl text-center transition duration-200 shadow-lg"
          v-for="pos in current.positions" :key="pos"
          @click="keep(pos)">Choose: {{ pos }}</button>
      </template>

      <RouterLink 
        to="/menu" 
        class="text-teal-700 hover:text-teal-900 font-bold transition duration-200">← Back To Menu</RouterLink>
    </div>

    <div class="w-full md:w-3/4 flex flex-col gap-6 p-4 overflow-y-auto">
      <teamslots :name="'Team 1'" :team="store.team1"></teamslots>
      <teamslots :name="'Team 2'" :team="store.team2"></teamslots>
      <teamslots :name="'Team 3'" :team="store.team3"></teamslots>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import card from '@/components/card.vue'
import teamslots from '@/components/teamslots.vue'
import { usePlayerstore } from '@/state'
const store = usePlayerstore()

onMounted(async ()=>{
  await store.getAllPlayers()
})
const current = ref('')
const rolled = ref(false)
const replace = ref(null)

async function randomNumber() {
  if(store.allPlayerCount === 643){
    rolled.value = true
    const id = Math.floor(Math.random() * store.allPlayerCount)
    current.value = await store.getPlayer(null, id)
    console.log(current.value)
  }
}

function keep(pos){
  store.addPlayer(current.value, replace.value, store.positions[pos])
  replace.value = ''
  rolled.value = false
  console.log(store.returnTeams)
} 
</script>

<style scoped></style>
