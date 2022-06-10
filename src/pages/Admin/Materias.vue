<template>
  <div>
    <div class="q-ma-sm">
      <q-btn color="green" class="full-width" icon="add" @click="modelAdd = true"></q-btn>
    </div>
    <List/>
    <q-dialog v-model="modelEdit">
      <q-card class="absolute-center">
        Editar
      </q-card>
    </q-dialog>
    <q-dialog v-model="modelDelete">
      <q-card class="absolute-center">
        Eliminar
      </q-card>
    </q-dialog>
    <q-dialog v-model="modelAdd">
      <AgregarForm/>
    </q-dialog>
  </div>
</template>

<script setup>
import { provide, reactive, ref } from 'vue';
import List from 'src/components/List.vue';
import AgregarForm from 'src/components/AgregarForm.vue';
import { api } from 'src/boot/axios';

const modelEdit = ref(false)
const modelDelete = ref(false)
const modelAdd = ref(false)
const list = reactive(
  {
    datos:
    [
      {
        id: 1,
        nombre: 'Materia1',
        descripcion: 'descripcion1',
        nivel_id: '1'
      },
    ],
    botones:[
      {
        color: 'primary',
        icon: 'edit',
        model: modelEdit
      },
      {
        color: 'red',
        icon: 'delete',
        model: modelDelete
      }
    ]
  }
)
const agregarForm = reactive(
  {
    nombre: 'Agregar materia',
    inputs:
      [
        {
          label: 'Nombre de la materia',
          type: 'text',
        },
        {
          label: 'Descripción de la materia',
          type: 'text'
        },
        {
          label: 'Niveles',
          type: 'multiple',
          api: {
            url: '/filtros/',
            name: 'niveles'
          }
        }
      ],
    boton: 'Agregar materia'
  }
)
provide('list',list)
provide('addform',agregarForm)
const getMaterias = () =>{
  api.get()
  return true
}
</script>

<style lang="scss" scoped>

</style>
