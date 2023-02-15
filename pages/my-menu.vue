<script setup>
const { user } = await useAuth()
const { data: categories } = await useAsyncData('categories', () => $larafetch(`/api/v1/${user.value.slug}/categories`))
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="h1">
          My Menu
        </h1>
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
