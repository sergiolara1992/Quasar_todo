<template>
  <router-view />
</template>

<script setup>
import { createPinia } from 'pinia'
import { onMounted, getCurrentInstance } from 'vue'


const pinia = createPinia()


onMounted(() => {
  getCurrentInstance().appContext.app.use(pinia)
})
</script>
