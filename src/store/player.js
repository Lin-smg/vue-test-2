import { defineStore } from 'pinia'
import { http } from '../composables/http';

export const usePlayerStore = defineStore('player', {
    state: () => ({
        playerList: localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : [],
        loading: false
    }),
    getters: {

        getAllPlayer: (state) => state.playerList,

        getPlayerList: (state) => {
            return state.playerList.filter((item) => {

                return !(item.team_id)
            });
        },
        getPlayerListByTeam: (state) => {
            return (team) => state.playerList.filter(item => {
                return item.team_id && item.team_id == team.id
            })
        }

    },
    actions: {

        storePlayerToStorage(list) {
            localStorage.setItem('players', JSON.stringify(list))
        },

        setPlayerList() {
            this.loading = true
            http({
                url: 'players',
                method: 'GET',
            }).then(res => {
                
                this.playerList = localStorage.getItem('players')? JSON.parse(localStorage.getItem('players')):res.data.data
                this.loading = false
                
                if(!localStorage.getItem('players')) {
                    this.storePlayerToStorage(this.playerList)

                }
            })
        },

        setTeam(players, team) {
            players.forEach(item => {
                let index = this.playerList.findIndex(value => value.id == item.id)
                // this.playerList[index].team_name = team.name
                this.playerList[index].team_id = team.id

            });
            this.storePlayerToStorage(this.playerList)
        },

        leaveTeam(team) {
            this.playerList = this.playerList.map(player => {
                if (player.team_id == team.id) {
                    delete player.team_id
                }
                return player
            })
            this.storePlayerToStorage(this.playerList)
        },
        removePlayerFromTeam(value) {
            this.playerList = this.playerList.map(player => {
                if (player.id == value.id) {
                    delete player.team_id
                }
                return player
            })

            this.storePlayerToStorage(this.playerList)
        },

        clearPlayer() {
            this.playerList = []
        }

    },
})