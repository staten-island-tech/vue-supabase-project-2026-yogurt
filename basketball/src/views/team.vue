<template>
    team 1
    <div class="flex flex-row">
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
    </div> 
    team 2
    <div class="flex flex-row">
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
    </div>
    team 3
    <div class="flex flex-row">
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
        <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254"></img>
            Lebron
        </div>
    </div>
    <RouterLink to="/menu" class="p-5">Back To Menu</RouterLink>
    select a team
    <select v-model="selectedSchool">
      <option value="">team 1</option>
      <option value="">team 2</option>
      <option value="">team 3</option>
    </select>
    
</template>

<script setup>
import card from '@/components/card.vue'
</script>

<style scoped></style>
