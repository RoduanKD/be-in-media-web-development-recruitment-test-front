<script setup lang="ts">
definePageMeta({ middleware: ['guest'] })

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

const form = reactive({
  email: null,
  password: null,
  remember: false,
})
const status = ref(
  (route.query.reset ?? '').length > 0 ? atob(route.query.reset as string) : '',
)
const processing = ref(false)
const errors = ref<Record<string, string[]>>({})

async function submit () {
  errors.value = {}
  status.value = ''
  processing.value = true

  await submitRequest(
    login(form),
    () => {
      router.push('/my-menu')
    },
    (validationErrors) => {
      errors.value = validationErrors ?? {}
      processing.value = false
    },
  )
}
</script>

<template>
  <authentication-card title="Login">
    <div
      v-if="status"
      class="mb-4"
    >
      {{ status }}
    </div>

    <v-form @submit.prevent="submit">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.email"
            name="email"
            label="Email"
            type="email"
            hide-details="auto"
            :error-messages="errors['email']"
            outlined
            required
            autofocus
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.password"
            name="password"
            type="password"
            label="password"
            hide-details="auto"
            autocomplete="current-password"
            :error-messages="errors['password']"
            outlined
            required
            autofocus
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-checkbox
            v-model="form.remember"
            label="Remember me"
            value="on"
            density="compact"
          />
        </v-col>
        <v-col
          cols="12"
          class="d-flex align-center"
        >
          <v-btn
            color="primary"
            :disabled="processing"
            :loading="processing"
            type="submit"
          >
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </authentication-card>
</template>
