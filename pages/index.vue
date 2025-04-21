<template>
  <div class="mx-auto box-content max-w-5xl px-4">
    <div class="py-5">
      <SearchCity @getValue="handleGetValue" />

      <WeatherInfoModal />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  middleware: ['check-coordinates']
})

const route = useRoute()
const router = useRouter()

const handleGetValue = (cityData) => {
  const { lat: latVal, lon: lonVal } = cityData.coord

  router.push({
    path: route.path,
    query: { lat: latVal.toString(), lon: lonVal.toString() }
  })
}
</script>

<style lang="scss" scoped></style>
