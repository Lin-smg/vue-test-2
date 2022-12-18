import { defineStore } from 'pinia'
import { http } from '../composables/http';

export const usePlayerStore = defineStore('player', {
    state: () => ({ 
        playerList: [],
        loading: false
     }),
    getters: {

        getAllPlayer: (state) => state.playerList,

        getPlayerList: (state) => {
            return state.playerList.filter((item) => {

            console.log("item", item.team_name);
                return !(item.team_name)
            });
        },
        getPlayerListByTeam: (state) => {
            return (team) => state.playerList.filter(item => {
                return item.team_name && item.team_name == team.name
            })
        }
        
    },
    actions: {

      setPlayerList() {
        this.loading = true
        http({
            url: 'players',
            method: 'GET',
        }).then(res => {
            console.log(res)
            this.playerList = res.data.data.map(item => {
                return item;
            })
            this.loading = false
        })
      },

      setTeam(players, team) {
        players.forEach(item => {
            let index = this.playerList.findIndex(value => value.id == item.id)
            this.playerList[index].team_name = team.name
            
        });
      },

      leaveTeam(team) {
        this.playerList = this.playerList.map(player => {
            if(player.team_name == team.name) {
                delete player.team_name
            }
            return player
        })
      },
      removePlayerFromTeam(value) {
        this.playerList = this.playerList.map(player => {
            if(player.id == value.id) {
                delete player.team_name
            }
            return player
        })
      }

    },
})