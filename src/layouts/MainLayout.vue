<template>
  <q-layout view="lHh Lpr lFf">
    <Navbar>
    </Navbar>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-list class="q-mt-sm">
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, provide, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import Navbar from 'src/components/Navbar.vue'

const linksList = [
  {
    title: 'Servicios',
    icon: 'school',
    link: '/admin/servicios'
  },
  {
    title: 'Alumnos',
    icon: 'people',
    link: '/admin/alumnos'
  },
  {
    title: 'Materias',
    icon: 'description',
    link: '/admin/materias'
  },
  {
    title: 'Niveles',
    icon: 'list',
    link: '/admin/niveles'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    Navbar
},

  setup () {
    const miniState = ref(false)
    const leftDrawerOpen = ref(true)
    provide('leftDrawerAdmin',leftDrawerOpen)
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      miniState
    }
  }
})
</script>
