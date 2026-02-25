<template>

    <div class="page-wrapper">

        <!-- Tabs -->
        <div class="tab-pills">
            <button :class="{ 'btn': true, 'btn-primary': openUi, 'rounded-5': true, 'px-4': true, 'py-2': true }"
                @click="openProduct">Product</button>
            <button :class="{ 'btn': true, 'btn-primary': !openUi, 'rounded-5': true, 'px-4': true, 'py-2': true }"
                @click="openPayment">Payment</button>

        </div>

        <!-- TAB PANEL 1 -->
        <div id="tab-products" v-if="openUi">

            <!-- Title Row -->
            <div class="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h4 class=" ">All Product</h4>
                    <p class="page-subtitle">product Owner</p>
                </div>
                <button class="btn btn-primary">
                    <i class="bi bi-patch-plus"></i>
                    New Product
                </button>
            </div>

            <!-- Stat Cards -->
            <div class="row g-3">
                <!-- Total Products -->
                <div class="col-12 col-md-4">
                    <div class="stat-card bg-primary-subtle rounded  h-100 border-1 border-primary">
                        <div class="stat-icon blue">
                            <i class="bi bi-box"></i>
                        </div>
                        <div class="">
                            <div class="stat-label">Product Items</div>
                            <div class="stat-value blue">{{ getProfile.OwnProduct.length }}</div>
                        </div>
                    </div>
                </div>

                <!-- Total Value -->
                <div class="col-12 col-md-4">
                    <div class="stat-card bg-warning-subtle rounded h-100 ">
                        <div class="stat-icon green">
                            <i class="bi bi-currency-dollar"></i>
                        </div>
                        <div>
                            <div class="stat-label">Total</div>
                            <div class="stat-value green">$00</div>
                        </div>
                    </div>
                </div>

                <!-- Active Products -->
                <div class="col-12 col-md-4 ">
                    <div class="stat-card bg-success-subtle rounded h-100">
                        <div class="stat-icon purple">
                            <i class="bi bi-database-fill-up"></i>
                        </div>
                        <div>
                            <div class="stat-label">Sell</div>
                            <div class="stat-value purple">0</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Product Table -->
            <div class="table-card mt-4">
                <div class="table-header d-flex justify-content-between align-items-center mb-3">
                    <h5 class="table-title mb-0">Items</h5>

                </div>

                <div class="table-responsive">
                    <table class="table table-custom rounded-3 align-middle mb-0">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Create At</th>
                                <th scope="col">Thumbnail</th>
                                <th scope="col" class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in getProfile.OwnProduct" :key="item.id">
                                <th scope="row">{{ item.id }}</th>
                                <td>{{ item.title }}</td>
                                <td>
                                    <span v-for="cat in item.categories" :key="cat.id"
                                        class="badge bg-primary-subtle p-2 text-danger me-1">
                                        {{ cat.name || 'null' }}
                                    </span>
                                </td>
                                <td class="text-primary">$ {{ item.price }}</td>
                                <td> {{ new Date(item.created_at).toLocaleDateString('km-KH') }}</td>
                                <td>
                                    <img :src="item.image" alt="" style="width: 60px; border-radius: 10px;">
                                </td>
                                <td class="text-center">
                                    <button class="btn "><i class="bi bi-pencil-square text-warning"></i></button>
                                    <button class="btn"><i class="bi bi-trash3 text-danger"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="">
                    <BasePagination :totalPage=getProfile.pt.last_page :current=getProfile.pt.current_page
                        @update:page=handleNexPage></BasePagination>
                </div>

            </div><!-- /table-card -->

        </div><!-- /tab-products -->

        <!-- TAB PANEL 2: អទ្ធម័គការនិក្ខេ -->
        <div id="tab-history" v-else>

            <div class="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h4 class="">Payment Checked</h4>
                    <p class="page-subtitle fw-build">View withdrawal history</p>
                </div>
            </div>

            <!-- History Stat Cards -->
            <div class="row g-3">
                <div class="col-12 col-md-4">
                    <div class="stat-card bg-primary-subtle rounded h-100">
                        <div class="stat-icon purple"><i class="bi bi-shop-window"></i></div>
                        <div>
                            <div class="stat-label">Orders</div>
                            <div class="stat-value purple">{{ getProfile.myTotal.paginate.total }}</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="stat-card bg-success-subtle rounded h-100">
                        <div class="stat-icon green"><i class="bi bi-journal-check"></i></div>
                        <div>
                            <div class="stat-label">Approve</div>
                            <div class="stat-value green">9</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="stat-card h-100" style="background:#fff7ed;">
                        <div class="stat-icon"
                            style="background:#fed7aa;color:#ea580c;width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">
                            <i class="bi bi-shield-x"></i>
                        </div>
                        <div>
                            <div class="stat-label">Reject Payment</div>
                            <div class="stat-value" style="color:#ea580c;">3</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- History Table -->
            <div class="table-card mt-4">
                <div class="table-header d-flex justify-content-between align-items-center mb-3">
                    <h5 class="table-title mb-0  p-3 bg-primary-subtle rounded">Sell</h5>
                    <input type="text" class="form-control search-input" placeholder="ស្វែងរក..." />
                </div>
                <div class="table-responsive">
                    <table class="table table-custom align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date/Time</th>
                                <th>Buyer</th>
                                <th>Thumbnail</th>
                                <th>Price</th>
                                <th class="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="own in getProfile.myPayment" :key="own.id">
                                <th>{{ own.id }}</th>
                                <td>{{ new Date(own.created_at).toLocaleDateString('km-KH') }}</td>
                                <td>
                                    <span class="me-2">
                                        <img :src="own.buyer?.avatar" style="width: 20px; border-radius: 50%;" alt="">
                                    </span>
                                    <span>
                                        {{ own.buyer?.name }}
                                    </span>
                                </td>
                                <td>
                                    <img :src="own.product?.image" style="width: 50px; border-radius: 10px;" alt="">
                                </td>
                                <td class="fw-bold text-success">
                                    ${{  Number(own.price) * (own.qty) }}
                                </td>
                                <td>
                                    <a class="btn bg-primary-subtle me-3">Ap</a>
                                    <a class="btn bg-success-subtle">Rej</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- pagination -->
                <div class="">
                    <BasePagination :totalPage=getProfile.paymentPaginate.last_page :current= getProfile.paymentPaginate.current_page
                        @update:page=handleNexPayment></BasePagination>
                </div>

            </div>

        </div><!-- /tab-history -->

    </div>

