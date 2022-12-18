<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-info p-2">
                <a class="navbar-brand " href="#">Balldontlie</a>
                <RouterLink to="/">Player</RouterLink>
                <RouterLink class="ms-2" to="/team">Team</RouterLink>

                <span class="me-auto ms-auto">
                    {{route.name}}
                </span>

                <span class="navbar-text ">
                    {{store.getUserName}}
                </span>
                <button class="btn btn-outline-danger ms-2" @click="logout">Logout</button>
            </nav>
        </header>
        <main>
            <RouterView />
        </main>

        <div v-if="showModal" class="modal" tabindex="-1" role="dialog"
            :class="{ show: showModal, 'd-block': showModal }" style="background: #0606065c">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Player</h5>
                        <span type="button" class="close" data-dismiss="modal" aria-label="Close"
                            @click="showModal = false">
                            <span aria-hidden="true">close</span>
                        </span>
                    </div>
                    <div class="modal-body" >
                        
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
import { RouterView , useRouter, RouterLink, useRoute} from 'vue-router';
import { useAuthStore } from '../store/auth';
import { useTeamStore } from '../store/team';
import { usePlayerStore } from '../store/player';

const store = useAuthStore();
const router = useRouter();
const route = useRoute();
const showModal = ref(false);
const teamStore = useTeamStore();
const playerStore = usePlayerStore();

function logout() {
    store.logout();
    router.replace('/login')
    teamStore.clearTeam();
    playerStore.clearPlayer();
    localStorage.clear();

}
</script>