import api from "@/api/http";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useProfileStore = defineStore("profile", () => {

    // ------------------------state
    
    const profile = ref([]);
    const OwnProduct = ref([])
    //---------------------fetch Profile
    const fetchProfile = async () =>{
        try{

            const res = await api.get("/api/me")
            profile.value = res.data.data;
        }catch(e){
            console.error(e.response) 
        }
    }
    const fetchOwnProduct = async()=>{
        try{
            const res = await api.get('/api/profile/products?page=1&per_page=20');
            // console.log(res);
            OwnProduct.value = res.data.data
        }catch(e){
            console.error(e);
        }
    }
    const myPayment = ref([]);
    const myTotal = ref([])
    const fetchPayment = async() =>{
        try{
            const res = await api.get('/api/profile/payment-check');
            myPayment.value = res.data.data
            myTotal.value = res.data
            console.log(myPayment.value);
            
        }catch(e){
            console.error(e);
        }
    }



    return {profile,fetchProfile,fetchOwnProduct,OwnProduct,fetchPayment,myPayment,myTotal}
})