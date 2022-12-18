import { defineStore } from 'pinia'
import { http } from '../composables/http';
import { usePlayerStore } from './player';

export const useTeamStore = defineStore('team', {
    state: () => ({ 
        teamList: [],
        loading: false,
        error: null
     }),
    getters: {

        getAllTeam: (state) => state.teamList,
        getFilteredTeam: (state) => {
            const playerStore = usePlayerStore()
            return state.teamList.map(team => {
                team.playerCount = playerStore.getAllPlayer.filter(data => {
                    return data.team_name && data.team_name == team.name
                }).length
                return team
            })
        }
        
    },
    actions: {
        saveTeam(value) {
            let some = this.teamList.some(team => team.name == value.name)
            if(some) {
                this.error = "Team name already exist"
                return;
            }
            value.playerCount = 0
            this.teamList.push(value)
        },

        clearError() {
            this.error = null
        },

        deleteTeam(team) {
            const playerStore = usePlayerStore()
            playerStore.leaveTeam(team);
            this.teamList = this.teamList.filter(item => {
                console.log("delete", item.name , team.name)
                return item.name != team.name
            })
        },

        updateTeam(team) {
            let index = team.index
            console.log("INdes", index)
            delete team.index;
            this.teamList[index] = team;
        }
    },
})