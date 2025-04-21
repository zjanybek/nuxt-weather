export default defineNuxtRouteMiddleware(to => {
  const lat = to.query.lat
  const lon = to.query.lon

  if (lat && lon) {
    if (isNaN(Number(lat)) || isNaN(Number(lon))) {
      return navigateTo({ path: '/error' })
    }
  }
})