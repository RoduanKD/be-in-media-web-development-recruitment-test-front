<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['discountUpdated'])
const discountText = computed(() => props.item.discount ? `(${props.item.discount}% off)` : '')
</script>
<template>
  <v-card>
    <v-card-item>
      <v-card-title>
        {{ item.name }} {{ discountText }}
      </v-card-title>
    </v-card-item>
    <v-card-text>
      Price: <span class="text-decoration-line-through">{{ item.price }}</span> <br>
      Discount Price: {{ item.discount_price }}
    </v-card-text>
    <v-card-actions>
      <discount-dialog :item="item" type="menu-item" @discount-updated="emit('discountUpdated')" />
    </v-card-actions>
  </v-card>
</template>
