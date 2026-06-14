<template>
  <div class="min-h-screen bg-sky-300 flex items-center justify-center p-4">
    <div class="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow font-bold text-gray-800">
      {{ store.dimes }} Dimes
    </div>
    <div class="bg-sky-200 w-full max-w-3xl rounded-3xl shadow-2xl p-10 flex flex-col gap-6">
      <h1 class="text-5xl font-bold text-center mb-4">Basketball Manager</h1>
      <RouterLink
        to="/play"
        class="bg-red-400 hover:bg-red-500 text-white text-3xl font-bold py-6 rounded-2xl text-center transition duration-200 shadow-lg"
        >Play</RouterLink>

      <RouterLink
        to="/roll"
        class="bg-red-400 hover:bg-red-500 text-white text-3xl font-bold py-6 rounded-2xl text-center transition duration-200 shadow-lg"
        >Roll Players</RouterLink>

      <button @click="store.saveUserData"
        class="bg-red-400 hover:bg-red-500 cursor-pointer text-white text-3xl font-bold py-6 rounded-2xl text-center transition duration-200 shadow-lg"
        >Save</button>
      
      <button @click="logout"
        class="bg-red-400 hover:bg-red-500 cursor-pointer text-white text-3xl font-bold py-6 rounded-2xl text-center transition duration-200 shadow-lg"
        >Logout</button>
    </div>
  </div>
</template>

<script setup>
import { usePlayerstore } from '@/state';
import { supabase } from '@/supabase';
import { useRouter } from 'vue-router';
const store = usePlayerstore()
const router = useRouter()

async function logout(){
  await supabase.auth.signOut()
  router.push({ name: 'login' })
}
</script>

<style scoped></style>
