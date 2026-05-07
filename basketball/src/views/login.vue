<template>
    <div class="bg-amber-500 w-50 h-100 flex flex-wrap justify-center items-center">
        Login
        <input v-model="name" placeholder="Please type your name" class="w-50"></input>
        <input v-model="user" placeholder="Please type your email" class="w-50"></input>
        Password
        <input v-model="key" placeholder="Please type your password" class="w-50"></input>
        <button @click="login" class="w-30 h-10 bg-red-400 hover:cursor-pointer">Login</button>
    </div>
</template>

<script setup>
import { supabase } from '@/supabase.js';
import { ref } from 'vue'

const user = ref("")
const key = ref("")
const name = ref("")
async function login(){
    console.log(user.value, key.value)
    
    let { data, error } = await supabase
    .from('profiles')
    .select('id,name')
    console.log(data, error)
  
}

console.log(supabase)
</script>

<style scoped>

</style>