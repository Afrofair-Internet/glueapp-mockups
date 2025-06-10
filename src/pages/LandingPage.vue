<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="pa-8" elevation="10">
          <v-card-title class="text-h5 text-center">
            ようこそ GlueApp へ
          </v-card-title>
          <v-card-text class="text-center">
            GlueAppで簡単DX<br />
            会社のマスタデータを一括管理
          </v-card-text>
          <v-card-actions class="justify-center mt-4">
            <v-btn color="primary" @click="$router.push('/login')">
              ログイン
            </v-btn>
            <v-btn color="primary" @click="$router.push('/entryform')">
              新規申込
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>