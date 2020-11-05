<template>
  <div>
    <div class="mid">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="书名" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入书名"
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="原价" prop="price">
          <el-input
            v-model="formData.price"
            placeholder="请输入原价"
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="实际价格" prop="oldprice">
          <el-input
            v-model="formData.oldprice"
            placeholder="请输入实际价格"
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item size="large" style="text-align: center">
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getDeail, recompose } from '@/api/table'
export default {
  components: {},
  props: [],
  data () {
    return {
      formData: {
        name: undefined,
        price: undefined,
        oldprice: undefined,
      },
      rules: {
        name: [{
          required: true,
          message: '请输入书名',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入原价',
          trigger: 'blur'
        }],
        oldprice: [{
          required: true,
          message: '请输入实际价格',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getMydetail({ id: this.$route.query.id })
  },
  mounted () { },
  methods: {
    submitForm () {
      this.$refs['elForm'].validate(async (valid) => {
        if (!valid) return
        const res = await recompose({ name: this.formData.name, price: this.formData.price, oldprice: this.formData.oldprice, id:this.$route.query.id })
        if (res.returncode == 200) {
          this.$message({
            message: '更新成功',
            type: 'success',
            onClose: () => {
              this.$router.go(-1)
            }
          })
        }
      })
    },

    async getMydetail (params) {
      const res = await getDeail(params)
      this.formData = res.data[0]
    }
  }
}

</script>
<style lang='scss' scoped>
.mid {
  width: 50%;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
