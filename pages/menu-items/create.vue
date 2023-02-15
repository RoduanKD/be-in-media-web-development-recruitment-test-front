<script setup>
import { submitRequest } from '../../utils/submitRequest'
import { $larafetch } from '../../utils/$larafetch'

definePageMeta({ middleware: ['auth'] })
const processing = ref(false)
const errors = ref({})
const router = useRouter()
const route = useRoute()
const { user } = await useAuth()

const form = reactive({ name: '', price: 0, category_id: null })
const { data: categories } = await useAsyncData('categories', () => $larafetch(`/api/v1/${user.value.slug}/categories/can-have-menu-items`))
if (route.query.category) {
  form.category_id = categories.value.data.find(category => category.slug === route.query.category).id
}

async function submit () {
  errors.value = {}
  processing.value = true

  await submitRequest(
    $larafetch('/api/v1/menu-items', { method: 'POST', body: form }),
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
        <v-card title="New Menu Item">
          <v-card-text>
            <v-form :disabled="processing" @submit.prevent="submit">
              <v-text-field v-model="form.name" label="Item Name" placeholder="Falafel" :error-messages="errors.name" />
              <v-text-field
                v-model="form.price"
                label="Price"
                placeholder="150"
                type="number"
                min="0"
                :error-messages="errors.price"
              />
              <v-select
                v-model="form.category_id"
                label="Category"
                :items="categories.data"
                item-title="name"
                item-value="id"
                clearable
                :error-messages="errors.category_id"
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
