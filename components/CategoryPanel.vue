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
</script>

<template>
  <v-expansion-panel :title="category.name">
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
