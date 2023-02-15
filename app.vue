<script setup>
const { user, logout, isLoggedIn } = useAuth()

</script>
<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>Be In Media - Menu</v-app-bar-title>
      <v-spacer />
      <v-btn v-if="!isLoggedIn" to="/login" variant="text" stacked>
        Login
      </v-btn>
      <template v-else>
        <v-btn to="/my-menu" variant="text">
          Hello {{ user.name }}!
        </v-btn>
        <v-btn variant="text" stacked @click="logout">
          Logout
        </v-btn>
      </template>
    </v-app-bar>
    <v-main app>
      <NuxtPage />
    </v-main>
    <v-footer
      class="justify-center"
      app
    >
      Created By
      <a
        class="ms-1"
        href="https://linkedin.com/in/roduankd"
      >
        Roduan Kareem Aldeen - @roduankd
      </a>
    </v-footer>
  </v-app>
</template>
