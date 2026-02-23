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
   <button @click.stop="action" :class="`${isFilter ? 'w-100' : ''} ${btnStyle}`" class="btn btn-sm px-3 text-nowrap"><i class="bi" :class="icon"></i>&nbsp;{{ nameBtn }}</button>
</template>

<style scoped>
</style>