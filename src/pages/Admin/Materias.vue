<template>
  <div>
    <ListNav/>
    <div class="q-ma-sm">
      <q-btn color="green" class="full-width" icon="add" @click="modelAdd = true"></q-btn>
    </div>
    <List v-if='getMaterias()'/>
    <q-dialog v-model="modelEdit">
      <q-card class="absolute-center">
        <EditarForm/>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modelDelete">
      <q-card class="absolute-center">
        <EliminarForm/>
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
import ListNav from 'src/components/ListNav.vue';
import EliminarForm from 'src/components/EliminarForm.vue';
import EditarForm from 'src/components/EditarForm.vue';

const modelEdit = ref(false)
const modelDelete = ref(false)
const modelAdd = ref(false)

const listaGlobal = reactive(
  {
    datos: []
  }
)
const list = reactive(
  {
    datos: [],
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
const listNav = reactive(
  {
    navigators: [
      {
        varname: 'id',
        label: 'por id',
        model: ''
      },
      {
        varname: 'nombre',
        label: 'por nombre de la materia',
        model: ''
      },
      {
        varname: 'descripcion',
        label: 'por descripción',
        model: ''
      },
      {
        varname: 'nivel',
        label: 'por nivel',
        model: ''
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
          nombre: 'nombre'
        },
        {
          label: 'Descripción de la materia',
          type: 'text',
          nombre: 'descripcion'
        },
        {
          label: 'Niveles',
          type: 'select',
          multiple: false,
          api: {
            url: '/filtros/',
            name: 'niveles'
          },
          nombre: 'nivel'
        }
      ],
    boton: 'Agregar materia',
    api: '/materias/0',
    model: modelAdd
  }
)
const deleteForm = reactive({
  nombre: 'Eliminar materia',
  boton: 'Eliminar materia',
  api: '/materias/',
  model: modelDelete,
})
const editform = reactive( 
  {
    nombr: 'Editar Materia',
    inputs:
    [
      {
        label: 'Nombre de la materia',
        type: 'text',
        nombre: 'nombre'
      },
      {
        label: 'Descripción de la materia',
        type: 'text',
        nombre: 'descripcion',
      },
      {
        label: 'Niveles',
        type: 'select',
        multiple: false,
        api:{
          url:'/filtros/',
          name: 'niveles'
        },
        nombre: 'nivel'
      }
    ],
    boton: 'Editar materia',
    api: '/materias/',
    model: modelEdit
  }
)

provide('list',list)
provide('listG',listaGlobal)
provide('listnav',listNav)

provide('editform',editform)
provide('addform',agregarForm)
provide('deleteform',deleteForm)

const getMaterias = async () =>{
  const response = await api.get('/materias/0')
  for (let index = 0; index < response.data.Data.length; index++) {
    const element = response.data.Data[index];
    list.datos[index] = {
      id: element.id,
      nombre: element.nombre,
      descripcion: element.descripcion,
      nivel: element.nivel_label
    }
    listaGlobal.datos[index] = {
      id: element.id,
      nombre: element.nombre,
      descripcion: element.descripcion,
      nivel: element.nivel_label
    }
  }
  if (response.data.Data.length === 0){
    listaGlobal.datos = []
    list.datos = []
  }
  if (listaGlobal.datos.length>0){
    return true
  }
  return false
}
</script>

<style lang="scss" scoped>

</style>
