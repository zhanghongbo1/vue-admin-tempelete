<template>
  <div>aaa</div>
</template>

<script>
import { getInfo } from '@/api/user'
export default {
  created() {
    this.getUserinfo()
  },
  methods: {
    async getUserinfo() {
      const res = await getInfo({})
    },
  },
}
</script>