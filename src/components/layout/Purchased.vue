<template>
    <div class="container py-4">
        <!-- FILTER BUTTONS -->
        <div class="d-flex gap-2 mb-4 flex-wrap bg-primary bg-opacity-10 rounded-4 p-3">
            <button class="btn rounded-pill px-3" :class="filter === 'all' ? 'btn-dark' : 'btn-outline-dark'"
                @click="filter = 'all'">All</button>
            <button class="btn rounded-pill px-3" :class="filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'"
                @click="filter = 'pending'">Pending</button>
            <button class="btn rounded-pill px-3" :class="filter === 'approved' ? 'btn-success' : 'btn-outline-success'"
                @click="filter = 'approved'">Approved</button>
            <button class="btn rounded-pill px-3" :class="filter === 'rejected' ? 'btn-danger' : 'btn-outline-danger'"
                @click="filter = 'rejected'">Rejected</button>
        </div>

        <!-- NO ORDERS MATCHING FILTER -->
        <div v-if="filteredOrders.length === 0"
            class="bg-secondary-subtle d-flex text-center justify-content-center align-items-center rounded-4"
            style="height: 200px;">
            <p class="text-secondary m-0">No orders for this status</p>
        </div>

        <!-- ORDERS -->
        <div v-else class="row g-4">
            <div class="col-12 col-md-6 col-lg-4" v-for="item in filteredOrders" :key="item.id">
                <div class="card order-card border-0 h-100">
                    <div class="position-relative overflow-hidden">
                        <img :src="item.product?.image || '/images/default.png'" class="w-100 order-img">
                        <span class="status-badge position-absolute top-0 end-0 m-3" :class="{
                            'status-pending': item.status === 1,
                            'status-approved': item.status === 2,
                            'status-rejected': item.status === 3,
                            'status-none': !item.status
                        }">
                            {{
                                item.status === 1 ? 'Pending' :
                                    item.status === 2 ? 'Approved' :
                                        item.status === 3 ? 'Rejected' :
                            'No Status'
                            }}
                        </span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h6 class="fw-bold mb-1">{{ item.product?.title }}</h6>
                        <small class="text-muted mb-2">{{ item.seller?.name }}</small>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between">
                                <span>Qty: {{ item.qty }}</span>
                                <span class="fw-bold text-success">${{ item.price }}</span>
                            </div>
                            <div class="order-progress mt-2">
                                <span
                                    :style="{ width: item.status === 1 ? '40%' : item.status === 2 ? '100%' : item.status === 3 ? '100%' : '0%' }"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'

const getProfile = useProfileStore()
const filter = ref('all')

// COMPUTED: Filter orders based on selected filter
const filteredOrders = computed(() => {
    if (!getProfile.myPurchase) return []

    return getProfile.myPurchase.filter(item => {
        if (!item.status || item.status === 0) {
            return filter.value === 'no-status' || filter.value === 'all'
        }
        if (filter.value === 'all') return true
        if (filter.value === 'pending' && item.status === 1) return true
        if (filter.value === 'approved' && item.status === 2) return true
        if (filter.value === 'rejected' && item.status === 3) return true
        return false
    })
})

// FETCH ORDERS ON MOUNT
onMounted(async () => {
    await getProfile.fetchOwnProduct()   // if needed
    await getProfile.fetchPurchase()     // fetch user orders
})
</script>

<style scoped>
.order-card {
    border-radius: 1rem;
    transition: transform 0.25s, box-shadow 0.25s;
}

.order-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.order-img {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    height: 180px;
    object-fit: cover;
}

.status-badge {
    padding: 0.35rem 0.7rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
}

.status-pending {
    background-color: #f6c23e;
    color: #000;
}

.status-approved {
    background-color: #1cc88a;
    color: #fff;
}

.status-rejected {
    background-color: #e74a3b;
    color: #fff;
}

.status-none {
    background-color: #6c757d;
    color: #fff;
}

.order-progress {
    background-color: #e9ecef;
    height: 6px;
    border-radius: 3px;
    overflow: hidden;
}

.order-progress span {
    display: block;
    height: 100%;
    background-color: #1cc88a;
    transition: width 0.3s ease;
}
</style>