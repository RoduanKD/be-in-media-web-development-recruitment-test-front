<script setup>
import { submitRequest } from '../utils/submitRequest'
import { $larafetch } from '../utils/$larafetch'

const emit = defineEmits(['discountUpdated'])
const localProps = defineProps({
  item: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    default: 'category',
    validator (value) {
      return ['category', 'menu-item'].includes(value)
    },
  },
})

const processing = ref(false)
const errors = ref({})
const dialog = ref(false)
const url = computed(() => `/api/v1/discount/${localProps.type}/${localProps.item.slug}`)
const form = reactive({ discount: localProps.item.discount })

async function submit () {
  errors.value = {}
  processing.value = true

  await submitRequest(
    $larafetch(url.value, { method: 'POST', body: form }),
    () => {
      emit('discountUpdated', form.discount)
      dialog.value = false
    },
    (validationErrors) => {
      errors.value = validationErrors ?? {}
      processing.value = false
    },
  )
}
</script>

<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="warning"
        prepend-icon="mdi-percent"
        size="x-small"
      >
        Set Discount
      </v-btn>
    </template>
    <v-card>
      <v-form :disabled="processing" @submit.prevent="submit">
        <v-card-title>
          <span class="text-h5">Add Discount</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="form.discount"
                  label="Amount"
                  placeholder="15"
                  type="number"
                  min="0"
                  :error-messages="errors.discount"
                  append-icon="mdi-percent"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            type="submit"
            :loading="processing"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
