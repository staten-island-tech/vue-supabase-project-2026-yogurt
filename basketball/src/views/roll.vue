<template>
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
        <card class="w-50 h-100 bg-gray-200 rounded-2xl mr-10" :name="lebron" :img="'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254'"></card>
    </div>
    <button>Roll</button>
</template>

<script setup>
import card from '@/components/card.vue'
</script>

<style scoped>

</style>