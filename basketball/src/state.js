import { defineStore } from 'pinia'

export const usePlayerstore = defineStore('players', {
  state: () => ({
    allPlayers: [],
    team1: [],
    team2: [],
    team3: [],
  }),
  getters: {
    returnTeams: (state) =>{
      return state.team1
    },
    allPlayerCount: (state) => {
      return state.allPlayers.length
    },
  },
  actions: {
    async call(endpoint) {
      try {
        const response = await fetch('/.netlify/functions/nba-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint }),
        })
        const json = await response.json()
        return json
      }catch(error){
        console.log(error)
      }
    },
    async getPlayer(slug, pos) {
      if(slug && !pos){
        return await this.call(`players/slug/${slug}`)
      }else if(!slug && pos){
        return this.allPlayers[pos]
      }
    },
    async getAllPlayers() {
      let cached = localStorage.getItem('allPlayers')

      if (this.allPlayers.length > 0 || cached){
        this.allPlayers = JSON.parse(cached)
        return
      }
      let cursor = null
      let hasMore = true
      let endpoint = ''

      try{
        while (hasMore) {
          if (cursor) {
            endpoint = `players?cursor=${cursor}`
          } else {
            endpoint = 'players'
          }
          const data = await this.call(endpoint)

          this.allPlayers = [...this.allPlayers, ...data.data]
          hasMore = data.meta.pagination.hasMore
          cursor = data.meta.pagination.nextCursor
        }
        console.log('total fetched:', this.allPlayers.length)
        localStorage.setItem('allPlayers', JSON.stringify(this.allPlayers))
      }catch(error){
        console.log('error: ' + error)
      }
    },
    addPlayer(p, team) {
      if (team && this[team].length < 5) {
        try {
          this[team].push(p)
        } catch (error) {
          console.log(error)
        }
      }else{
        console.log(Number.isInteger(this[team].length))
      }
    },
    hasPositon(pos, team){
      if(pos.isArray()){
        pos.forEach(p => {
          console.log("yogurt")
        });
      }
    }}, 
  },
)
