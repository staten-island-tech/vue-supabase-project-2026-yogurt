<template>
  <div class="bg-sky-300 min-h-screen flex flex-col items-center justify-center gap-6 p-6">
    
    <div v-if="win === 'user'" class="w-full max-w-2xl bg-teal-400 text-white text-3xl font-bold py-4 rounded-2xl text-center shadow-lg">
      🏆 You Win! + 200 Dimes
    </div>
    <div v-if="win === 'random'" class="w-full max-w-2xl bg-red-400 text-white text-3xl font-bold py-4 rounded-2xl text-center shadow-lg">
      😒 You Lost!
    </div>

    <div class="flex flex-col items-center gap-2">
      <p class="text-gray-700 font-bold text-lg">Choose Your Team</p>
      <select v-model="selected"
        class="bg-white text-gray-800 font-bold px-6 py-3 rounded-2xl shadow-lg outline-none cursor-pointer">
        <option value="team1">Team 1</option>
        <option value="team2">Team 2</option>
        <option value="team3">Team 3</option>
      </select>
    </div>

    <div v-if="count < 5" class="text-6xl font-bold text-white drop-shadow">
      {{ count }}
    </div>

    <div class="w-full flex flex-col md:flex-col gap-6 items-center justify-center">
      <teamslots :name="selected.replace('team', 'Team ')" :team="store[selected]"></teamslots>
      <p class="text-4xl font-bold text-white drop-shadow">VS</p>
      <teamslots :name="'Random'" :team="store.randomteam"></teamslots>
    </div>

    <button 
      @click="randomTeam"
      :disabled="cooldown || store.dimes < 50"
      class="w-full max-w-xs cursor-pointer bg-red-400 hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-2xl text-center transition duration-200 shadow-lg">
      Find Next Team - 50 Dimes
    </button>

    <RouterLink to="/menu" class="text-teal-700 hover:text-teal-900 font-bold transition duration-200">
      ← Back To Menu
    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import teamslots from '@/components/teamslots.vue';
import { usePlayerstore } from '@/state';
const store = usePlayerstore()

const cooldown = ref(false)
const selected = ref('team1')
const win = ref('')
const count = ref(10)

function randomTeam() {
  count.value = 5
  cooldown.value = true
  Object.entries(store.allPlayers).forEach(([key, value]) => {
    const id = Math.floor(Math.random() * value.players.length)
    store.addPlayer(value.players[id], 'randomteam', key)
  });

  store.dimes -= 50

  const interval = setInterval(()=>{
    count.value --
    if(count.value < 1){
      clearInterval(interval)
      winner()
    }
  }, 1000)
}
function getOverall(team){
  let num = 0
  if(store[team]){
    store[team].forEach((player)=>{
      if(player && player.overall){
        num += player.overall
      }
    })
  }
  return num / 5
}

function winner(){
  console.log(getOverall(selected.value), getOverall('randomteam'))
  const diff = getOverall(selected.value) - getOverall('randomteam')
  const prob = 1 / (1 + Math.pow(10, -diff / 10))
  if(prob > Math.random()){
    win.value = 'user'
    store.dimes += 200
  }else{
    win.value = 'random'
  }
  cooldown.value = false  
}
</script>

<style scoped>

</style>