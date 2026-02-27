<script setup>

defineProps({
   nameBtn: String,
   isFilter: Boolean,
   action: Function,
   icon: String,
   btnStyle: String,
})

</script>

<template>
   <button @click.stop="action" :class="`${isFilter ? '' : ''} ${btnStyle}`" class="btn btn-sm px-3 text-nowrap fw-medium"><i class="bi" :class="icon"></i>&nbsp;<span>{{ nameBtn }}</span></button>
</template>

<style scoped>
</style>