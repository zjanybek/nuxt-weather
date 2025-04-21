<template>
  <div class="group relative">
    <div
      id="dropdown-menu"
      class="absolute right-0 mt-2 w-full space-y-1 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div class="relative">
        <input
          v-model="search"
          @input="handleInput"
          @focus="handleFocus"
          id="search-input"
          class="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 focus:border-sky-500 focus:outline focus:outline-sky-500"
          type="text"
          placeholder="Search city..."
          autocomplete="off"
        />

        <button
          v-if="search !== ''"
          @click="clearSearch"
          class="absolute right-0 top-0 h-full w-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              fill="currentColor"
              d="M7.44 7.44a1.5 1.5 0 0 1 2.12 0L12 9.878l2.44-2.44a1.5 1.5 0 0 1 2.12 2.122L14.122 12l2.44 2.44a1.5 1.5 0 0 1-2.122 2.12L12 14.122l-2.44 2.44a1.5 1.5 0 0 1-2.12-2.122L9.878 12l-2.44-2.44a1.5 1.5 0 0 1 0-2.12"
            ></path>
          </svg>
        </button>
      </div>

      <div
        v-if="isOpenResults"
        class="max-h-80 overflow-y-auto overflow-x-hidden"
      >
        <div v-if="loading" class="px-4 py-2 text-center text-gray-700">
          Loading...
        </div>

        <div v-if="isError" class="px-4 py-2 text-center text-gray-700">
          An error occurred during the search. Please try again later.
        </div>

        <ul v-if="resultsData?.length">
          <li
            v-for="result in resultsData"
            :key="result.id"
            @click="handleClick(result)"
            class="block cursor-pointer rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100"
          >
            {{ result.name }}
          </li>
        </ul>

        <div
          v-else-if="debouncedSearch && !loading"
          class="px-4 py-2 text-center text-gray-700"
        >
          No matching results found. Please try refining your query.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

import { useAxios } from '@/composables/useAxios'

const { get } = useAxios()
const emit = defineEmits(['getValue'])

const search = ref<string>('')
const isOpenResults = ref<boolean>(false)

const debouncedSearch = ref<string>('')

function debounce(fn: (val: string) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>
  return (val: string) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(val), delay)
  }
}

const applyDebounce = debounce((val: string) => {
  debouncedSearch.value = val
}, 500)

const handleInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value.trim()
  isOpenResults.value = true

  if (val.length >= 3) {
    applyDebounce(val)
  } else {
    debouncedSearch.value = ''
  }
}

const handleFocus = () => {
  if (debouncedSearch.value) {
    isOpenResults.value = true
  }
}

const {
  data: resultsData,
  isLoading: loading,
  isError,
  error
} = useQuery({
  queryKey: ['city-search', debouncedSearch],
  queryFn: async () =>
    await get('/find', { q: debouncedSearch.value }).then(
      (res) => res.data.list
    ),
  enabled: () => debouncedSearch.value.length >= 3,
  staleTime: 1000 * 60,
  retry: false
})

const clearSearch = () => {
  search.value = ''
  debouncedSearch.value = ''
  isOpenResults.value = false
}

const handleClick = (result: any) => {
  emit('getValue', result)
  isOpenResults.value = false
}
</script>

<style lang="scss" scoped></style>
