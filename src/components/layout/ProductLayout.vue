<script setup>
import BaseCard1 from '../ui/BaseCard1.vue';

/**
 * This file is ProductLayout that also handle filter and product card
 * And the button is in is also have Base Button component
 * So to use this Component just give a props that have below this comment
 * -----------------------------------------------------------------------
 * @param {Object} products - [Products that will be displayed]
 * @param {Boolean} filter - [Filter state]
 * @param {Function} isFilter - [Filter function]
 * 
 * To see action button [Add to cart, Buy now] just go to BaseCard1.vue I also have 
 * a comment on that function [handleButton]
 */

const props = defineProps({
   products : Object,
   filter: Boolean,
   isFilter: Function,
   container: {
      String,
      default: 'container'
   },
});

</script>

<template>

   <div :class="container">
      <slot name="filterBtn"/>
      <!-- <button @click="isFilter" class="btn btn-dark py-3 pe-5 ps-2 rounded-4 fw-medium shadow-sm" style=""><i
            class="bi bi-filter-left"></i>&nbsp;<span>Filter</span></button> -->
      <div class="my-5"></div>
      <div class="row align-items-start justify-content-center g-4">
         <Transition name="slide" :class="filter ? 'col-lg-3' : 'col-lg-4'">
            <!-- <div v-if="filter" class="category-sidebar">
               <div class="rounded p-4 border" style="background-color: #fafafa;">
                  <h4 class="fw-medium">Date</h4>
                  <label class="form-check" for="checkDefault">
                     <input class="form-check-input" type="checkbox" value="" id="checkDefault">
                     Newest
                  </label>
                  <label class="form-check" for="checkDefault0">
                     <input class="form-check-input" type="checkbox" value="" id="checkDefault0">
                     Oldest
                  </label>
               </div>
            </div> -->
            <slot name="filter"/>
         </Transition>
         <div :class="filter ? 'col-lg-9' : 'col-12'">
            <div class="row g-4">
               <div class="col-13 col-md-6 col-lg-4 col-xl-3"
                  :class="filter ? 'col-13 col-md-6 col-lg-3' : 'col-12 col-md-6 col-lg-4'"
                  v-for="product in products" :key="product.id">
                  <BaseCard1 
                     :id="product.id"
                     :title="product.title"
                     :isFilter="filter"
                     :image="product.image"
                     :description="product.description"
                     :price="product.price"
                  />
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>

.category-sidebar {
   position: sticky;
   top: 8%;
   align-self: flex-start;
   z-index: 2;
}

/* Slide animation */
.slide-enter-active,
.slide-leave-active {
   transition: all 0.3s ease;
   overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
   transition: all 0s ease;
   transform: translateX(-30px);
   opacity: 0;
   width: 0;
   padding: 0;
}

.slide-enter-to,
.slide-leave-from {
   opacity: 1;
   transform: translateX(0);
}

.form-check {
   user-select: none;
   width: fit-content;
   cursor: pointer;
   display: flex;
   gap: 10px;
}
</style>