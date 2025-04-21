<template>
  <div class='wrapper'>
    <main>
      <NuxtPage />
    </main>
    <VueQueryDevtools />
  </div>
</template>

<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>
