<template>
  <div class="bg-sky-300 h-screen flex justify-center px-4 items-center">
    <div
      class="w-250 h-175 bg-sky-200 p-15 rounded-4xl shadow-xl flex overflow-hidden gap-2 w-full"
    >
      <RouterLink
        class="bg-red-300 rounded-2xl border-2 w-400 h-20 hover:cursor-pointer rounded-4xl text-center text-5xl"
        >Play</RouterLink
      >
      <RouterLink
        to="/team"
        class="bg-red-300 rounded-2xl border-2 w-400 h-20 hover:cursor-pointer rounded-4xl text-center text-5xl"
        >Choose Team</RouterLink
      >
      <RouterLink
        to="/roll"
        class="bg-red-300 rounded-2xl border-2 w-400 h-20 hover:cursor-pointer rounded-4xl text-center text-5xl"
        >Roll Players</RouterLink
      >
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
