<template>
  <div>
    <q-card v-for="item in data.datos" :key="item.id" class="row q-pa-md q-ma-md">
      <div class="col" v-for="(column,index) in item" :key="index">
        <p>{{ column }}</p>
      </div>
      <q-separator inset/>
      <q-btn-group align-right v-for="(item,index) in data.botones" :key="index">
        <q-separator vertical inset color="cyan"/>
        <q-btn :color="item.color" flat :icon="item.icon" @click="item.model = true"/>
      </q-btn-group>
    </q-card>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const data = inject('list')
</script>

<style lang="scss" scoped>

</style>
