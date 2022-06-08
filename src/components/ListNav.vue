<template>
  <div>
    <q-form @submit.prevent="filtrar()" class="row q-mx-md">
      <div class="row col-11">
        <q-input
        v-for="(item,index) in data.navigators"
        v-model="item.model"
        :key="index"
        type="text"
        rounded
        outlined
        :label="'Buscar ' + item.label"
        class="full-width q-ma-md col">
          <template v-slot:prepend>
            <q-icon name="search"/>
          </template>
        </q-input>
      </div>
      <q-btn-group flat round class="q-ma-md col" style="">
        <q-btn round flat color="primary" icon="search" class="q-ma-sm" type="submit"/>
        <q-separator vertical inset color="cyan"></q-separator>
        <q-btn round flat icon="close" @click="limpiarNavs()"/>
      </q-btn-group>
    </q-form>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const data = inject('listnav')
const lista = inject('list')
const listaG = inject('listG')

const filtrar = () =>{

}
const limpiarNavs = () =>{

}
</script>

<style lang="scss" scoped>

</style>
