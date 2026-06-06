import { ref } from 'vue'
import { defineStore } from 'pinia'
const data = ref([])

export const usePlayerstore = defineStore('players', {
  state: () => ({
    playerIds: [],
    team1: [],
    team2: [],
    team3: [],
  }),
  getters: {
    hasPlayer: (state) => (id) => {
      return state.playerIds.includes(id)
    }
  },
  actions: {
    async call(endpoint){
      try{
        const response = await fetch('/.netlify/functions/nba-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint })
        })
        data.value = await response.json()
        return data.value
      }catch(error){
        console.log(error)
      }
    },
    async getPlayer(id) {
      return await this.call("players")
      // try {
      //   const response = await fetch(`https://api.balldontlie.io/nba/v1/players/${id}`, {
      //     headers: { Authorization: import.meta.env.VITE_NBA_API_KEY },
      //   })
      //   data.value = await response.json()
      //   return data.value.data
      // } catch (error) {
      //   console.log(error)
      // }
    },
    addPlayer(id, team){
      if(team && !this.hasPlayer(id)){
        try{
          this[team].push(id)
        } catch(error){
          console.log(error)
        }
      }else{
        try{
          this.playerIds.push(id)
        } catch(error){
          console.log(error)
        }
      }
    },
    async saveInv() {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { error } = await supabase
      const rows = this.playerIds.map((p) =>({
        user_id: user.id,
        player_id: p,
      }))
      .from('user_players')
      .upsert(rows)
      
    if (error) console.log(error)
  },
  }
})

 