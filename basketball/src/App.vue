<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'

const transactions = ref([])
const error = ref(null)

onMounted(async () => {
  let { data: transactionData, error: err } = await supabase.from('transactions').select('*')
  if (err) {
    error.value = err.message
  } else {
    transactions.value = transactionData
  }
})
</script>

<template>
  <RouterView></RouterView>
  
</template>

<style scoped></style>
