<script setup>
const { user } = await useAuth()
const { data: categories } = await useAsyncData('categories', () => $larafetch(`/api/v1/${user.value.slug}/categories`))

const discountText = computed(() => user.value.discount + '%')
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h4">
          My Menu
        </h1>
        <h3 v-if="user.discount" class="text-subtitle-1">
          {{ discountText }} off all menu items
        </h3>
      </v-col>
      <v-spacer />
      <v-col class="flex-grow-0">
        <v-btn prepend-icon="mdi-plus" color="primary" to="/discount/edit">
          Global discount
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <categories-panel :categories="categories" />
      </v-col>
      <v-col cols="12">
        <v-btn
          to="/categories/create"
          color="primary"
          block
        >
          Add new category
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
