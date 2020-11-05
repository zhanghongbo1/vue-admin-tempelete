<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="type" label="类型" align='center'> </el-table-column>
      <el-table-column prop="name" label="书名" align='center'> </el-table-column>
      <el-table-column prop="oldprice" label="原价" align='center'> </el-table-column>
      <el-table-column prop="price" label="实际价格" align='center'> </el-table-column>
      <el-table-column prop="state" label="描述" align='center'> </el-table-column>
      <el-table-column prop="createtime" label="创建时间" align='center'> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align='center'>
        <template slot-scope="scope">
          <el-button
            @click=""
            type="text"
            size="small"
            v-show="scope.row.price"
            @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            v-show="scope.row.price"
            @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
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
  </div>
</template>

<script>
import { getList } from '@/api/table'
export default {
  name: "tableSelect",
  data () {
    return {
      tableData: [
      ],
      page: 1,
      total: 10
    }
  },
  created () {
    this.getTable({ page: this.page })
  },
  methods: {
    async getTable (params) {
      const res = await getList(params)
      this.tableData = res.data
      this.total= res.total

    },
    handleCurrentChange (val) {
      this.page = val
      this.getTable({ page: this.page })
    },
    edit(val){
      this.$router.push({path:'/book/detail',query:{id:val.id}})
    }
  },
}
</script>
<style lang="scss" scoped>
  .block{
    text-align: right;
  }

</style>