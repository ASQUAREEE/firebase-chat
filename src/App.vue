<template>
  <v-app>
  <v-main>
    <Nav  />
      <router-link to="/"></router-link><br />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import Nav from './components/Nav.vue'

export default {
  
  name: 'App',

  components: {
    Nav,
  
  },

  data: () => ({
    //
  }),
}
</script>
