<template>
  <div @click="go">
    aa
  </div>
</template>

<script>
export default {
  methods: {
    go(){
      this.$router.push({name:'detail'})
    }
  },
}
</script>