<template>
  <div>
    <ListNav/>
    <div class="q-ma-sm">
      <q-btn color="green" class="full-width" icon="add" @click="modelAdd = true"></q-btn>
    </div>
    <List v-if="getNiveles()"/>
    <q-dialog v-model="modelEdit">
      <q-card class="absolute-center">
        <EditarForm/>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modelDelete">
      <EliminarForm/>
    </q-dialog>
    <q-dialog v-model="modelAdd">
      <AgregarForm/>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, provide, reactive, readonly, ref } from 'vue';
import List from 'src/components/List.vue';
import AgregarForm from 'src/components/AgregarForm.vue';
import { api } from 'src/boot/axios';
import ListNav from 'src/components/ListNav.vue';
import EliminarForm from 'src/components/EliminarForm.vue';
import EditarForm from 'src/components/EditarForm.vue';

const modelEdit = ref(false)
const modelDelete = ref(false)
const modelAdd = ref(false)
const listaGLobal = reactive(
  {
    datos:[]
  }
)
const list = reactive(
  {
    datos:
    [],
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
    nombre: 'Agregar Nivel',
    inputs:
      [
        {
          label: 'Nombre del nivel',
          type: 'text',
          nombre: 'nombre',
          outlined: true
        },
        {
          label:'Descripcion del nivel',
          type:'text',
          nombre: 'descripcion',
          outlined: true
        }
      ],
    boton: 'Agregar nivel',
    api:'/niveles/0',
    model: modelAdd
  }
)
const editform = reactive(
  {
    nombre: 'Editar Nivel',
    inputs:
      [
        {
          label: 'Nombre del nivel',
          type: 'text',
          nombre: 'nombre',
        },
        {
          label:'Descripcion del nivel',
          type:'text',
          nombre: 'descripcion'
        }
      ],
    boton: 'Editar nivel',
    api:'/niveles/',
    model: modelEdit
  }
)
const deleteForm = reactive({
  nombre: 'Eliminar nivel',
  boton: 'Eliminar nivel',
  api: '/niveles/',
  model: modelDelete,
})
const listNav = reactive({
  navigators:[
    {
      varname: 'id',
      label: 'Id',
      model: ''
    },
    {
      varname:'nombre',
      label:'Nombre de nivel',
      model: ''
    },
    {
      varname: 'descripcion',
      label: 'Descripción',
      model: ''
    }
  ]
})
provide('listG',listaGLobal)
provide('list',list)
provide('addform',agregarForm)
provide('deleteform',deleteForm)
provide('editform',editform)
provide('listnav',listNav)
const getNiveles = async () =>{
  const response = await api.get('/niveles/0')
  for (let index = 0; index <= response.data.Data.length - 1; index++) {
    const element = response.data.Data[index];
    list.datos[index] = {
      id: element.id,
      nombre: element.nombre,
      descripcion: element.descripcion
    }
    listaGLobal.datos[index] = {
      id: element.id,
      nombre: element.nombre,
      descripcion: element.descripcion
    }
  }
  if (response.data.Data.length === 0){
    listaGLobal.datos = []
    list.datos = []
  }
  if (listaGLobal.datos.length>0){
    return true
  }
  return false
}
</script>

<style lang="scss" scoped>

</style>
