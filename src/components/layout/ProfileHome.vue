<template>
  <div class="d-flex justify-content-between align-items-center mb-5">
    <div>
      <h2 class="fw-bold mb-1 d-flex align-items-center">
        Welcome back, {{ getProfile.profile?.name ?? 'Guest' }}
      </h2>
      <p class="text-muted fs-6">Here’s your marketplace overview.</p>
    </div>
    <div>
      <button class="btn btn-primary me-2" @click="router.push('/addProduct')">
        <i class="bi bi-patch-plus"></i> Add Product
      </button>
    </div>
  </div>

  <!-- Overview Cards -->
  <div class="row g-4">
    <!-- My Products -->
    <div class="col-12 col-lg-6">
      <div class="card border-0 shadow-sm rounded-4 h-100 rounded-top-4">
        <div class="card-header text-white rounded-top-4" style="background: linear-gradient(45deg,#4e73df,#224abe);">
          <div class="d-flex align-items-center">
            <i class="bi bi-box-seam fs-4 me-2"></i>
            <h5 class="mb-0 fw-bold">My Products</h5>
          </div>
        </div>
        <div class="card-body p-4">
          <div class="row g-3">
            <!-- Total Products -->
            <div class="col-6">
              <div class="p-4 rounded-4 bg-light text-center h-100 stat-card">
                <template v-if="loading">
                  <div class="bg-secondary bg-opacity-25 rounded mb-2" style="height: 2rem; width: 60%; margin: 0 auto;"></div>
                  <div class="bg-secondary bg-opacity-25 rounded" style="height: 1rem; width: 40%; margin: 0.5rem auto;"></div>
                </template>
                <template v-else>
                  <i class="bi bi-archive-fill fs-2 text-primary mb-2"></i>
                  <div class="text-muted small">Total Products</div>
                  <h2 class="fw-bold mb-0">
                    {{ getProfile.OwnProduct?.length ?? 0 }}
                  </h2>
                </template>
              </div>
            </div>

            <!-- Total Approved Revenue -->
            <div class="col-6">
              <div class="p-4 rounded-4 bg-success bg-opacity-10 text-center h-100 stat-card">
                <template v-if="loading">
                  <div class="bg-secondary bg-opacity-25 rounded mb-2" style="height: 2rem; width: 60%; margin: 0 auto;"></div>
                  <div class="bg-secondary bg-opacity-25 rounded" style="height: 1rem; width: 40%; margin: 0.5rem auto;"></div>
                </template>
                <template v-else>
                  <i class="bi bi-currency-dollar fs-2 text-success mb-2"></i>
                  <div class="text-muted small">Approved Revenue</div>
                  <h2 class="fw-bold text-success mb-0">
                    $ {{
                      getProfile.myPayment
                        ?.filter(p => p.status === 2)
                        .reduce((t, p) => t + p.price, 0) ?? 0
                    }}
                  </h2>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- My Orders -->
    <div class="col-12 col-lg-6">
      <div class="card border-0 shadow-sm rounded-4 h-100">
        <div class="card-header text-white rounded-top-4" style="background: linear-gradient(45deg,#1cc88a,#13855c);">
          <div class="d-flex align-items-center">
            <i class="bi bi-bag-check fs-4 me-2"></i>
            <h5 class="mb-0 fw-bold">My Orders</h5>
          </div>
        </div>
        <div class="card-body p-4">
          <div class="row g-3">
            <!-- Total Orders -->
            <div class="col-6">
              <div class="p-4 rounded-4 bg-light text-center h-100 stat-card">
                <template v-if="loading">
                  <div class="bg-secondary bg-opacity-25 rounded mb-2" style="height: 2rem; width: 60%; margin: 0 auto;"></div>
                  <div class="bg-secondary bg-opacity-25 rounded" style="height: 1rem; width: 40%; margin: 0.5rem auto;"></div>
                </template>
                <template v-else>
                  <i class="bi bi-cart-fill fs-2 text-success mb-2"></i>
                  <div class="text-muted small">Total Orders</div>
                  <h2 class="fw-bold mb-0">{{ getProfile.myPurchase?.length ?? 0 }}</h2>
                </template>
              </div>
            </div>

            <!-- Completed Orders -->
            <div class="col-6">
              <div class="p-4 rounded-4 bg-success bg-opacity-10 text-center h-100 stat-card">
                <template v-if="loading">
                  <div class="bg-secondary bg-opacity-25 rounded mb-2" style="height: 2rem; width: 60%; margin: 0 auto;"></div>
                  <div class="bg-secondary bg-opacity-25 rounded" style="height: 1rem; width: 40%; margin: 0.5rem auto;"></div>
                </template>
                <template v-else>
                  <i class="bi bi-check-circle-fill fs-2 text-success mb-2"></i>
                  <div class="text-muted small">Completed</div>
                  <h2 class="fw-bold text-success mb-0">
                    {{ getProfile.myPurchase?.filter(o => o.status === 2).length ?? 0 }}
                  </h2>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Orders -->
  <div class="card border-0 shadow-sm rounded-4 p-4 mt-4">
    <h5 class="fw-bold mb-4">
      <i class="bi bi-activity me-2 text-primary"></i>
      Recent Orders
    </h5>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="py-4">
      <div v-for="n in 3" :key="n" class="d-flex justify-content-between align-items-center py-3 border-bottom">
        <div>
          <div class="bg-secondary bg-opacity-25 rounded mb-2" style="height: 1rem; width: 150px;"></div>
          <div class="bg-secondary bg-opacity-25 rounded" style="height: 0.8rem; width: 100px;"></div>
        </div>
        <div class="text-end">
          <div class="bg-secondary bg-opacity-25 rounded" style="height: 1rem; width: 50px; margin-left: auto;"></div>
          <div class="bg-secondary bg-opacity-25 rounded-pill mt-1" style="height: 1rem; width: 80px;"></div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="getProfile.myPurchase?.length === 0" class="text-center text-muted py-4">
      No recent orders.
    </div>

    <!-- Orders -->
    <div v-else>
      <div v-for="item in getProfile.myPurchase.slice(0, 3)" :key="item.id"
        class="d-flex justify-content-between align-items-center py-3 border-bottom">
        <div>
          <div class="fw-semibold">{{ item.product?.title }}</div>
          <small class="text-muted">{{ new Date(item.created_at).toLocaleDateString() }}</small>
        </div>
        <div class="text-end">
          <div class="fw-bold text-success fs-5">$ {{ item.price }}</div>
          <span class="badge rounded-pill px-3 py-2" :class="{
            'bg-warning text-dark': item.status === 1,
            'bg-success': item.status === 2,
            'bg-danger': item.status === 3
          }">
            {{
              item.status === 1 ? 'Pending'
              : item.status === 2 ? 'Approved'
              : 'Rejected'
            }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Top Products -->
  <div class="card dashboard-card mt-4 rounded-4 border-0 p-4">
    <h5 class="fw-bold mb-4"><i class="bi bi-star-fill me-2 text-warning"></i>Top Products</h5>

    <!-- Loading Skeleton -->
    <div class="row g-3" v-if="loading">
      <div v-for="n in 3" :key="n" class="col-12 col-md-4">
        <div class="card p-3 h-100 hover-card border-0 shadow-sm rounded-3">
          <div class="bg-secondary bg-opacity-25 rounded mb-2" style="height: 150px;"></div>
          <div class="bg-secondary bg-opacity-25 rounded mb-1" style="height: 1rem; width: 70%;"></div>
          <div class="bg-secondary bg-opacity-25 rounded" style="height: 1rem; width: 50%;"></div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="getProfile.OwnProduct?.length === 0" class="text-center text-muted py-4">
      No products yet.
    </div>

    <!-- Products -->
    <div v-else class="row g-3">
      <div v-for="product in getProfile.OwnProduct.slice(0, 3)" :key="product.id" class="col-12 col-md-4">
        <div class="card p-3 h-100 hover-card border-0 shadow-sm rounded-3">
          <img :src="product.image" alt="" class="img-fluid rounded mb-2" />
          <div class="fw-semibold">{{ product.title }}</div>
          <div class="text-muted small">$ {{ product.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile';
import { onMounted, ref } from 'vue';
import router from '@/router';

const getProfile = useProfileStore();
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  await getProfile.fetchOwnProduct();
  await getProfile.fetchPurchase();
  loading.value = false;
});
</script>

<style scoped>
.shadow:hover {
  transform: translateY(-5px);
  transition: 0.3s ease;
}

.wave {
  display: inline-block;
  animation: wave-animation 2s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave-animation {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
</style>