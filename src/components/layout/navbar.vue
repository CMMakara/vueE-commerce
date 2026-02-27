<template>
   <header>
      <nav class="navbar fixed-top mt-3" style="z-index: 1000">
         <div class="container d-flex">
            <!-- LEFT SIDE (RED) -->
            <div class="d-flex align-items-center px-4 py-2 text-black rounded shadow-sm navbar-bg">
               <router-link :to="{ name: 'product' }" class="navbar-brand fw-bold me-4">Commerce_</router-link>
               <ul class="navbar-nav flex-row gap-3">
                  <li class="nav-item">
                     <router-link exact-active-class="active" :to="{ name: 'shop' }"
                        class="nav-link rounded text-black">Shop</router-link>
                  </li>
                  <li class="nav-item">
                     <router-link exact-active-class="active" :to="{ name: 'seller' }"
                        class="nav-link rounded text-black">Seller</router-link>
                  </li>
                  <li class="nav-item">
                     <router-link exact-active-class="active" :to="{ name: 'support' }"
                        class="nav-link rounded text-black" href="#">Support</router-link>
                  </li>
               </ul>
            </div>

            <!-- RIGHT SIDE (BLUE) -->
            <div class="d-flex align-items-center gap-3 px-3 py-2 text-black shadow-sm rounded navbar-bg">
               <!-- <button class="btn border-0 bg-transparent text-black me-2">
                  <i class="bi bi-search"></i>
               </button> -->
               <router-link :to="{ name: 'cart' }" type="button"
                  class="btn border-0 p-0 position-relative bg-transparent me-2">
                  <i class="bi bi-cart fs-4 text-white"></i>
                  <span class="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                     style="top: 10px" v-if="counted">
                     {{ counted }}
                  </span>
               </router-link>

               <router-link :to="{ name: 'profile' }" class="btn border-0 bg-transparent text-black" v-if="isCheck">
                  <img :src="profileStore.profile?.avatar" alt="" class="bg-black rounded-circle"
                     style="width: 35px; height: 35px" />
               </router-link>
               <router-link :to="{ name: 'login' }" class="btn btn-secondary btn-sm text-primary fw-bold px-4 rounded"
                  v-else>Login</router-link>
               <button class="Btn" v-if="isCheck" @click="openModal">
                  <div class="sign">
                     <svg viewBox="0 0 512 512">
                        <path
                           d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                        </path>
                     </svg>
                  </div>
                  <div class="text">Logout</div>
               </button>
            </div>
         </div>
      </nav>
      <BaseModal v-if="show" header="Confirm Logout" @close="show = false">
         <template #content>
            <div class="text-center py-3">
               <i class="bi bi-box-arrow-left text-danger" style="font-size: 60px;"></i>
               <p class="mt-3 mb-0 fs-5">Are you sure you want to logout?</p>
            </div>
         </template>

         <template #footer>
            <button class="btn btn-secondary" @click="show = false">
               Cancel
            </button>

            <button class="btn btn-danger d-flex align-items-center gap-2" @click="handleLogout">
               <i class="bi bi-box-arrow-in-right"></i>
               Logout
            </button>
         </template>
      </BaseModal>
   </header>
</template>

<script setup>
import { UseAuthStore } from "@/stores/auth";
import { computed, ref, onMounted } from "vue";
import BaseModal from "../ui/BaseModal.vue";
import { notify } from "@/util/toast";
import { useCartStore } from "@/stores/cart";
import { useProfileStore } from "@/stores/profile";

const auth = UseAuthStore();
let cartStore = useCartStore();
let profileStore = useProfileStore();

onMounted(async () => {
   await profileStore.fetchProfile();
});

onMounted(async () => {
   await cartStore.fetchCart();
});
let isCheck = computed(() => auth.isLogin);
let show = ref(false);

function openModal() {
   show.value = true;
}
let counted = computed(() =>
   cartStore.items.length > 0 ? cartStore.items.length : false,
);

async function handleLogout() {
   await auth.logout();
   notify.sucess("Logout Success", "/");
   show.value = false;
}
</script>

<style scoped>
.navbar-bg {
   /* background-color: color-mix(in srgb, var(--bs-primary) 10%, rgb(255, 255, 255) 10%); */
   background-color: hsl(from var(--bs-black) h s l);
   backdrop-filter: blur(10px);
}

.nav-link,
.navbar-brand {
   font-size: 1rem;
   color: hsl(from var(--bs-white) h s l) !important;
}

.badge {
   font-size: 0.5rem;
}

.Btn {
   display: flex;
   align-items: center;
   justify-content: flex-start;
   width: 35px;
   height: 35px;
   border: none;
   border-radius: 50%;
   cursor: pointer;
   position: relative;
   overflow: hidden;
   transition-duration: 0.3s;
   box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
   background-color: rgb(255, 65, 65);
}

.btn-secondary-cancel {
   border: none;
   background-color: hsl(from var(--bs-gray) h s 30%);
}

/* plus sign */
.sign {
   width: 100%;
   transition-duration: 0.3s;
   display: flex;
   align-items: center;
   justify-content: center;
}

.sign svg {
   width: 17px;
}

.sign svg path {
   fill: white;
}

/* text */
.text {
   position: absolute;
   right: 0%;
   width: 0%;
   opacity: 0;
   color: white;
   font-size: 1rem;
   font-weight: 600;
   transition-duration: 0.3s;
}

/* hover effect on button width */
.Btn:hover {
   width: 125px;
   border-radius: 40px;
   transition-duration: 0.3s;
}

.Btn:hover .sign {
   width: 30%;
   transition-duration: 0.3s;
   padding-left: 20px;
}

/* hover effect button's text */
.Btn:hover .text {
   opacity: 1;
   width: 70%;
   transition-duration: 0.3s;
   padding-right: 10px;
}

/* button click effect*/
.Btn:active {
   transform: translate(2px, 2px);
}

.active {
   background-color: hsl(from var(--bs-primary) h s l);
   color: hsl(from var(--bs-black) h s l) !important;
   padding-inline: 20px;
   transition: all 0.4s ease;
   font-weight: bold;
}
</style>
