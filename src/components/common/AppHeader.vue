<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <v-toolbar-title>GlueApp</v-toolbar-title>
    <v-spacer />
  </v-app-bar>
</template>

<script setup lang="ts">
defineEmits(['toggle-drawer']);
</script>