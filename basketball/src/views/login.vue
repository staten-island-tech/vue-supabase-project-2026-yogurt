<template>
    <div class="bg-sky-100 h-screen flex justify-center px-4 items-center">
      <div class="w-250 h-175 bg-sky-200 p-15 rounded-4xl shadow-xl flex overflow-hidden">
        <div class="w-1/2">
          <p class="text-5xl mb-15">Welcome back</p>
          <p class="text-2xl font-bold text-slate-900 mb-3">Username</p>
          <input v-model="name" placeholder="  Type your Username" class="w-117 rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"></input>
          <p class="text-2xl font-bold text-slate-900 mb-3">Email Address</p>
          <input v-model="user" placeholder="  Type your email" class="w-117 rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"></input>
          <p class="text-2xl font-bold text-slate-900 mb-3">Password</p>
          <input type="password" v-model="key" placeholder="  Type your password" class="w-117 rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-10"></input>
          <p></p>
          <button @click="login" class="w-117 h-10 bg-red-400 hover:cursor-pointer mb-10 rounded-4xl">Login</button>
          <p></p>
          <button @click="signUp" class="w-117 h-10 bg-red-400 hover:cursor-pointer rounded-4xl">Sign Up</button>
        </div>
        <div class="w-1/2 h-full">
          <img src="/image.jpg" alt="My Picture" class="ml-10  w-full h-210 object-cover"/>
        </div>
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
  }else{
    console.log("User logged in successfully")
    window.location.href = '/menu'
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
  }else{
    console.log("User signed up successfully")
    window.location.href = '/menu'
  }
}
</script>

<style scoped>

</style>
<!-- password is yogurt123 -->