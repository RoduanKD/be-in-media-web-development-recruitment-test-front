<script setup>
import { submitRequest } from '../../utils/submitRequest'
import { $larafetch } from '../../utils/$larafetch'

definePageMeta({ middleware: ['auth'] })
const processing = ref(false)
const errors = ref({})
const router = useRouter()
const route = useRoute()
const { user } = await useAuth()

const form = reactive({ name: '', parent_id: null })
const { data: parents } = await useAsyncData('parents', () => $larafetch(`/api/v1/${user.value.slug}/categories/can-have-child-category`))
if (route.query.parent) {
  form.parent_id = parents.value.data.find(parent => parent.slug === route.query.parent)
}

async function submit () {
  errors.value = {}
  processing.value = true

  await submitRequest(
    $larafetch('/api/v1/categories', { method: 'POST', body: form }),
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
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="6">
        <v-card title="New Category">
          <v-card-text>
            <v-form :disabled="processing" @submit.prevent="submit">
              <v-text-field v-model="form.name" label="Category Name" placeholder="Main dish" :error-messages="errors.name" />
              <v-select
                v-model="form.parent_id"
                label="Parent Category"
                :items="parents.data"
                :error-messages="errors.parent_id"
                item-title="name"
                item-value="id"
                clearable
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
