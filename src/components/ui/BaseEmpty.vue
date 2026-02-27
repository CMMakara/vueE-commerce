<template>
   <div class=" d-flex justify-content-center align-items-center " style="height: 80vh;">
      <div class="text-center">

         <slot name="img"></slot>
         <h2 class="fw-semibold mb-2">
            {{ title }}
         </h2>

         <p class="text-muted mb-4">
            {{ subtitle }}
         </p>

         <RouterLink :to="link" class="btn btn-dark px-4 py-2 rounded-3">
            {{ buttonText }}
            <i class="bi bi-arrow-right ms-2"></i>
         </RouterLink>

      </div>
   </div>
</template>

<script setup>
defineProps({
   title: {
      type: String,
   },
   subtitle: {
      type: String,
   },
   buttonText: {
      type: String,
   },
   link: {
      type: String,
   },
})
</script>