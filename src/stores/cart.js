import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    loading: false,
  }),

  actions: {
    async fetchCart() {
      this.loading = true;
      try {
        const response = await axios.get("/api/carts");
        this.items = response.data.data;
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        this.loading = false;
      }
    },

    async removeItem(id) {
      try {
        await axios.delete(`/api/carts/${id}`);
        this.items = this.items.filter((item) => item.id !== id);
      } catch (error) {
        console.error("Failed to remove item:", error);
      }
    },

    increaseQty(item) {
      item.quantity++;
    },

    decreaseQty(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },

    getTotalItems() {
      return this.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    getSubtotal() {
      return this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    getTax() {
      return this.getSubtotal() * 0.08;
    },

    getTotal() {
      return this.getSubtotal() + this.getTax();
    },

    isEmpty() {
      return this.items.length === 0;
    },
  },
});