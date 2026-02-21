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
}
</style>