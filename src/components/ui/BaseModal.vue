<template>

<!-- Button trigger modal -->


<!-- Modal -->
<div class="modal modal-overlay show fade m-0 p-0 d-block w-100" id="exampleModal" tabindex="-1" @click.self="$emit('close')" style="background-color: rgba(0,0,0,0.5);" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered ">
    <div class="modal-content border-0 shadow">
      <div class="modal-header border-0 pb-0">
        <h4 class=" ms-auto p-0 text-secondary" id="exampleModalLabel">{{ header }}</h4>
        <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close" @click="$emit('close')"></button>
      </div>
      <div class="modal-body py-0">
        <slot name="content">

        </slot>
      </div>
      <div class="modal-footer border-0 pt-0">
        <slot name="footer">
          
        </slot>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
import { defineProps } from 'vue';
defineProps({header: String});


</script>
<style scoped>

</style>