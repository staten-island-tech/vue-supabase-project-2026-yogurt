<template>
    <div class="bg-amber-500 w-480 h-100 flex flex-wrap justify-center items-center">
        Login
        <input v-model="name" placeholder="Please type your name" class="w-50"></input>
        <input v-model="user" placeholder="Please type your email" class="w-50"></input>
        Password
        <input type="password" v-model="key" placeholder="Please type your password" class="w-50"></input>
        <button @click="login" class="w-30 h-10 bg-red-400 hover:cursor-pointer">Login</button>
        <button @click="signUp" class="w-30 h-10 bg-red-400 hover:cursor-pointer">Sign Up</button>
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