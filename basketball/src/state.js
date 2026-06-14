import { defineStore } from 'pinia'

export const usePlayerstore = defineStore('players', {
  state: () => ({
    rawPlayers: [],
    allPlayers: {
    "PG": { players: [], slot: 0},
    "SG": { players: [], slot: 1},
    "SF": { players: [], slot: 2},
    "PF": { players: [], slot: 3},
    "C": { players: [], slot: 4},
    },
    team1: [null, null, null, null, null],
    team2: [null, null, null, null, null],
    team3: [null, null, null, null, null],
  }),
  getters: {
    returnTeams: (state) =>{
      return state.team1
    },
    allPlayerCount: (state) => {
      return state.rawPlayers.length
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
    async getPlayer(slug, id) {
      if (slug && !id) {
        return await this.call(`players/slug/${slug}`)
      } else if (!slug && id) {
        return this.rawPlayers[id]
      }
    },
    async getAllPlayers() {
      let cached = localStorage.getItem('allPlayers')
      let rawCached = localStorage.getItem('rawPlayers')

      if (cached && rawCached) {
        this.allPlayers = JSON.parse(cached)
        this.rawPlayers = JSON.parse(rawCached)
        return
      }
      let cursor = null
      let hasMore = true
      let endpoint = ''
      let raw = []

      try {
        while (hasMore) {
          if (cursor) {
            endpoint = `players?cursor=${cursor}`
          } else {
            endpoint = 'players'
          }
          console.log("hi")
          const data = await this.call(endpoint)
          raw.push(...data.data)

          hasMore = data.meta.pagination.hasMore
          cursor = data.meta.pagination.nextCursor
        }
        // raw.forEach(p =>{
        //   p.positions.forEach(pos =>{
        //     if(this.allPlayers[pos]){
        //       this.allPlayers[pos].players.push(p)
        //     }
        //   })
        // })
        console.log(this.allPlayers)
        this.rawPlayers = raw
        // localStorage.setItem('allPlayers', JSON.stringify(this.allPlayers))
        localStorage.setItem('rawPlayers', JSON.stringify(this.rawPlayers))
      } catch (error) {
        console.log('error: ' + error)
      }
    },
    addPlayer(p, team, pos) {
      this[team].splice(this.allPlayers[pos].slot, 1, p)
    },
  }, 
})
