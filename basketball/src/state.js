import { ref } from 'vue'
import { defineStore } from 'pinia'
const data = ref([])

export const usePlayerstore = defineStore('players', {
  state: () => ({
    allPlayers: [],
    playerSlugs: [],
    team1: [],
    team2: [],
    team3: [],
  }),
  getters: {
    hasPlayer: (state) => (slug) => {
      return state.playerSlugs.includes(slug)
    },
    allPlayerCount: (state) => {
      return state.allPlayers.length
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
        const json = await response.json()
        return json
      }catch(error){
        console.log(error)
      }
    },
    async getPlayer(slug) {
      return await this.call('players')
      return await this.call(`players/slug/${slug}`)
    },
    async getAllPlayers() {
      if (this.allPlayers.length > 0) return
      let cursor = null
      let hasMore = true
      let endpoint = ''

      while (hasMore) {
        if(cursor){
          endpoint = `players?cursor=${cursor}`
        }else{
          endpoint = 'players'
        }
        const data = await this.call(endpoint)
        
        this.allPlayers = [...this.allPlayers, ...data.data]
        hasMore = data.meta.pagination.hasMore
        cursor = data.meta.pagination.nextCursor
      }
      this.allPlayers = allPlayers
      console.log('total fetched:', this.allPlayers.length)
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
      const rows = this.playerSlugs.map((p) =>({
        user_id: user.id,
        player_slug: p,
      }))
      .from('user_players')
      .upsert(rows)
      
    if (error) console.log(error)
  },
  }
})

 