</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useProfileStore } from '@/stores/profile';
import BasePagination from '../ui/BasePagination.vue';
const getProfile = useProfileStore();
const per_page = ref(10);
const per_payment = ref(10)
onMounted(async () => {
    await getProfile.fetchOwnProduct(1, per_page.value);
    await getProfile.fetchPayment(1,per_payment.value)
})

let openUi = ref(true)
function openProduct() {
    openUi.value = true;
}
function openPayment() {
    openUi.value = false;
}
const handleNexPage = async (page) => {
    await getProfile.fetchOwnProduct(page, per_page.value)
}
const handleNexPayment = async(page)=>{
    await getProfile.fetchPayment(page,per_payment.value)
}

</script>

<style scoped>
body {
    background: var(--body-bg);
    font-family: 'Hanuman', serif;
    color: #1e293b;
}

.bg-primary-light {
    background-color: var(--primary-light);
}

.page-wrapper {
    max-width: 960px;
    margin: 40px auto;
    padding: 0 20px;
}

/* Tabs */
.tab-pills {
    display: inline-flex;
    background: #fff;
    border-radius: 50px;
    padding: 5px;
    gap: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .08);
    margin-bottom: 28px;
}

.tab-pill {
    padding: 8px 22px;
    border-radius: 50px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    background: transparent;
    color: #64748b;
    transition: all .2s;
}

.tab-pill.active {
    background: var(--primary);
    color: #fff;
}

/* Header Row */
.page-title {
    font-size: 2rem;
    font-weight: 900;
    color: #0f172a;
    margin-bottom: 4px;
}

