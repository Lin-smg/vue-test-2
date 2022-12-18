<template>
    <div v-if="showModal" class="modal" tabindex="-1" role="dialog"
            :class="{ show: showModal, 'd-block': showModal }" style="background: #0606065c">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{title}}</h5>
                        <span type="button" class="close" data-dismiss="modal" aria-label="Close"
                            @click="showModal = false, emits('close')">
                            <span aria-hidden="true">close</span>
                        </span>
                    </div>
                    <div class="modal-body" >
                        <slot></slot>
                    </div>
                    
                </div>
            </div>
        </div>
</template>

<script setup>
// import { defineProps } from 'vue';
const props = defineProps({
    showModal: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ""
    }
})

const emits = defineEmits(['close'])
</script>