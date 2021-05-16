<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="nickname" label="昵称" width="130" />

      <el-table-column prop="sex" label="性别" width="130" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex == 1" >男</el-tag>
          <el-tag v-else-if="scope.row.sex == 2" >女</el-tag>
          <el-tag v-else >保密</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="age" label="年龄" />

      <el-table-column label="用户头像" >
        <template slot-scope="scope">
           <el-avatar shape="square" :size="30" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
    </el-table>  
    <!-- 分页条 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import user from '@/api/edu/user'
export default {
  data(){
    return {
      list: null,//查询返回结果
      page: 1,
      limit: 10,
      total: 0,//总记录数
      listLoading: true

    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(page =1){
      this.page = page
      this.listLoading = true
     if(this.$route.params && this.$route.params.id){
       user.getUserByCourseId(this.page,this.limit,this.$route.params.id).then(response =>{
         if(response.success){
           this.list = response.data.users
           this.total = response.data.total
         }
        this.listLoading = false
       })
     }
    }
  }
}
</script>

<style>

</style>