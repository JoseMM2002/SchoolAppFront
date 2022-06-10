<template>
  <q-card style="min-width: 500px;">
    <div class="q-ma-md">
      <h6 class="text-center">{{data.nombre}}</h6>
      <q-form class="q-ma-md" @submit.prevent="enviarForm()">
        <section v-for="(item,index) in data.inputs" :key="item.id">
          <label>{{item.label}}</label>
          <q-input 
            v-if="item.type !== 'select'" 
            :type="item.type"
            v-model="form[index]"
            outlined/>
          <q-select
            v-else-if="item.type === 'select'"
            outlined
            v-model="form[index]"
            :multiple="item.multiple"
            :options="options[index]"
            :label="item.label"
          />
        </section>
        <div align="right q-ma-lg">
          <q-btn color="teal" flat :label="data.boton" type="submit" v-close-popup/>
          <q-btn color="red" flat label="Cerrar" v-close-popup/>
        </div>
      </q-form>
    </div>
  </q-card>
</template>

<script setup>
import { LocalStorage, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { inject, onMounted, onUnmounted, reactive } from 'vue';

const $q = useQuasar()
const data = inject('editform')
const item = LocalStorage.getItem('temp_item')
const form = reactive([])
const options = reactive([])

const filter = async (val,index) => {
  const formData = new FormData
  formData.append('filtro',val.name)
  try {
    const response = await api.post(val.url,formData)
    const filtros = response.data.Data
    var aux = []
    filtros.forEach(element => {
      aux.push({label:element.label,value:element.id})
      if (element.label === form[index]) {
        form[index] = {label: element.label,value:element.id}
      }
    })
    options[index] = aux
  } catch (error) {
    console.log(error)
  }
}

const enviarForm = async () =>{
    const formData = new FormData
    for (let index = 0; index < form.length; index++) {
      if (data.inputs[index].multiple){
        var aux = []
        form[index].forEach(element => {
          aux.push(element.value)
        })
        form[index] = JSON.stringify(aux)
      } else if (data.inputs[index].type === 'select'){
        form[index] = JSON.stringify(form[index])
      }
      formData.append(data.inputs[index].nombre,form[index])
    }
    try {
        const response = await api.post(data.api + item.id, formData)
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

onMounted(()=>{
    for (const key in item) {
        if (Object.hasOwnProperty.call(item, key)) {
            const element = item[key];
            if (key !== 'id'){
                form.push(element)
            }
        }
    }
    for (let index = 0; index < data.inputs.length; index++) {
      const element = data.inputs[index]
      if(element.type === 'select'){
        filter(element.api,index)
      }
    }
})

onUnmounted(() =>{
    LocalStorage.remove('temp_item')
})
</script>

<style lang="scss" scoped>

</style>
