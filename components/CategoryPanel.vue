<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
})
const menu = reactive({ items: {} })
if (!props.category.children) {
  $larafetch(`/api/v1/categories/${props.category.slug}/menu-items`).then((data) => {
    menu.items = data
  })
}

const canHaveSubCategory = computed(() => props.category.level < 4 && !menu.items.data)
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      {{ category.name }}
      <v-spacer />
      <v-btn
        v-if="canHaveSubCategory"
        :to="{ name: 'categories-create', query: { parent: category.slug }}"
        color="success"
        prepend-icon="mdi-plus"
        size="x-small"
      >
        Subcategory
      </v-btn>
    </v-expansion-panel-title>
    <v-expansion-panel-text v-if="category.children">
      <v-expansion-panels>
        <category-panel v-for="subcategory in category.children" :key="subcategory.slug" :category="subcategory" />
      </v-expansion-panels>
    </v-expansion-panel-text>
    <v-expansion-panel-text v-else>
      <v-row>
        <v-col
          v-for="item in menu.items.data"
          :key="item.slug"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <menu-item-card :item="item" />
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
