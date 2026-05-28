<template>
  <div class="bg-teal-200 h-screen">
    <div class="w-full max-w-md p-25 flex-col flex bg-red-500 ">
      <RouterLink class="bg-red-300 rounded-2xl border-2 w-50 p-5">Play</RouterLink>
      <RouterLink to="/team" class="w-117 h-10 bg-red-400 hover:cursor-pointer rounded-4xl"
        >Choose Team</RouterLink
      >
      <RouterLink to="/roll" class="w-117 h-10 bg-red-400 hover:cursor-pointer rounded-4xl"
        >Roll Players</RouterLink
      >
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
