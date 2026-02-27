import { UseAuthStore } from "@/stores/auth";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import CartView from "@/views/cart/CartView.vue";
import CheckoutView from "@/views/cart/CheckoutView.vue";
import HomeView from "@/views/HomeView.vue";
import PaymentsView from "@/views/payments/PaymentsView.vue";
import AddProductView from "@/views/products/AddProductView.vue";
import EditProductView from "@/views/products/EditProductView.vue";
import ProductDetail from "@/views/products/ProductDetail.vue";
import ProductView from "@/views/products/ProductView.vue";
import SellerView from "@/views/products/SellerView.vue";
import ShopView from "@/views/products/ShopView.vue";
import ProfileView from "@/views/profile/ProfileView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/login",
         name: "login",
         component: LoginView,
      },
      {
         path: "/register",
         name: "register",
         component: RegisterView,
      },
      {
         path: "/",
         name: "home",
         component: HomeView,
         // meta: { requiresAuth: true },
         children: [
            {
               path: "/",
               name: "product",
               component: ProductView,
            },
            {
               path: "/profile",
               name: "profile",
               component: ProfileView,
               meta: { requiresAuth: true },
            },
            {
               path: "/cart",
               name: "cart",
               component: CartView,
               // meta: { requiresAuth: true },
            },
            {
               path: "/payment",
               name: "payment",
               component: PaymentsView,
               // meta: { requiresAuth: true },
            },
            {
               path: "/checkout",
               name: "checkout",
               component: CheckoutView,
               // meta: { requiresAuth: true },
            },
            {
               path: "/shop",
               name: "shop",
               component: ShopView,
               // meta: { requiresAuth: true },
            },
            {
               path: "/seller",
               name: "seller",
               component: SellerView,
               // meta: { requiresAuth: true },
            },
            {
               path: "/support",
               name: "support",
               component: ShopView
            },
            {
               path: "/addProduct",
               name: "addProduct",
               component: AddProductView,
               meta: { requiresAuth: true },
            },
            {
               path: "/editProduct/:id",
               name: "editProduct",
               component: EditProductView,
               meta: { requiresAuth: true },
            },
            {
               path: "/productDetail/:id",
               name: "productDetail",
               component: ProductDetail,
               // meta: { requiresAuth: true },
            },
            
         ],
      },
   ],
});

router.beforeEach((to, from) => {
   const auth = UseAuthStore();
   if (!auth.isLogin && to.meta.requiresAuth) {
      return { name: "login" };
   }
   return true;
});

export default router;
