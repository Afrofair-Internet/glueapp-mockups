<template>
  <v-app>
    <v-app-bar app flat color="primary" dark elevation="0">
      <v-toolbar-title>GlueApp</v-toolbar-title>
      <v-spacer />
      <v-btn text=true class="mx-2" @click="$router.push('/login')">ログイン</v-btn>
      <v-btn text=true class="mx-2" @click="$router.push('/entryform')">新規登録</v-btn>
      <v-btn text=true class="mx-2" href="https://www.afrofair.jp/">会社情報</v-btn>
    </v-app-bar>
    <v-main class="pa-0">
      <v-container fluid class="pa-0">
        <v-img
          src="/LP.PNG"
          alt="Landing Page"
          max-width="800px"
          class="mx-auto mt-15"
          cover
        ></v-img>
      </v-container>
    </v-main>
  </v-app>
</template>
