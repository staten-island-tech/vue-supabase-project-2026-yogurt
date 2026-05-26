<template>
    <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
        <img :src=props.img></img>
        <p>{{ props.name }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    name: { type: String },
    img: { type: String },
    overall: { type: Number },
})

</script>

<style scoped>

</style>