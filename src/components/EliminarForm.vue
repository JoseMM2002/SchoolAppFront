<template>
  <q-card style="">
    <div class="q-ma-md">
      <h6 class="text-center">{{deleteForm.nombre}} </h6>
      <section class="">
        <div align="right" class="q-ma-xs">
          <q-btn color="red" :label="deleteForm.boton" flat @click="deleteItem"/>
          <q-btn color="teal" flat label="Cerrar" @click="removerTemp"/>
        </div>
      </section>
    </div>
  </q-card>
</template>

<script setup>
const { inject }=require("@vue/runtime-core")
const { LocalStorage, useQuasar }=require("quasar")
const { api }=require("src/boot/axios")
const { useRouter }=require("vue-router")

const data = LocalStorage.getItem('temp_item')
const deleteForm = inject('deleteform')
const $q = useQuasar()
const router = useRouter()

const removerTemp = () => {
    LocalStorage.remove('temp_item')
    deleteForm.model = false
    return true
}
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
</script>

<style>

</style>