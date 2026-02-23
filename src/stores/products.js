import api from "@/api/http";
import { ref } from "vue"

const END_POINT = "/api/products";

export const allProductStore = ('allProduct', () => {

   let allProducts = ref([]);
   let ownProduct = ref([]);
   let total = ref(0);
   async function getAllProduct({page = 1, per_page = 5, sortDir = 'asc'} = {}) {
      let res = await api.get(`${END_POINT}`, {
         params: {
            page,
            per_page,
            sortDir,
         }
      });
      allProducts.value = res.data.data;
   }

   async function getOwnProduct({sortDir = 'asc'} = {}) {
      let res = await api.get('/api/profile/products', {
         params : {
            sortDir
         }
      })
      ownProduct.value = res.data.data
      total.value = res.data.paginate.total
      console.log(ownProduct.value);
   }

   return { allProducts, getAllProduct , ownProduct , getOwnProduct , total}
})