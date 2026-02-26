import api from "@/api/http";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);
  const total = ref(0)
  const error = ref(null);
  const loading = ref(false);

  // Fetch cart 
  async function fetchCart() {
    error.value = null;
    try {
      const res = await api.get("/api/profile/carts");
      items.value = res.data.data.items ;
      total.value = res.data.data.total
      
    } catch (err) {
      error.value = err.response?.data?.message || "Something went wrong";
    }
  }

  //  Checkout 
 // cart.js
async function checkout(formData) {
  error.value = null;
  loading.value = true;

  try {
    const res = await api.post("/api/carts/checkout", formData);

    // Clear cart locally
    items.value = [];
    total.value = 0;

    // Optionally refetch cart from server to be sure
    await fetchCart();

    return res.data;
  } catch (err) {
    error.value = err.response?.data?.message || "Checkout failed";
    throw err; // important so your component knows checkout failed
  } finally {
    loading.value = false;
  }
}
 function clearCart() {
    items.value = [];
    total.value = 0;
  }

  async function addToCart(product_id, qty, formData = Object) {
    try {
      const res = api.post('/api/carts', formData)
      await fetchCart();
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return { items, error, loading, fetchCart, checkout , total, addToCart ,clearCart};
});