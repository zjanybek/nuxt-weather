import axios from 'axios'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()

  const baseURL = config.public.apiUrl || 'https://api.openweathermap.org/data/2.5'
  const appId = config.public.appId || '5796abbde9106b7da4febfae8c44c232'

  const axiosDefault = axios.create({
    baseURL: baseURL,
    params: {
      appId: appId,
    },
  })

  return {
    provide: {
      axiosDefault: axiosDefault,
    },
  }
})
