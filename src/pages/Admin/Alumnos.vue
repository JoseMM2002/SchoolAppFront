<template>
  <div>
    <List/>
    <q-btn color="green" class="full-width" icon="add" @click="modelAdd = true"></q-btn>
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
import { onMounted, provide, reactive, ref } from 'vue';
import List from 'src/components/List.vue';
import AgregarForm from 'src/components/AgregarForm.vue';

const modelEdit = ref(false)
const modelDelete = ref(false)
const modelAdd = ref(false)
const list = reactive(
  {
    datos:
    [
      {
        id: 1,
        nombre: 'Alumno1',
        descripcion: 'Descripcion',
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
    nombre: 'Agregar Alumno',
    inputs:
      [
        {
          label: 'Nombre del alumno',
          type: 'text',
        }
      ],
    boton: 'Agregar alumno'
  }
)
provide('list',list)
provide('addform',agregarForm)

onMounted(() => {
  console.log('aqui')
})
</script>
