<template>
  <q-card style="">
    <div class="q-ma-md">
      <h6 class="text-center">{{deleteForm.nombre}}</h6>
      <p>{{data.nombre}}</p>
      <section class="">
        <q-form align="right" @submit.prevent="deleteItem" class="q-ma-xs">
          <q-btn color="red" :label="deleteForm.boton" flat  type="submit" v-close-popup/>
          <q-btn color="teal" flat label="Cerrar" v-close-popup/>
        </q-form>
      </section>
    </div>
  </q-card>
</template>

<script setup>
const { inject, onUnmounted }=require("@vue/runtime-core")
const { LocalStorage, useQuasar }=require("quasar")
const { api }=require("src/boot/axios")
const { useRouter }=require("vue-router")

const data = LocalStorage.getItem('temp_item')
const deleteForm = inject('deleteform')
const $q = useQuasar()
const router = useRouter()

const deleteItem = async () => {
    try {
        const response = await api.delete(deleteForm.api+data.id)
        $q.notify({
            message:response.data.Message,
            color:response.data.Color
        })
        removerTemp()
    } catch (error) {
        console.log(error)
        $q.notify({
            message:'Ocurrió algo inesperado',
            color:'red'
        })
    }
}

onUnmounted(() =>{
    LocalStorage.remove('temp_item')
})
</script>

<style>

</style>