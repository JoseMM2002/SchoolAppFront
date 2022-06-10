<template>
  <div>
    <q-card v-for="item in data.datos" :key="item.id" class="row q-pa-md q-ma-md">
      <div class="col" v-for="(column,index) in item" :key="index">
        <p>{{ column }}</p>
      </div>
      <q-btn-group align-right v-for="(boton,index) in data.botones" :key="index">
        <q-separator vertical inset color="cyan"/>
        <q-btn :color="boton.color" flat :icon="boton.icon" @click="boton.model = true,setlocal(item)"/>
      </q-btn-group>
    </q-card>
  </div>
</template>

<script setup>
import { LocalStorage } from 'quasar';
import { inject } from 'vue';
const data = inject('list')
const setlocal = (item) => {
  LocalStorage.set('temp_item',item)
}
</script>

<style lang="scss" scoped>

</style>
