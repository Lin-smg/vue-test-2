import { defineStore } from 'pinia'
import { http } from '../composables/http';
import { usePlayerStore } from './player';

export const useTeamStore = defineStore('team', {
    state: () => ({ 
        teamList: localStorage.getItem('teams') ? JSON.parse(localStorage.getItem('teams')) : [],
        loading: false,
        error: null
     }),
    getters: {

        getAllTeam: (state) => state.teamList,
        getFilteredTeam: (state) => {
            const playerStore = usePlayerStore()
            return state.teamList.map(team => {
                team.playerCount = playerStore.getAllPlayer.filter(data => {
                    return data.team_id && data.team_id == team.id
                }).length
                return team
            })
        }
        
    },
    actions: {
        storeTeamToStorage(list) {
            localStorage.setItem('teams', JSON.stringify(list))
        },
        saveTeam(value) {

            let some = this.teamList.some(team => team.name == value.name)
            this.error = ""
            if(some) {
                this.error = "Team name already exist"
                return;
            }
            value.playerCount = 0
            let index = this.teamList.length + 1;
            value.id = index;
            this.teamList.push(value)

            this.storeTeamToStorage(this.teamList)
        },

        clearError() {
            this.error = null
        },

        deleteTeam(team) {
            const playerStore = usePlayerStore()
            playerStore.leaveTeam(team);
            this.teamList = this.teamList.filter(item => {
                
                return item.id != team.id
            })
            this.storeTeamToStorage(this.teamList)
        },

        updateTeam(team) {
            let index = team.index
            delete team.index;
            this.teamList[index] = team;


            this.storeTeamToStorage(this.teamList)
        },

        clearTeam() {
            this.teamList = []
        }
    },
})