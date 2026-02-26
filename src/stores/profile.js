import api from "@/api/http";
import { defineStore } from "pinia";
import { ref,reactive } from "vue";
export const useProfileStore = defineStore("profile", () => {

    // ------------------------state
    
    const profile = ref([]);
    const OwnProduct = ref([])
    const pt = reactive({
        current_page: 1,
        last_page: 0,

    })
    const paymentPaginate = reactive({
        current_page: 0,
        last_page: 0,
    })
    //---------------------fetch Profile
    const fetchProfile = async () =>{
        try{

            const res = await api.get("/api/me")
            profile.value = res.data.data;
        }catch(e){
            console.error(e.response) 
        }
    }
    const fetchOwnProduct = async (page, per_page) => {
        try {
            const res = await api.get(`/api/profile/products?page=${page}&per_page=${per_page}`);
            OwnProduct.value = res.data.data
            pt.current_page = res.data.paginate.current_page
            pt.last_page = res.data.paginate.last_page
        } catch (e) {
            console.error(e);
        }
    }
    const myPayment = ref([]);
    const myTotal = ref([])
    const fetchPayment = async (page, per_payment) => {
        try {
            const res = await api.get(`/api/profile/payment-check?page=${page}&per_page=${per_payment}`);
            myPayment.value = res.data.data
            myTotal.value = res.data
            paymentPaginate.current_page = res.data.paginate.current_page;
            paymentPaginate.last_page = res.data.paginate.last_page;
            console.log(res);

        } catch (e) {
            console.error(e);
        }
    }
    const myPurchase = ref([])
    const fetchPurchase = async() =>{
        try{
            const res = await api.get('/api/profile/purchased');
            myPurchase.value = res.data.data
            console.log("myPurchase.value:", res);
        }catch(e){
            console.error(e);
        }
    }


    return {profile,fetchProfile,fetchOwnProduct,OwnProduct,fetchPayment,myPayment,myTotal,fetchPurchase,myPurchase,pt,paymentPaginate}
})