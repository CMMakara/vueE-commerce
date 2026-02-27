<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination ">
            <li class="page-item"><a class="page-link" @click="backPage" style="cursor: pointer;">Previous</a></li>
            <li class="page-item" v-for="total in totalPage" :key="total">
                <a class="page-link" style="cursor: pointer;" @click="gotoPage(total)">{{ total }}</a>
            </li>
            <!-- <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li> -->
            <li class="page-item"><a class="page-link" @click="nextPage" style="cursor: pointer;">Next</a></li>
        </ul>
    </nav>
</template>

<script setup>
import { ref, watch } from 'vue';

let emit = defineEmits(['update:page'])
const props = defineProps({
  totalPage: { type: Number, default: 1 },
  page: { type: Number, default: 1 }
})

const localPage = ref(props.page)
watch(() => props.page, (val) => {
  localPage.value = val
})
const nextPage = () => {
  if (localPage.value < props.totalPage) {
    localPage.value++
    emit('update:page', localPage.value)
  }
}

const backPage = () => {
  if (localPage.value > 1) {
    localPage.value--
    emit('update:page', localPage.value)
  }
}
const gotoPage = (page) => {
  localPage.value = page;
  emit('update:page', page)
}

</script>