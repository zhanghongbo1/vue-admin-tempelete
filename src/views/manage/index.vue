<template>
  <div class="bookMange">
    <el-card class="box-card">
      <el-button type="primary" @click="type = true">分类管理</el-button>
      <el-button type="primary" @click="bookShow">书本管理</el-button>
    </el-card>
    <el-card class="box-card">
      <tableSelect></tableSelect>
    </el-card>
    <el-dialog title="分类添加" :visible.sync="type" width="30%">
      <div class="inner">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="add">添加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="书本添加" :visible.sync="book" width="40%">
      <div>
        <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="书本名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="原本价格" prop="oldprice">
            <el-input v-model="form.oldprice"></el-input>
          </el-form-item>
          <el-form-item label="实际价格" prop="oldprice">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="书本类别" prop="type">
            <el-select
              v-model="form.type"
              placeholder="请选择书本类别"
              style="width: 100%"
            >
              <el-option
                :label="item"
                :value="item"
                :key="index"
                v-for="(item, index) in typesList"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="书本图片" required>
            <div style="display: flex; justify-content: space-between">
              <el-form-item prop="img1">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadQiniuUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :data="qiniuData"
                >
                  <img v-if="form.img1" :src="form.img1" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item prop="img2">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadQiniuUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload"
                  :data="qiniuData"
                >
                  <img v-if="form.img2" :src="form.img2" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item prop="img3">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadQiniuUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess3"
                  :before-upload="beforeAvatarUpload"
                  :data="qiniuData"
                >
                  <img v-if="form.img3" :src="form.img3" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="描述" prop="state">
            <el-input
              v-model="form.state"
              type="textarea"
              placeholder="请输入多行书本的描述"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" class="add" @click="submitForm('ruleForm')"
          >添加</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addTypes, getTypes, getTokens, bookAdd } from '@/api/manage'
import tableSelect from './table'
export default {
  components: {
    tableSelect
  },
  data () {
    return {

      type: false,
      book: false,
      input: '',
      uploadQiniuUrl: "https://upload.qiniup.com",
      qiniuaddr: "http://tp.zhanghongbo.top/",
      typesList: [],
      form: {
        name: '',
        price: "",
        oldprice: "",
        type: '',
        img1: '',
        img2: '',
        img3: '',
        state: ''
      },
      qiniuData: {
        token: "",
        key: ""
      },
      rules: {
        name: [{ required: true, message: '请输入书本名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择书本类型', trigger: 'blur' }],
        oldprice: [{ required: true, message: '原来价格不能为空', trigger: 'blur' },
        { pattern: /^-?\d+\.?\d*$/, message: '金额只能为数字', trigger: 'blur' }
        ],
        price: [{ required: true, message: '原来价格不能为空', trigger: 'blur' },
        { pattern: /^-?\d+\.?\d*$/, message: '金额只能为数字', trigger: 'blur' }],
        img1: [{ required: true, message: '图片不能为空', trigger: 'blur' }],
        img2: [{ required: true, message: '图片不能为空', trigger: 'blur' }],
        img3: [{ required: true, message: '图片不能为空', trigger: 'blur' }],
        state: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
      }
    }
  },

  methods: {
    add () {
      this.addType({ type: this.input })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addBook()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async bookShow () {
      this.book = true
      await this.getType({})
      await this.getToken()
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      this.qiniuData.key = new Date().getTime() + file.name
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    handleAvatarSuccess (res, file) {
      this.form.img1 = this.qiniuaddr + res.key
    },
    handleAvatarSuccess2 (res, file) {
      this.form.img2 = this.qiniuaddr + res.key
    },
    handleAvatarSuccess3 (res, file) {
      this.form.img3 = this.qiniuaddr + res.key
    },
    async addType (params) {
      const res = await addTypes(params)
    },
    async getType (params) {
      const res = await getTypes(params)
      this.typesList = res.result
    },
    async getToken () {
      const { uploadToken } = await getTokens({})
      this.qiniuData.token = uploadToken
    },
    async addBook () {
      const res = await bookAdd(this.form)
      if (res.returncode == 200) {
        var that = this
        this.$message({
          type: 'success',
          message: res.message,
          onClose: () => {
            that.book = false
          }
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.bookMange {
  /deep/ .inner {
    display: flex;
  }
  /deep/ .add {
    display: block;
    margin: 0 auto;
  }
  /deep/ textarea {
    resize: none;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>