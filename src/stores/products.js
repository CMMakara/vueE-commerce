import api from "@/api/http";
import { ref } from "vue"

const END_POINT = "/api/products";

export const allProductStore = ('allProduct', () => {

   let allProducts = ref([]);
   
   async function getAllProduct({page = 1, per_page = 5, sortDir = 'asc'} = {}) {
      let res = await api.get(`${END_POINT}`, {
         params: {
            page,
            per_page,
            sortDir,
         }
      });
      allProducts.value = res.data.data;
      console.log(res.data.data);
   }

   return { allProducts, getAllProduct }
})