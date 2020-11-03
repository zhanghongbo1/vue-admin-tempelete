<template>
  <div class="up">
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px" inline>
        <el-form-item label="书本名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table
        :data="tableData"
        :show-overflow-tooltip="true"
        style="width: 100%"
        border
      >
        <el-table-column
          :prop="item.key"
          :label="item.val"
          align="center"
          v-for="item in list"
          :key="item.key"
        >
        </el-table-column>
        <el-table-column label="图1" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img1" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="图2" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img2" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="图3" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img3" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >{{ scope.row.isUp == 0 ? '上架' : '下架' }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align: right">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :current-page.sync="page"
          layout="total, prev, pager, next"
          :page-size="10"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getAllList, updateTable, seacrchBook } from '@/api/table'
export default {
  data () {
    return {
      tableData: [],
      form: {},
      page: 1,
      total: "",
      list: [
        { key: 'type', val: '类型' },
        { key: 'name', val: '书名' },
        { key: 'oldprice', val: '原价' },
        { key: 'price', val: '实际价格' },
        { key: 'state', val: '描述' },
        { key: 'createtime', val: '创建时间' },

      ]

    }
  },
  created () {
    this.getALL({ page: this.page })
  },
  methods: {
    async getALL (params) {
      const { data, total } = await getAllList(params)
      console.log(data)
      this.tableData = data
      this.total = total
    },
    async handleClick (val) {
      const res = await updateTable({ id: val.id, isUp: val.isUp })
      if (res.returncode == 200) {
        this.$message({
          type: 'success',
          message: val.isUp == 0 ? '上架成功' : '下架成功',
          onClose: () => {
            this.getALL()
          }
        })
      }
    },
    async search () {
      const res = await seacrchBook({ ...this.form })
    },
    handleCurrentChange (val) {
      this.page = val
      this.getALL({ page: val })
    }

  },
}
</script>

<style lang="scss" scoped>
.up {
  img {
    width: 40px;
    height: 40px;
  }
}
</style>