import { defineStore } from 'pinia'

export const usePlayerstore = defineStore('players', {
  state: () => ({
    allPlayers: [],
    team1: [null, null, null, null, null],
    team2: [null, null, null, null, null],
    team3: [null, null, null, null, null],
    positions: {
      "PG": 0,
      "SG": 1, 
      "SF": 2,
      "PF": 3,
      "C": 4
    }
  }),
  getters: {
    returnTeams: (state) =>{
      return state.team1
    },
    hasPosition: (pos, team) =>{
      this[team].forEach(player => {
        if(player.positions.includes(pos)){
          return true
        }
      });
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
      } catch (error) {
        console.log(error)
      }
    },
    async getPlayer(slug, pos) {
      if (slug && !pos) {
        return await this.call(`players/slug/${slug}`)
      } else if (!slug && pos) {
        return this.allPlayers[pos]
      }
    },
    async getAllPlayers() {
      let cached = localStorage.getItem('allPlayers')

      if (this.allPlayers.length > 0 || cached) {
        this.allPlayers = JSON.parse(cached)
        return
      }
      let cursor = null
      let hasMore = true
      let endpoint = ''

      try {
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
      } catch (error) {
        console.log('error: ' + error)
      }
    },
    addPlayer(p, team, pos) {
      const posits = ["PG", "SG", "SF", "PF", "C" ]
      const playerPos = posits[pos]
      console.log(pos, playerPos)
      this[team].splice(pos, 1, p)
    },
  }, 
})
