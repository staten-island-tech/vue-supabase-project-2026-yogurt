<template>
  <div class="bg-teal-200 w-screen h-screen item-center justify-center flex flex-col">
    <card v-if="current"
      class="w-50 h-100 bg-gray-200 rounded-2xl mr-10"
      :name="`${current.name}`"
      :img="`${current.playerImage}`"
      :overall="current.overall"
      :pos="current.positions.toString()"
    ></card>
    <button v-if="store.allPlayerCount != 643">Loading...</button>
    <button v-if="store.allPlayerCount === 643" class="w-1/2 bg-red-400 hover:bg-red-500 text-white text-1xl font-bold rounded-2xl text-center transition duration-200 shadow-lg" @click="randomNumber">Roll</button>
    <button v-if="rolled" @click="keep">Keep?</button>
    <RouterLink to="/menu" class="p-5">Back To Menu</RouterLink>
    
  </div>
  
</template>

<script setup>
import { onMounted, ref } from 'vue'
import card from '@/components/card.vue'
import { usePlayerstore } from '@/state'
const store = usePlayerstore()

onMounted(async ()=>{
  await store.getAllPlayers()
})
const current = ref('')
const rolled = ref('')

async function randomNumber() {
  if(store.allPlayerCount === 643){
    rolled.value = true
    const id = Math.floor(Math.random() * store.allPlayerCount)
    current.value = await store.getPlayer(null, id)
    console.log(current.value)
  }
}

function keep(){
  rolled.value = false
  store.addPlayer(current.value, 'team1')
  console.log(store.returnTeams)
} 
</script>

<style scoped></style>
