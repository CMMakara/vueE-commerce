import api from "@/api/http";
import { ref } from "vue"

const END_POINT = "/api/products";

export const allProductStore = ('allProduct', () => {

   let allProducts = ref([]);
   const lastPage = ref(0);
   async function getAllProduct({page = 1, per_page = 5, sortDir = 'asc'} = {}) {
      let res = await api.get(`${END_POINT}`, {
         params: {
            page,
            per_page,
            sortDir,
         }
      });
      allProducts.value = res.data.data;
      lastPage.value = res.data.paginate?.last_page || 1;
      // console.log(lastPage.value);
      
      
   }
   return { allProducts, getAllProduct , lastPage }
})