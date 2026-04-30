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
  <h1 class="text-amber-600">You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>
