<script setup lang="ts">
import BaseCard1 from '@/components/ui/BaseCard1.vue';
import BaseCarousel from '@/components/ui/BaseCarousel.vue';
import { allProductStore } from '@/stores/products';
import { onMounted, ref, watch } from 'vue'

let filter = ref(false);

const allProducts = allProductStore();
const src = ref([
   'https://i.pinimg.com/736x/46/5a/f8/465af86bba6ee6899f4b6f3cf0a1978d.jpg',
   'https://i.pinimg.com/736x/3a/cd/f5/3acdf58d1dad75bdc82275056dceeb8a.jpg',
   'https://i.pinimg.com/736x/04/fe/2b/04fe2baefdf95ef61493c0a361681218.jpg'
])

let page = ref(1);
let per_page = ref(10);
let sortDir = ref('desc');


onMounted(async () => {
   await allProducts.getAllProduct({page: page.value, per_page: per_page.value, sortDir: sortDir.value});
})

function isFilter() {
   filter.value = !filter.value;
}

</script>

<template>
   <section>
      <div class="container">
         <div class="p-3 border shadow-sm" style="background-color: #f7f7f7; border-radius: 40px;">
            <BaseCarousel :src="src" />
         </div>
      </div>
   </section>

   <section class="bg-primary-subtle mt-5 p-5">
      <div class="container">
         <h3 class="text-primary m-0 fw-bold">New Products</h3>
      </div>
   </section>

   <section class="mt-4">
      <div class="container">
         <button @click="isFilter" class="btn btn-dark py-2 pe-5 ps-2 rounded-4 fw-medium shadow-sm"
            style=""><i class="bi bi-filter-left"></i>&nbsp;<span>Filter</span></button>
         <div class="my-4"></div>
         <div class="row align-items-start">
            <Transition name="slide">
               <div v-if="filter" class="col-3 category-sidebar">
                  <div class="rounded p-3 border" style="background-color: #fafafa;">
                     <h5 class="fw-medium">Category</h5>
                     <h5 class="fw-medium">Date</h5>
                     <label class="form-check" for="checkDefault">
                        <input class="form-check-input" type="checkbox" value="" id="checkDefault">
                        Newest
                     </label>
                     <label class="form-check" for="checkDefault1">
                        <input class="form-check-input" type="checkbox" value="" id="checkDefault1">
                        Oldest
                     </label>
                  </div>
               </div>
            </Transition>
            <div :class="filter ? 'col-9' : 'col-12'">
               <div class="row g-3">
                  <div :class="filter ? 'col-4' : 'col-3'" v-for="product in allProducts.allProducts.value" :key="product.id">
                     <BaseCard1
                        :image="product.image"
                        :title="product.title"
                        :description="product.description"
                        :price="product.price"
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>

   <div style="height: 1000px;"></div>
</template>

<style scoped>
.category-sidebar {
   position: sticky;
   top: 90px;
   align-self: flex-start;
}

/* Slide animation */
.slide-enter-active,
.slide-leave-active {
   transition: all 0.3s ease;
   overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
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