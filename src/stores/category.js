import api from "@/api/http";
import { defineStore } from "pinia";
import { ref } from "vue";

export const UseCategoryStore = defineStore('category', () =>{
  const categoryName = ref([]);

  const fetchCategory = async () =>{
    let res = await api.get('/api/categories')
    categoryName.value = res.data.data
  }

  
  return {categoryName , fetchCategory}
})