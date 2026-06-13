<template>
    <div>
        <p>Choose Your Team: </p>
        <select v-model="selected">
            <option value="team1">Team 1</option>
            <option value="team2">Team 2</option>
            <option value="team3">Team 3</option>
        </select>
        <teamslots :name="selected" :team="store[selected]"></teamslots>
        VS
        <teamslots :name="'Random'" :team="[]"></teamslots>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import teamslots from '@/components/teamslots.vue';
import { usePlayerstore } from '@/state';
const store = usePlayerstore()

const selected = ref('team1')
const current = ref('')

async function randomTeam() {
  if(store.allPlayerCount === 643){
    const id = Math.floor(Math.random() * store.allPlayerCount)
    current.value = await store.getPlayer(null, id)
    console.log(current.value)
  }
}
</script>

<style scoped>

</style>