import api from "@/api/http";
import { defineStore } from "pinia";
import { ref } from "vue";

export const UseProductStore = defineStore('product' , ()=>{
  const product = ref([]);

  const fetchProduct = async () =>{
    const res = await api.get('/api/products')
    product.value = res.data.data
  }


  return {product , fetchProduct}
})