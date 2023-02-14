import { useUser } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async () => {
  const user = useUser()
  if (user.value) { return await navigateTo('/my-menu', { replace: true }) }
})