.page-subtitle {
    font-size: 14px;
    color: #94a3b8;
    margin-bottom: 28px;
}

.btn-add {
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 10px 24px;
    font-family: 'Hanuman', serif;
    font-weight: 700;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background .2s, transform .15s;
    white-space: nowrap;
}

.btn-add:hover {
    background: #1d4ed8;
    color: #fff;
    transform: translateY(-1px);
}

/* Stat Cards */
.stat-card {
    border-radius: var(--card-radius);
    padding: 24px 28px;
    display: flex;
    align-items: center;
    gap: 18px;
    border: none;
}

.stat-card.blue {
    background: var(--primary-light);
}

.stat-card.green {
    background: var(--green-light);
}

.stat-card.purple {
    background: var(--purple-light);
}

.stat-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
}

.stat-icon.blue {
    background: #dbeafe;
    color: var(--primary);
}

.stat-icon.green {
    background: #bbf7d0;
    color: var(--green-text);
}

.stat-icon.purple {
    background: #e9d5ff;
    color: var(--purple-text);
}

.stat-label {
    font-size: 13px;
    font-weight: 700;
    color: #475569;
    margin-bottom: 4px;
}

.stat-value {
    font-size: 26px;
    font-weight: 900;
    line-height: 1;
}

.stat-value.blue {
    color: #1e40af;
}

.stat-value.green {
    color: var(--green-text);
}

.stat-value.purple {
    color: var(--purple-text);
}

/* Table Card */
.table-card {
    background: #fff;
    border-radius: var(--card-radius);
    padding: 24px 28px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .06);
}

.table-title {
    font-size: 16px;
    font-weight: 900;
    color: #0f172a;
}

.search-input {
    border-radius: 50px;
    border: 1.5px solid #e2e8f0;
    font-family: 'Hanuman', serif;
    font-size: 13px;
    padding: 6px 16px;
    width: 180px;
    outline: none;
    transition: border .2s;
}

.search-input:focus {
    border-color: var(--primary);
    box-shadow: none;
}

.table-custom thead tr {
    background: #f8fafc;
}

.table-custom thead th {
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: .05em;
    color: #94a3b8;
    border-bottom: 2px solid #e2e8f0;
    padding: 12px 16px;
}

.table-custom tbody td,
.table-custom tbody th {
    font-size: 14px;
    color: #334155;
    padding: 14px 16px;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
}

.table-custom tbody tr:last-child td,
.table-custom tbody tr:last-child th {
    border-bottom: none;
}

.table-custom tbody tr:hover {
    background: #f8fafc;
}

.badge-handle {
    background: var(--primary-light);
    color: var(--primary);
    border-radius: 50px;
    padding: 3px 12px;
    font-size: 12px;
    font-weight: 700;
}

.btn-action {
    border: none;
    background: transparent;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    cursor: pointer;
    transition: background .15s, color .15s;
    margin: 0 2px;
}

.btn-action.edit {
    color: var(--primary);
}

.btn-action.edit:hover {
    background: var(--primary-light);
}

.btn-action.delete {
    color: #ef4444;
}

.btn-action.delete:hover {
    background: #fee2e2;
}

.page-info {
    font-size: 13px;
    color: #94a3b8;
}

.pagination .page-link {
    border-radius: 8px !important;
    border: 1.5px solid #e2e8f0;
    color: #475569;
    font-size: 13px;
    margin: 0 2px;
}

.pagination .page-item.active .page-link {
    background: var(--primary);
    border-color: var(--primary);
    color: #fff;
}

/* Status Badges */
.status-badge {
    display: inline-block;
    padding: 4px 14px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 700;
}

.status-badge.approved {
    background: #dcfce7;
    color: #16a34a;
}

.status-badge.rejected {
    background: #fee2e2;
    color: #dc2626;
}

.status-badge.pending {
    background: #fff7ed;
    color: #ea580c;
}

/* Tab fade animation */
.tab-content-panel {
    animation: fadeIn .25s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(6px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>