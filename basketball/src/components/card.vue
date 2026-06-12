<template>
    <div class="w-50 h-100 bg-gray-200 rounded-2xl mr-10">
        <img :src=props.img referrerpolicy="no-referrer" />
        <p>Name: {{ props.name }}</p>
        <p>Overall: {{ props.overall }}</p>
        <p>Positions: {{ props.pos }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    name: { type: String },
    img: { type: String },
    overall: { type: Number },
    pos: {type: Array, String}
})

</script>

<style scoped>

</style>