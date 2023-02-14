<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <v-card :title="item.name">
    <v-card-text>
      Price: {{ item.price }} <br>
      Discount Price: {{ item.discount_price }}
    </v-card-text>
  </v-card>
</template>
