import api from "@/api/http";
import { defineStore } from "pinia"; // Ensure defineStore is imported
import { ref } from "vue";

const END_POINT = "/api/products";

export const allProductStore = defineStore('allProduct', () => {
   let allProducts = ref([]);
   const lastPage = ref(0);

   async function getAllProduct({ page = 1, per_page = 5, sortDir = 'asc' } = {}) {
      let res = await api.get(`${END_POINT}`, {
         params: { page, per_page, sortDir }
      });

      const newData = res.data.data;

      if (page === 1) {
         // Reset list for the first page
         allProducts.value = newData;
      } else {
         // Append new data to the existing list
         allProducts.value = [...allProducts.value, ...newData];
      }

      lastPage.value = res.data.paginate?.last_page || 1;
      
      // Return data so the component knows if it received items
      return newData;
   }

   return { allProducts, getAllProduct, lastPage };
});