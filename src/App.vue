<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    //cc
    console.log('aaaa')
    alert(1)
  },
}
</script>
