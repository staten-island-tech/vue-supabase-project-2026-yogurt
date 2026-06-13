<template>
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden w-64">
        <img :src="props.img" referrerpolicy="no-referrer" class="w-full object-cover" />
        <div class="p-4 flex flex-col gap-2">
            <h2 class="text-xl font-bold text-gray-800">{{ props.name }}</h2>
            <div class="flex items-center justify-between">
                <span class="text-gray-500 text-sm">Overall</span>
                <span class="bg-red-400 text-white font-bold px-3 py-1 rounded-full text-sm">{{ props.overall }}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-gray-500 text-sm">Position</span>
                <span class="text-gray-800 font-semibold text-sm">{{ props.pos }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    name: { type: String },
    img: { type: String },
    overall: { type: Number },
    pos: {type: String}
})

</script>

<style scoped>

</style>