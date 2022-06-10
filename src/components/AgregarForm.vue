<template>
  <q-card style="min-width: 500px;">
    <div class="q-ma-md">
      <h6 class="text-center">{{data.nombre}}</h6>
      <q-form class="q-ma-md" @submit.prevent="enviarForm()">
        <section v-for="(item,index) in data.inputs" :key="item.id">
          <label>{{item.label}}</label>
          <q-input v-if="item.type === 'text'" :type="item.type" v-model="form[index]" :outlined="item.outlined"/>
          <q-select
            v-else-if="item.type === 'multiple'"
            outlined
            v-model="form[index]"
            multiple
            :options="options[index]"
            :label="item.label"
          />
          <q-select
            v-else-if="item.type==='select'"
            
          />
        </section>
        <div align="right" class="q-ma-sm">
          <q-btn color="teal" flat :label="data.boton" type="submit" v-close-popup/>
          <q-btn color="red" flat label="Cerrar" v-close-popup/>
        </div>
      </q-form>
    </div>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { inject, onMounted, reactive, ref } from 'vue';

const $q = useQuasar()
const data = inject('addform')
const form = reactive([])
const options = reactive([])

const filter = async (val,index) =>{
  const formData = new FormData
  formData.append('filtro',val.name)
  try {
    const response = await api.post(val.url,formData)
    const filtros = response.data.Data
    var aux = []
    filtros.forEach(element => {
      aux.push({label:element.label,value:element.id})
    })
    options[index] = aux
  } catch (error) {
    console.log(error)
  }
}

const enviarForm = async () =>{
  const formData = new FormData
  for (let index = 0; index < form.length; index++) {
    console.log(data.inputs.nombre,form[index])
    formData.append(data.inputs[index].nombre,form[index])
  }
  try {
    const response = await api.post(data.api,formData)
    $q.notify({
      message:response.data.Message,
      color:response.data.Color
    })
  } catch (error) {
    console.log(error)
    $q.notify({
      message: 'Ocurrió algo inesperado',
      color: 'red'
    })
  }
}

onMounted(async() => {
  for (let index = 0; index < data.inputs.length; index++) {
    const element = data.inputs[index];
    if(element.type === 'multiple'){
      filter(element.api,index)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
