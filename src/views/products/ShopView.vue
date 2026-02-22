<script setup lang="ts">
import BaseCard1 from '@/components/ui/BaseCard1.vue';
import BaseCarousel from '@/components/ui/BaseCarousel.vue';
import { UseCategoryStore } from '@/stores/category';
import { allProductStore } from '@/stores/products';
import { computed, onMounted, ref } from 'vue'

let filter = ref(false);

const allProducts = allProductStore();
const categoryStore = UseCategoryStore()
const src = ref([
   'https://i.pinimg.com/736x/46/5a/f8/465af86bba6ee6899f4b6f3cf0a1978d.jpg',
   'https://i.pinimg.com/736x/3a/cd/f5/3acdf58d1dad75bdc82275056dceeb8a.jpg',
   'https://i.pinimg.com/736x/04/fe/2b/04fe2baefdf95ef61493c0a361681218.jpg'
])

let page = ref(1);
let per_page = ref(100);
let sortDir = ref('desc');
const selectedCategories = ref([])
const isAllSelected = computed(()=>{
   return selectedCategories.value.length === 0
})
const toggleAll = () =>{
   selectedCategories.value = []
}
const filterProduct = computed(()=>{
   if(selectedCategories.value.length === 0){
      return allProducts.allProducts.value;
   }
   return allProducts.allProducts.value.filter(product =>
      product.categories.some(category => 
         selectedCategories.value.includes(category.name)
      )
   )
})
// const getCategoryName = (categories) =>{
//    return categories.map(category => category.name).join(",");
// }
onMounted(async () => {
   await allProducts.getAllProduct({ page: page.value, per_page: per_page.value, sortDir: sortDir.value });
   await categoryStore.fetchCategory();
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

   <section class="bg-primary-subtle mt-5 p-4">
      <div class="container">
         <h3 class="text-primary m-0 fw-bold">ALL Products</h3>
         <p class="text-secondary">Showing 8 of 8 products</p>
      </div>
   </section>

   <section class="mt-4">
      <div class="container">
         <button @click="isFilter" class="btn btn-dark py-2 pe-5 ps-2 rounded-4 fw-medium shadow-sm" style=""><i
               class="bi bi-filter-left"></i>&nbsp;<span>Filter</span></button>
         <div class="my-4"></div>
         <div class="row align-items-start">
            <Transition name="slide">
               <div v-if="filter" class="col-3 category-sidebar">
                  <div class="rounded-3 p-3 border bg-light">
                     <h5 class="fw-semibold mb-3">Category</h5>
                     <div class="form-check mb-2">
                        <input class="form-check-input" type="checkbox" id="category-all" :checked="isAllSelected" @change="toggleAll">
                        <label class="form-check-label" for="category-all">
                           All
                        </label>
                     </div>
                     <div class="form-check mb-2" v-for="option in categoryStore.categoryName" :key="option.id">
                        <input class="form-check-input" type="checkbox" :id="'category' + option.id" :value="option.name"
                           v-model="selectedCategories">
                        <label class="form-check-label" :for="'category' + option.id">
                           {{ option.name }}
                        </label>
                     </div>
                  </div>
               </div>
            </Transition>
            <div :class="filter ? 'col-9' : 'col-12'">
               <div class="row g-3">
                  <div :class="filter ? 'col-4' : 'col-3'" v-for="product in filterProduct"
                     :key="product.id">
                     <BaseCard1 :image="product.image" :title="product.title" :description="product.description"
                        :price="product.price" />
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