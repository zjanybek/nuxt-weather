// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // imports: {
  //   autoImport: false
  // },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      appId: process.env.APP_ID,
    },
  },
  plugins: ['~/plugins/vue-query.ts'],
  css: ['~/assets/styles/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    '@/': './',
  },
})
