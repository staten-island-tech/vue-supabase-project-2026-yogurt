import { ref } from "vue"
const data = ref([])

export async function getPlayer(id) {
    try{
        const response = await fetch(`https://api.balldontlie.io/nba/v1/players/${id}`, {
            headers: { Authorization: import.meta.env.VITE_NBA_API_KEY }
        })
    data.value = await response.json()
    }catch (error){
        console.log(error)
    }
    return data.value
}