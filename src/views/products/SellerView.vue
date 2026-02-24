<template>
  <div class="light-store bg-light min-vh-100 text-dark py-5">

    <div class="container position-relative">

      <div class="card border-0 shadow-sm mb-5 p-4 rounded-4 d-md-flex flex-row align-items-center gap-4 bg-white">
        <div class="avatar-wrapper">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX8VSe4ww-dpugdJQzw9YOA2RXzgescIam1A&s"
            class="rounded-4 border border-light border-3 shadow-sm" width="120" height="120">
        </div>

        <div class="mt-3 mt-md-0">
          <h1 class="display-6 fw-bold mb-1 text-dark"> seller.name</h1>
          <p class="text-primary mb-2 small fw-bold uppercase tracking-widest">seller.specialty</p>
          <div class="d-flex gap-3 text-muted">
            <span><strong class="text-dark">seller.sales</strong> Sales</span>
            <span class="text-light">|</span>
            <span><strong class="text-dark">seller.rating</strong> Rating</span>
          </div>
        </div>

        <div class="ms-auto mt-3 mt-md-0">
          <router-link :to="{name : 'profile'}" class="btn btn-primary rounded-pill px-4 fw-bold">View Portfolio</router-link>
        </div>
      </div>

      <div class="row g-4 mb-5">
        <div class="col-md-4" ">
          <div class=" card border-0 shadow-sm p-4 h-100 text-center bg-white">
          <h5 class="fw-bold text-dark">feature.title</h5>
          <p class="small text-muted mb-0">feature.desc</p>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-4 fw-bold text-dark">Active Assets 
      <span class="badge bg-dark fs-6">{{productStore.total}}</span>
      </h3>
      <router-link :to="{name : 'addProduct'}" class="btn btn-primary rounded-pill px-4 py-2 fw-bold">Add New product</router-link>
    </div>

    <div class="row g-4">
      <div class="col-12 col-md-6 col-lg-4" v-for="items in productStore.ownProduct.value" :key="items.id">
        <BaseCard1 :image="items.image" :title="items.title" :description="items.description"
          :price="items.price" />
      </div>
    </div>

  </div>
  </div>
</template>

<script setup>
import BaseCard1 from '@/components/ui/BaseCard1.vue';
import { allProductStore } from '@/stores/products';
import { onMounted } from 'vue';


let productStore = allProductStore()

onMounted(async () => {
  await productStore.getOwnProduct()
})


</script>

<style scoped>
.tracking-widest {
  letter-spacing: 0.15rem;
  text-transform: uppercase;
}
</style>