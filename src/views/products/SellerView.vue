<template>
  <div class="light-store bg-light min-vh-100 text-dark py-5">
    <div class="container position-relative">

      <!-- Skeleton Loader for profile -->
      <div v-if="isPageLoading" class="mb-5">
        <div class="skeleton skeleton-avatar mb-3"></div>
        <div class="skeleton skeleton-title mb-2"></div>
        <div class="skeleton skeleton-text mb-1"></div>
        <div class="skeleton skeleton-text" style="width: 150px;"></div>
      </div>

      <!-- Actual Profile Card -->
      <div v-else class="card border-0 shadow-sm mb-5 p-4 rounded-4 d-md-flex flex-row align-items-center gap-4 bg-white">
        <div class="avatar-wrapper">
          <img :src="productStore.profile.avatar"
               class="rounded-4 border border-light border-3 shadow-sm" width="120" height="120">
        </div>

        <div class="mt-3 mt-md-0 rounded">
          <h1 class="display-6 fw-bold mb-1 text-dark">{{ productStore.profile.name }}</h1>
          <p class="text-primary mb-2 small fw-bold uppercase tracking-widest">Electronics & Gadgets</p>
          <div class="d-flex gap-3 text-muted">
            <span><strong class="text-dark">125</strong> Sales</span>
            <span class="text-light">|</span>
            <span><strong class="text-dark">4.8</strong> Rating</span>
          </div>
        </div>

        <div class="ms-auto mt-3 mt-md-0">
          <router-link :to="{name : 'profile'}" class="btn btn-primary rounded-pill px-4 fw-bold">View Portfolio</router-link>
        </div>
      </div>

      <!-- Feature Section (example, dynamic can be added later) -->
      <div class="row g-4 mb-5">
        <div class="col-md-4" v-for="feature in features" :key="feature.id">
          <div class="card border-0 shadow-sm p-4 h-100 text-center bg-white">
            <h5 class="fw-bold text-dark">{{ feature.title }}</h5>
            <p class="small text-muted mb-0">{{ feature.desc }}</p>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-4 fw-bold text-dark">
          Active Assets 
          <span class="badge bg-dark fs-6">{{productStore.total}}</span>
        </h3>
        <router-link :to="{name : 'addProduct'}" class="btn btn-primary rounded-pill px-4 py-2 fw-bold">Add New Product</router-link>
      </div>

      <!-- Product Grid -->
      <div class="row g-4">
        <!-- Skeleton for products -->
        <template v-if="isPageLoading">
          <div class="col-12 col-md-6 col-lg-4" v-for="n in 6" :key="n">
            <div class="card border-0 shadow-sm p-4 h-100 bg-white">
              <div class="skeleton skeleton-image mb-3"></div>
              <div class="skeleton skeleton-text mb-2"></div>
              <div class="skeleton skeleton-text" style="width: 80%;"></div>
            </div>
          </div>
        </template>

        <!-- Actual products -->
        <div class="col-12 col-md-6 col-lg-4" v-else v-for="items in productStore.OwnProduct" :key="items.id">
          <BaseCard1 
            :id="items.id" 
            :image="items.image" 
            :title="items.title" 
            :description="items.description"
            :price="items.price" 
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import BaseCard1 from '@/components/ui/BaseCard1.vue';
import { useProfileStore } from '@/stores/profile';
import { onMounted, ref, reactive } from 'vue';

const productStore = useProfileStore();
const isPageLoading = ref(true);

// Example features, can be fetched dynamically later
const features = reactive([
  { id: 1, title: 'Feature 1', desc: 'Description 1' },
  { id: 2, title: 'Feature 2', desc: 'Description 2' },
  { id: 3, title: 'Feature 3', desc: 'Description 3' }
]);

onMounted(async () => {
  try {
    await Promise.all([
      productStore.fetchOwnProduct(1, 10),
      productStore.fetchProfile()
    ]);
  } finally {
    isPageLoading.value = false;
  }
});
</script>

<style scoped>
.tracking-widest {
  letter-spacing: 0.15rem;
  text-transform: uppercase;
}

/* Skeleton styles */
.skeleton {
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 12px;
}

.skeleton-avatar { width: 120px; height: 120px; border-radius: 50%; margin-bottom: 1rem; }
.skeleton-title { height: 30px; width: 50%; margin-bottom: 0.5rem; }
.skeleton-text { height: 15px; width: 100%; margin-bottom: 0.3rem; }
.skeleton-image { height: 180px; width: 100%; border-radius: 12px; margin-bottom: 0.5rem; }

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>