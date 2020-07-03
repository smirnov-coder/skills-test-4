<template>
    <div ref="modal" data-backdrop="static" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" 
                        id="exampleModalLabel">
                        v-bind:class="isError ? 'text-danger' : 'text-success'" 
                        {{ isError ? 'Error' : 'Success' }}
                    </h5>
                    <button type="button" 
                            class="close" 
                            data-dismiss="modal" 
                            aria-label="Close"
                            @click="$emit('on-closed')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">{{ bodyText }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./Modal.ts"></script>