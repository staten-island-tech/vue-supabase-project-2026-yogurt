<template>
    <div>
      <p v-if="win === 'user'">You Win!</p>
      <p v-if="win === 'random'">You Lost!</p>

      <p>Choose Your Team: </p>
      <select v-model="selected">
        <option value="team1">Team 1</option>
        <option value="team2">Team 2</option>
        <option value="team3">Team 3</option>
      </select>
      <p>{{ count }}</p>
      <teamslots :name="selected" :team="store[selected]"></teamslots>
      VS
      <teamslots :name="'Random'" :team="store.randomteam"></teamslots>
      <button @click="randomTeam">Find Next Team</button>
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
const count = ref(5)

function randomTeam() {
  if(cooldown.value) return
  count.value = 5
  cooldown.value = true
  Object.entries(store.allPlayers).forEach(([key, value]) => {
    const id = Math.floor(Math.random() * value.players.length)
    store.addPlayer(value.players[id], 'randomteam', key)
  });

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
      num += player.overall
    })
    return num
  }else{
    return 0
  }
}
function winner(){
  const diff = getOverall(store[selected.value]) - getOverall(store.randomteam)
  const prob = 1 / (1 + Math.pow(10, -diff / 10))
  if(prob > Math.random()){
    win.value = 'user'
  }else{
    win.value = 'random'
  }
  cooldown.value = false  
}
</script>

<style scoped>

</style>