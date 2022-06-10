<template>
  <q-card style="min-width: 500px;">
    <div class="q-ma-md">
      <h6 class="text-center">{{data.nombre}}</h6>
      <q-form class="q-ma-md" @submit.prevent="enviarForm()">
        <section v-for="(item,index) in data.inputs" :key="item.id">
          <label>{{item.label}}</label>
          <q-input v-if="item.type !== 'select'" :type="item.type" v-model="form[index]" :outlined="item.outlined"/>
          <q-select v-else></q-select>
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
import { inject, onMounted, reactive } from 'vue';

const $q = useQuasar()
const data = inject('editform')
const item = LocalStorage.getItem('temp_item')
const form = reactive([])
const enviarForm = async () =>{
    console.log(item.id)
    const formData = new FormData
    for (let index = 0; index < form.length; index++) {
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
})
</script>

<style lang="scss" scoped>

</style>
