<template>
  <q-header elevated>
    <q-toolbar class="row bg-teal">
      <div class="col">
      </div>
      <div align="right">
        <q-btn
          @click="logout"
          color="black"
          flat
          icon="logout"
          label="Logout"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useTokenStore } from 'src/stores/Token';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const tokenStore = useTokenStore()
const router = useRouter()
const logout = () => {
  tokenStore.deleteToken()
  router.push('/login')
}
</script>
