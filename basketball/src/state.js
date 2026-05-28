import { ref } from "vue"
const data = ref([])

export async function getData() {
    if(fetched){
        return data.value
    }
    try {
        const response = await fetch('https://api.nba2kapi.com/api/players')
        data.value = await response.json()
    }catch (error) {
        console.log(error)
    }
    return data.value
}

export async function getPlayer(slug) {
    try {
        const response = await fetch(
            `https://api.nba2kapi.com/api/players/slug/:${slug}`,
            {
                headers: {
                    'X-API-Key': '2k_7azburbns6ka0mo63krjl8stmt6e3qod'
                }
            }
        );
    data.value = await response.json()
    }catch (error) {
        console.log(error)
    }
    return data.value
}