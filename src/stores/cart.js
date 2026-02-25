import api from "@/api/http";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);
  const error = ref(null);
  const loading = ref(false);

  // Fetch cart 
  async function fetchCart() {
    error.value = null;
    try {
      const res = await api.get("/api/profile/carts");
      items.value = res.data.data.items ;
    } catch (err) {
      error.value = err.response?.data?.message || "Something went wrong";
    }
  }

  //  Checkout 
  async function checkout() {
    error.value = null;
    loading.value = true;

    try {
      const res = await api.post("/api/carts/checkout");

      // Clear cart 
      items.value = [];
      // return response
      return res.data;
      
    } catch (err) {
      error.value = err.response?.data?.message || "Checkout failed";
    } finally {
      loading.value = false;
    }
  }

  // add to cart
  const cart = ref([]);
  function addToCart(product, qty =1 ){
    const exiting = cart.value.find(item => item.id === product.id);
    if(exiting){
      exiting.qty += qty;
    }
    else{
      cart.value.push({...product, qty});
    }
  }

  return { items, error, loading, fetchCart, checkout ,addToCart ,cart };
});