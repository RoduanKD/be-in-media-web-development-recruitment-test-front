<script setup>
import { submitRequest } from '../../utils/submitRequest'
import { $larafetch } from '../../utils/$larafetch'

definePageMeta({ middleware: ['auth'] })
const processing = ref(false)
const errors = ref({})
const router = useRouter()
const { user, refresh } = useAuth()

const form = reactive({ discount: user.value.discount })

async function submit () {
  errors.value = {}
  processing.value = true

  await submitRequest(
    $larafetch('/api/v1/discount/global', { method: 'POST', body: form }),
    () => {
      refresh()
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
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="6">
        <v-card title="Menu Discount">
          <v-card-text>
            <v-form :disabled="processing" @submit.prevent="submit">
              <v-text-field
                v-model="form.discount"
                label="Amount"
                placeholder="15"
                type="number"
                min="0"
                :error-messages="errors.discount"
                append-icon="mdi-percent"
              />
              <v-btn
                type="submit"
                color="primary"
                :loading="processing"
              >
                Save
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
