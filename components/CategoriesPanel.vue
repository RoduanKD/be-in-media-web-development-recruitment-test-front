<script setup>
defineProps({
  categories: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <v-expansion-panels>
    <category-panel
      v-for="category in categories.data"
      :key="category.slug"
      :category="category"
    />
  </v-expansion-panels>
</template>
