import { ref } from "vue"
const data = ref([])

export async function getData() {
    try {
        const response = await fetch('https://api.nba2kapi.com/api/players?limit=10',
            {
                headers: {
                    'API-Key': '2k_ebvflg864vucenjc63slbau4597m8fhs'
                }
            }
        )
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
                    'API-Key': '2k_ebvflg864vucenjc63slbau4597m8fhs'
                }
            }
        );
    data.value = await response.json()
    }catch (error) {
        console.log(error)
    }
    return data.value
}