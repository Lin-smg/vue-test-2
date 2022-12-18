<template>
    <div>
        <div style="width: 500px;" class="mx-auto">

            <div>
                <div v-if="loading" class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
                <div class="card mt-1" v-for="player, i in playerList" :key="i" @click="showTeam(player)">
                    <div class="card-body ">
                        <div class="row">
                            <div class="col">
                                <div class="row justify-content-center">
                                    <div class="col text-start">
                                        {{ player.first_name }} {{ player.last_name }}
                                    </div>
                                    <div class="col-2">
                                        {{ player.position }}
                                    </div>
                                    <div v-if="player.team" class="col text-end">{{ player.team.full_name }}({{ player.team.abbreviation
                                    }})</div>
                                </div>

                                <div class="row justify-content-center">
                                    <div class="col-2 text-start">
                                        {{ playerHeight(player) }}
                                    </div>
                                    <div v-if="player.team" class="col text-end">{{ player.team.city }}, {{ player.team.division }}</div>
                                </div>
                            </div>

                            <!-- <div class="col-2">
                                <span class="btn btn-outline">Edit</span>
                                <br>
                                <span class="btn text-danger">Delete</span>
                            </div> -->
                        </div>
                    </div>
                </div>

                <div>
                    load more..
                </div>

            </div>
        </div>


        <div v-if="showModal" class="modal" tabindex="-1" role="dialog"
            :class="{ show: showModal, 'd-block': showModal }" style="background: #0606065c">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ selectedPlayer.first_name }} {{ selectedPlayer.last_name }}</h5>
                        <span type="button" class="close" data-dismiss="modal" aria-label="Close"
                            @click="showModal = false">
                            <span aria-hidden="true">close</span>
                        </span>
                    </div>
                    <div class="modal-body" v-if="selectedPlayer.team">
                        <div class="row justify-space-between">
                            <div class="col text-start">
                                Team Name
                            </div>
                            <div class="col text-end">
                                {{ selectedPlayer.team.full_name }}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col text-start">
                                City
                            </div>
                            <div class="col text-end">
                                {{ selectedPlayer.team.city }}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col text-start">
                                Conference
                            </div>
                            <div class="col text-end">
                                {{ selectedPlayer.team.conference }}
                            </div>
                        </div>

                        <div class="row">
                            <div class="col text-start">
                                Division
                            </div>
                            <div class="col text-end">
                                {{ selectedPlayer.team.division }}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            @click="showModal = false">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import { ref } from 'vue';
import { onMounted, computed } from 'vue';
import { http } from '../composables/http';
import { usePlayerStore } from '../store/player';
const playerStore = usePlayerStore();


const playerList = ref([])
const loading = ref(false)
const page = ref(1)
const showModal = ref(false)
const selectedPlayer = ref({})

const playerHeight = computed(() => {
    return (value) => {
        let feet = value.height_feet ? value.height_feet + "'" : "";
        let inches = value.height_inches != null ? value.height_inches + '"' : ""

        return feet + inches;
    }
})

onMounted(() => {

    getPlayerList();
    console.log("modal", showModal.value)

    // window.onscroll = () => {
    //     let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

    //     if (bottomOfWindow) {
    //         console.log("bottom")
    //         // ...
    //     }
    // };
    scroll();

})

const getPlayerList = async () => {
    loading.value = true;

    // playerList.value = await playerStore.getAllPlayer;
    // console.log("player list", playerList.value)
    // loading.value = false
    http({
        url: 'players',
        method: 'GET',
        params: {
            page: page.value,
            per_page: 10
        }
    }).then(res => {
        console.log(res)
        playerList.value.push(...res.data.data)
        loading.value = false
    })
}

const showTeam = (value) => {
    selectedPlayer.value = value
    showModal.value = true;
}

function scroll() {
    window.onscroll = () => {
        // console.log('scroll',window.innerHeight + window.pageYOffset , document.body.offsetHeight)

        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        // console.log("----", document.documentElement.scrollTop + window.innerHeight, document.documentElement.offsetHeight)

        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1) {

            page.value++;
            console.log('start', page.value)
            getPlayerList();
        }
    }
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

</script>