import api from "@/api/http";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
export const useProfileStore = defineStore("profile", () => {

    // ------------------------state

    const profile = ref([]);
    const OwnProduct = ref([])
    let total = ref(0)
    const pt = reactive({
        current_page: 1,
        last_page: 0,

    })
    const paymentPaginate = reactive({
        current_page: 0,
        last_page: 0,
    })
    //---------------------fetch Profile
    const fetchProfile = async () => {
        try {

            const res = await api.get("/api/me")
            profile.value = res.data.data;
        } catch (e) {
            console.error(e.response)
        }
    }

    async function fetchOwnProduct({
        page,
        per_page=20,
        sortBy = 'created_at',
        sortDir = 'desc'
    } = {}) {
        try {
            const res = await api.get('/api/profile/products', {
                params: {
                    page,
                    per_page,
                    sort: sortBy,
                    order: sortDir
                }
            })

            // ensure new product on top (Vue-safe)
            OwnProduct.value = [...res.data.data].sort(
                (a, b) =>
                    new Date(b[sortBy].replace(' ', 'T')) -
                    new Date(a[sortBy].replace(' ', 'T'))
            )

            total.value = res.data.paginate.total
            pt.current_page = res.data.paginate.current_page
            pt.last_page = res.data.paginate.last_page
        } catch (e) {
            console.error(e)
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
<<<<<<< HEAD
=======
          
>>>>>>> d05f70eade608543a7b948dd3c70c67fb57c5f73

        } catch (e) {
            console.error(e);
        }
    }
    const myPurchase = ref([])
    const fetchPurchase = async () => {
        try {
            const res = await api.get('/api/profile/purchased');
            myPurchase.value = res.data.data
<<<<<<< HEAD
            console.log("myPurchase.value:", res);
        } catch (e) {
=======
        }catch(e){
>>>>>>> d05f70eade608543a7b948dd3c70c67fb57c5f73
            console.error(e);
        }
    }


    return { profile, fetchProfile, fetchOwnProduct, OwnProduct, fetchPayment, myPayment, myTotal, fetchPurchase, myPurchase, pt, paymentPaginate, total }
})