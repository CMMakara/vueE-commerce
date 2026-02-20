import api from "@/api/http";
import { ref } from "vue"

const END_POINT = "/api/products";

export const allProductStore = ('allProduct', () => {

   let allProducts = ref([]);
   
   async function getAllProduct() {
      let res = await api.get(`${END_POINT}`);
      allProducts.value = res.data.data;
      console.log(res.data.data);
   }

   return { allProducts, getAllProduct }
})