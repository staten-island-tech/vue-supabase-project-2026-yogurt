import { ref } from "vue"
import { defineStore } from "pinia"
const data = ref([])

export const usePlayerstore = defineStore("players", {
    state: () =>({
        playerIds: [],
        team1: [],
        team2: [],
        team3: []
    }),
    getters: {getPlayer:(id) =>{
        
    }}
})

export async function getData(){
    try{
        const response = await fetch('https://api.balldontlie.io/nba/v1/players/', {
            headers: { Authorization: import.meta.env.VITE_NBA_API_KEY }
        })
    data.value = await response.json()
    }catch (error){
        console.log(error)
    }
    return data.value.data
}

export async function getPlayer(id) {
    try{
        const response = await fetch(`https://api.balldontlie.io/nba/v1/players/${id}`, {
            headers: { Authorization: import.meta.env.VITE_NBA_API_KEY }
        })
    data.value = await response.json()
    }catch (error){
        console.log(error)
    }
    return data.value.data
}