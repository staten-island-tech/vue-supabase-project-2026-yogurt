import { defineStore } from 'pinia'

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
    addPlayer(id, team) {
      if (team && !this.hasPlayer(id)) {
        try {
          this[team].push(id)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          this.playerIds.push(id)
        } catch (error) {
          console.log(error)
        }
      }
    },
    async saveInv() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error } = await supabase
      const rows = this.playerSlugs
        .map((p) => ({
          user_id: user.id,
          player_slug: p,
        }))
        .from('user_players')
        .upsert(rows)

      if (error) console.log(error)
    },
  },
})
