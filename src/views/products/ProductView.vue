<<<<<<< HEAD
<template>
  <div class="container py-4">
    <div class="mb-4">
      <h1 class="fw-bold" style="color: #8b3dff;">All Products</h1>
      <p class="text-muted">Showing {{ fitersProduct.length }}  of {{ totalProducts }} products</p>
    </div>
    <div class="card border border-light-subtle shadow-sm rounded-4 mb-4">
      <div class="card-body d-flex flex-wrap justify-content-between align-items-center gap-3 py-2 px-3">

        <div class="d-flex flex-wrap align-items-center gap-2">
          <span class="text-secondary d-flex align-items-center gap-2 me-2">
            <i class="bi bi-sliders"></i> Filters:
          </span>
          <button 
            @click="activeFilter = 'All'"
            :class="['btn btn-sm rounded-3 px-3 py-1', activeFilter === 'All' ? 'btn-active-purple' : 'btn-outline-secondary border-light-subtle text-dark']">
            All
          </button>
          <button v-for="category in categoryStore.categoryName" :key="category.id" 
          @click="activeFilter = category.name"
            :class="[
              'btn btn-sm rounded-3 px-3 py-1',
              activeFilter === category.name ? 'btn-active-purple' : 'btn-outline-secondary border-light-subtle text-dark'
            ]">
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-12 col-md-6 col-lg-3" v-for="items in fitersProduct" :key="items.id">
        <BaseCard :image="items.image" :category="getCategoryNames(items.categories)" :title="items.title" :price="items.price"></BaseCard>
      </div>
    </div>
  </div>


</template>

<script setup>
import BaseCard from '@/components/ui/BaseCard.vue';
import { UseCategoryStore } from '@/stores/category';
import { UseProductStore } from '@/stores/product';
import { computed, onMounted, ref } from 'vue';
let categoryStore = UseCategoryStore()
let productStore = UseProductStore()
onMounted(async () => {
  await categoryStore.fetchCategory()
})

onMounted(async () => { 
  await productStore.fetchProduct()
})

const activeFilter = ref('All');
const totalProducts = computed(() => productStore.product.length)

const getCategoryNames = (categories) => {
  return categories.map(cat => cat.name).join(', ')
}

const fitersProduct = computed(() => {
  if (activeFilter.value === 'All') {
    return productStore.product;
  }
  return productStore.product.filter(product => product.categories.some(category =>category.name === activeFilter.value))
})

</script>

<style scoped>
.btn-active-purple {
  background-color: #8b3dff;
  color: #fff;
  border-color: #8b3dff;
=======
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
   <div style="height: 120px;"></div>
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
>>>>>>> 0a8eb9f7ec87d2ce1ddbeced1db98d5d8cfe8d5d
}
</style>