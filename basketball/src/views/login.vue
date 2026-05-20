<template>
    <div class="bg-green-200 h-screen flex justify-center px-4 items-center">
      <div class="w-350 bg-white p-25 rounded shadow-md">
        <p class="font-bold text-xl">Username:</p>
        <input v-model="name" placeholder="  Type your Username" class="w-80 h-10 "></input>
        <p class="font-bold text-xl">Email:</p>
        <input v-model="user" placeholder="  Type your email" class="w-80 h-10"></input>
        <p class="font-bold text-xl">Password:</p>
        <input type="password" v-model="key" placeholder="  Type your password" class="w-80 h-10"></input>
        <button @click="login" class="w-30 h-10 bg-red-400 hover:cursor-pointer">Login</button>
        <button @click="signUp" class="w-30 h-10 bg-red-400 hover:cursor-pointer">Sign Up</button>
      </div>
    </div>
</template>

<script setup>
import { supabase } from '@/supabase.js';
import { ref } from 'vue'

const user = ref("") 
const key = ref("")
const name = ref("")
async function upsertProfile() {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError

  const { error } = await supabase
    .from('profiles')
    .upsert(
      {
        id: userData.user.id,
        email: userData.user.email,
        name: name.value || null,
      },
      { onConflict: 'id' }
    )

  if (error) throw error
}
async function login() {
  const { error } = await supabase.auth.signInWithPassword({
    email: user.value,
    password: key.value,
  })

  if (error) {
    alert(error.message)
    return
  }

  await upsertProfile()
}
async function signUp() {
  const { error } = await supabase.auth.signUp({
    email: user.value,
    password: key.value,
    options: {
      data: {
        name: name.value || null,
      },
    },
  })

  if (error) {
    alert(error.message)
    return
  }
}
//console.log(supabase)
</script>

<style scoped>

</style>
// password = "yogurt123"