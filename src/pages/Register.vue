<template>
  <div>
    <div class="absolute-center q-pa-md q-gutter-md"
    style="width: 80%; max-width: 700px;">
      <q-card class="bg-secondary">
        <q-card-section class="text-black q-pa-xs q-ma-xs">
            <div class="row">
              <q-btn class="q-ma-xs row" style="max-height: 10px;" icon="arrow_back" dense flat @click="router.push('/login')"/>
              <h5 class="text-center my-font col-11" align="center">Registrarse</h5>
            </div>
            <q-card-section class="bg-white q-pa-xs q-ma-xs">
              <q-form @submit.prevent="register"
                style="height: auto;">
                <q-input v-model="user.email"
                  label="Email"
                  filled
                  style="height: auto;"
                  :rules="[val => !!val || 'Campo Obligatorio', val => ValidEmail(val) || 'Escribe un email válido.']"
                  >
                </q-input>
                <q-input v-model="user.password"
                  style="height: auto;"
                  filled
                  :type="isPwd ? 'password' : 'text'"
                  label="Password"
                  :rules="[val => !!val || 'Campo Obligatorio', val => val.length >= 8 || 'La contraseña tiene que tener minimo 8 carácteres']"
                  >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <q-input v-model="user.confirm"
                  style="height: auto;"
                  filled
                  :type="isConf ? 'password' : 'text'"
                  label="Confirm Password"
                  :rules="[val => !!val || 'Campo Obligatorio', val => val == user.password || 'Las contraseñas no coinciden']"
                  >
                  <template v-slot:append>
                    <q-icon
                      :name="isConf ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isConf = !isConf"
                    />
                  </template>
                </q-input>
                <q-btn color="cyan" class="full-width" label="" type="sumbit" icon="login">
                </q-btn>
              </q-form>
            </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { reactive, readonly, ref } from 'vue';
import {useQuasar} from 'quasar'
import { useRouter } from 'vue-router';

const $q = useQuasar()
const isPwd = ref(true)
const isConf = ref(true)
const router = useRouter()

const user = reactive({
  email: '',
  password: '',
  confirm: ''
})
const ValidEmail = () => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(user.email).toLowerCase())
}
const register = async () => {
  const formData = new FormData()
  const copy = readonly(user)
  formData.append('email',copy.email)
  formData.append('password',copy.password)
  try {
    const response =  await api.post('register/',formData)
    const data = response.data
    $q.notify({
          message: data.Message,
          color: data.Color
        })
    if(data.Status === 1){
      router.push('/login')
    }
  } catch (error) {
    console.log(error)
  }
}

</script>
<style>
.my-font{
  font-family: 'CenturyGothicBold';
}
body{
  background-color: rgb(255, 255, 255);
}
</style>
