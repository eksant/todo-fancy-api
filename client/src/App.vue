<template>
  <div id="app">
    <navbarcomponent/>
    <router-view/>
    <footercomponent/>
  </div>
</template>

<script>
import navbarcomponent from '@/components/NavBar'
import footercomponent from '@/components/Footer'

export default {
  name: 'App',
  components: {
    navbarcomponent, footercomponent
  }
}
</script>

<style>
</style>
