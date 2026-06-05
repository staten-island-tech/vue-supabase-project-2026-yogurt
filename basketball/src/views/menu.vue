<template>
  <div class="min-h-screen bg-sky-300 flex items-center justify-center p-4">
    <div class="bg-sky-200 w-full max-w-3xl rounded-3xl shadow-2xl p-10 flex flex-col gap-6">
      <h1 class="text-5xl font-bold text-center mb-4">Basketball Manager</h1>
      <RouterLink
        class="bg-red-400 hover:bg-red-500 text-white text-3xl font-bold py-6 rounded-2xl text-center transition duration-200 shadow-lg"
        >Play</RouterLink
      >
      <RouterLink
        to="/team"
        class="bg-red-400 hover:bg-red-500 text-white text-3xl font-bold py-6 rounded-2xl text-center transition duration-200 shadow-lg"
        >Choose Team</RouterLink
      >
      <RouterLink
        to="/roll"
        class="bg-red-400 hover:bg-red-500 text-white text-3xl font-bold py-6 rounded-2xl text-center transition duration-200 shadow-lg"
        >Roll Players</RouterLink
      >
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
