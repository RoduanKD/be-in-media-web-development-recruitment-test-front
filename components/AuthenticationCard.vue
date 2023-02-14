<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <v-container
    fluid
    class="authentication fill-height"
  >
    <v-row
      align="center"
      justify="center"
      align-content="center"
    >
      <v-col
        sm="8"
      >
        <slot name="logo" />
      </v-col>
      <v-col sm="8">
        <v-card
          :title="title"
          max-width="550"
          class="mx-auto login-card"
        >
          <v-card-text>
            <slot />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.authentication {
  background: url('https://images.unsplash.com/photo-1483354483454-4cd359948304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
}
</style>
