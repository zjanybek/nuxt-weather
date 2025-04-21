<template>
  <Modal :show="isOpenModal" @close="closeModal" title="Info weather">
    <div v-if="forecast" class="p-4">
      <div
        class="grid justify-center gap-y-4 rounded-md bg-white px-2 py-5 text-center shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div class="flex items-center justify-center">
          <img
            :src="`https://openweathermap.org/img/wn/${forecast.current.weather[0].icon}@2x.png`"
            class="max-w-full"
            alt="icon"
          />
        </div>
        <div class="text-2xl font-semibold">
          {{ formatWeekdayDate(forecast.timezone_offset) }}
        </div>
        <div class="text-xl">{{ forecast.current.weather[0].description }}</div>
        <div class="text-xl">🌡 Temperature: {{ forecast.current.temp }}°C</div>
        <div class="text-xl">
          🌡 Min/Max Temperature: {{ forecast.daily[0].temp.min }}°C /
          {{ forecast.daily[0].temp.max }}°C
        </div>
        <div class="text-xl">
          💨 Wind Speed: {{ forecast.current.wind_speed }} м/с
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="p-4 text-center text-gray-600">Loading...</div>
  </Modal>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAxios } from '@/composables/useAxios'

import { formatWeekdayDate } from '@/utils/formatWeekdayDate'

import Modal from '~/components/Modal.vue'

const route = useRoute()
const router = useRouter()

const { get } = useAxios()

const isOpenModal = ref<boolean>(false)

const lat = ref<string>('')
const lon = ref<string>('')

const queryKey = computed(() => ['onecall', { lat: lat.value, lon: lon.value }])
const enabled = computed(() => !!lat.value && !!lon.value)

const {
  data: forecast,
  isLoading,
  isError,
  error,
  refetch
} = useQuery({
  queryKey: queryKey,
  queryFn: async () =>
    await get('/onecall', {
      lat: lat.value,
      lon: lon.value,
      units: 'metric'
    }).then((res) => res.data),
  enabled,
  staleTime: 60 * 1000,
  onSuccess: (data) => {
    handleOpenModal()
  }
})

const toggleModal = () => {
  isOpenModal.value = !isOpenModal.value
}

const handleOpenModal = () => {
  isOpenModal.value = true
}

const closeModal = () => {
  isOpenModal.value = false

  router.replace({ path: route.path })

  resetCoordinates()
}

const resetCoordinates = () => {
  lat.value = ''
  lon.value = ''
}

const updateQuery = () => {
  const latParam = route.query.lat
  const lonParam = route.query.lon

  if (latParam && lonParam) {
    lat.value = latParam as string
    lon.value = lonParam as string
    handleOpenModal()
  }
}

onMounted(updateQuery)

watch(
  () => [route.query.lat, route.query.lon],
  () => {
    updateQuery()
  }
)
</script>

<style lang="scss" scoped></style>
