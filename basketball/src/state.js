import { defineStore } from 'pinia'
import { supabase } from './supabase'

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
    randomteam: [null, null, null, null, null],
    dimes: 500
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
      let rawCached = localStorage.getItem('rawPlayers')
      
      const temp = {
          "PG": { players: [], slot: 0},
          "SG": { players: [], slot: 1},
          "SF": { players: [], slot: 2},
          "PF": { players: [], slot: 3},
          "C": { players: [], slot: 4},
        }

      if (rawCached) {
        this.rawPlayers = JSON.parse(rawCached)
        this.rawPlayers.forEach(p =>{
          p.positions.forEach(pos =>{
            if(temp[pos]){
              temp[pos].players.push(p)
            }
          })
        })
        this.allPlayers = temp
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
          const data = await this.call(endpoint)
          raw.push(...data.data)

          hasMore = data.meta.pagination.hasMore
          cursor = data.meta.pagination.nextCursor
        }
        
        raw.forEach(p =>{
          p.positions.forEach(pos =>{
            if(temp[pos]){
              temp[pos].players.push(p)
            }
          })
        })
        this.allPlayers = temp
        this.rawPlayers = raw
        localStorage.setItem('rawPlayers', JSON.stringify(this.rawPlayers))
      } catch (error) {
        console.log('error: ' + error)
      }
    },
    addPlayer(p, team, pos) {
      this[team].splice(this.allPlayers[pos].slot, 1, p)
    },
    async saveUserData() {
      const { data: { user } } = await supabase.auth.getUser()

      await supabase
        .from('profiles')
        .update({ dimes: this.dimes })
        .eq('id', user.id)

      const teams = { team1: this.team1, team2: this.team2, team3: this.team3 }

      for (const [teamName, players] of Object.entries(teams)) {
        const { data: teamData } = await supabase
          .from('user_teams')
          .upsert({ user_id: user.id, team_name: teamName }, { onConflict: 'user_id, team_name' })
          .select()
          .single()

        await supabase
          .from('team_players')
          .delete()
          .eq('user_team_id', teamData.id)

        const rows = players
          .map((p, index) => {
            if(p){
              return { user_team_id: teamData.id, player_slug: p.slug, slot: index }
            }
            return null
          })
          .filter(p => p !== null)

        if (rows.length > 0) {
          await supabase.from('team_players').insert(rows)
        }
      }
    },

    async loadUserData() {
      const { data: { user } } = await supabase.auth.getUser()
      if(!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('dimes')
        .eq('id', user.id)
        .single()
      
      this.dimes = profile.dimes

      const { data: teams, error: teamsError } = await supabase
        .from('user_teams')
        .select('id, team_name')
        .eq('user_id', user.id)
      if(teamsError) throw teamsError 

      for (const team of teams) {
        const { data: teamPlayers, error: error } = await supabase
          .from('team_players')
          .select('player_slug, slot')
          .eq('user_team_id', team.id)
        if(error) throw error

        const players = [null, null, null, null, null]
        for (const { player_slug, slot } of teamPlayers) {
          const player = this.rawPlayers.find(p => p.slug === player_slug)
          if (player) {
            players[slot] = player
          }
        }

        this[team.team_name] = players
      }
    }
  }, 
})
