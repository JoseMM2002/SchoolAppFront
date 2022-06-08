<template>
  <div>
    <div class="absolute-center q-pa-md q-gutter-md"
                  style="width: 80%; max-width: 700px;">
      <q-card class="bg-secondary" style="">
        <q-card-section class="text-black q-pa-xs q-ma-xs">
            <h5 class="text-center my-font">Iniciar sesion</h5>
            <q-card-section class="bg-white q-pa-xs q-ma-xs">
              <q-form @submit.prevent="login"
                style="height: auto;"
              >
                <q-input v-model="user.email"
                  label="Email"
                  style="height: auto;"
                  filled
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
                <q-btn color="cyan" class="full-width" label="" type="sumbit" icon="login" style="height: auto;">
                </q-btn>
              </q-form>
              <q-separator inset class="q-mt-md" />
              <q-card-section align="center">
                <q-btn color="teal-4" flat label="Registrarse" @click="router.push('/register')"></q-btn>
              </q-card-section>
            </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { LocalStorage, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useTokenStore } from 'src/stores/Token';
import { reactive, readonly, ref } from 'vue';
import { useRouter } from 'vue-router';

const tokenStore = useTokenStore()
const $q = useQuasar()
const isPwd = ref(true)
const router = useRouter()

const user = reactive({
  email: '',
  password: ''
})
const ValidEmail = () => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(user.email).toLowerCase())
}
const login = async () => {
  const formData = new FormData()
  const copy = readonly(user)
  formData.append('email',copy.email)
  formData.append('password',copy.password)
  try {
    const response = await api.post('login/',formData)
    const data =response.data
    $q.notify({
          message: data.Message,
          color: data.Color
        })
    if(data.Status == 1){
      tokenStore.setToken(data.Token)
      LocalStorage.set('web_token',data.Token)
      router.push('/admin/')
      console.log(data)
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
