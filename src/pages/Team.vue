<template>
    <div>
        <div class="text-start mt-1">
            <button class="btn btn-primary" @click="showAddModal">Add Team</button>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Player Count</th>
                    <th scope="col">Region</th>
                    <th scope="col">Country</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="team, i in teamStore.getFilteredTeam">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ team.name }}</td>
                    <td>
                        <a href="#" @click="showPlayerList(team)">{{ team.playerCount }}</a>
                    </td>
                    <td>{{ team.region }}</td>
                    <td>{{ team.country }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="showEditModal(team, i)">Edit</button>
                        <button class="btn btn-danger btn-sm ms-1" @click="deleteTeam(team)">Delete</button>
                        <button class="btn btn-primary btn-sm ms-1" @click="showAddPlayerModal(team, i)">Add Player</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <Modal :show-modal="showModal" title="Add Team" @close="showModal = false">
            <form @submit.prevent="saveTeam">
                <div class="text-danger">
                    {{ teamStore.error }}
                </div>
                <div class="form-group text-start">
                    <label>Name</label>
                    <input v-model="team.name" type="text" class="form-control" placeholder="Enter Name" required>
                </div>
                <div class="form-group text-start">
                    <label>Region</label>
                    <input v-model="team.region" type="text" class="form-control" placeholder="Enter Region" required>
                </div>
                <div class="form-group text-start">
                    <label>Country</label>
                    <input v-model="team.country" type="text" class="form-control" placeholder="Enter Country" required>
                </div>

                <div>
                    <button v-if="isEdit" class="btn btn-primary mt-2 w-100">Update</button>
                    <button v-else class="btn btn-primary mt-2 w-100">Save</button>
                </div>
            </form>
        </Modal>

        <Modal :show-modal="addPlayerModal" @close="addPlayerModal = false" title="Add Player">
            <div class="form-group text-start">
                <label>Player Count : <a href="#" @click="showPlayerList(team)">{{ team.playerCount }}</a></label>
                <br>
                <label>Choose Player</label>

                <v-select v-model="players" :options="playerStore.getPlayerList" multiple :filterable="true"
                    :filter="filterPlayer">

                    <template #selected-option="{ first_name, last_name }">
                        <span>{{ first_name }} {{ last_name }}</span>
                    </template>

                    <template #option="{ first_name, last_name }">
                        <span>{{ first_name }} {{ last_name }}</span>
                    </template>
                </v-select>
            </div>

            <div class="mt-2">
                <button class="btn btn-primary btn-sm border-round w-100" @click="addPlayers">Add</button>
            </div>

        </Modal>

        <Modal :show-modal="playerListModal" :title="`Player List(${team.name})`" @close="playerListModal = false">
            <div>
                <div v-if="playerStore.getPlayerListByTeam(team).length == 0"> No Player</div>
                <div class="card" v-for="player, i in playerStore.getPlayerListByTeam(team)" :key="i">
                    <div class="card-body">
                        <div class="row text-start">
                            <div class="col">
                                {{ player.first_name }} {{ player.last_name }}
                            </div>
                            <div class="col">
                                {{ player.position }}
                            </div>

                            <div class="col text-end">
                                <a href="#" @click="playerStore.removePlayerFromTeam(player)">Remove</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>


    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Modal from '../components/Modal.vue';
import { useTeamStore } from '../store/team'
import { usePlayerStore } from '../store/player'
const teamStore = useTeamStore();
const playerStore = usePlayerStore();
const showModal = ref(false)
const deleteModal = ref(false)
const addPlayerModal = ref(false)
const playerListModal = ref(false);
const isEdit = ref(false);
const players = ref(null)

const team = ref({
    name: "",
    region: "",
    country: ""
})

const name = ref("");
const region = ref("");
const country = ref("")

function saveTeam() {

    console.log("team", team.value)
    if (isEdit.value) {
        teamStore.updateTeam(team.value)

    } else {
        teamStore.saveTeam(team.value)

    }
    console.log("res", teamStore.error)
    if (!teamStore.error) {
        showModal.value = false;
        team.value = {
            name: "",
            region: "",
            country: ""
        }
    }
}

function showAddModal() {
    isEdit.value = false
    team.value = {
        name: "",
        region: "",
        country: ""
    }
    showModal.value = true;
    teamStore.clearError();
    console.log("show", team.value)

}

function deleteTeam(team) {
    deleteModal.value = true;
    teamStore.deleteTeam(team);

}

function showEditModal(value, id) {
    isEdit.value = true;
    team.value = { ...value, index: id }
    console.log("value", team.value)

    showModal.value = true
}

function showAddPlayerModal(value, i) {
    players.value = []
    team.value = { ...value, index: i }
    addPlayerModal.value = true
}

function filterPlayer(options, search) {
    return options.filter((item) => {
        return `${item.first_name} ${item.last_name}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })

}

function addPlayers() {

    playerStore.setTeam(players.value, team.value)
    team.value.playerCount = team.value.playerCount + players.value.length
    console.log("team", team.value);

    teamStore.updateTeam(team.value)

    addPlayerModal.value = false;

}

function showPlayerList(value) {
    team.value = { ...value }
    playerListModal.value = true;
    console.log("player lisst", playerStore.getPlayerListByTeam(team.value))
}
</script>