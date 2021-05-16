<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="userQuery.nikename" placeholder="用户名"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
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
      <el-table-column label="是否禁用(否/是)">
        <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isDisabled"
              active-color="#ff4949"
              inactive-color="#13ce66"
              @change="changeAble(scope.row.id,scope.row.isDisabled)">
            </el-switch>
        </template>
      </el-table-column>
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
    data() {
        return {
            list: null,//查询返回结果
            page: 1,
            limit: 10,
            total: 0,//总记录数
            userQuery: {},
            listLoading: true,
            value: false,
            changeDisabled:{}
        }
    },
    created() {
        this.getList()
    },
    methods:{
        // 获取所有数据
        getList(page =1) {
            this.page = page
            this.listLoading = true
            user.getUserPage(this.page,this.limit,this.userQuery)
                .then( response => {
                    if (response.success === true) {
                        this.list = response.data.items
                        this.total = response.data.total
                    }
                    this.listLoading = false
                })
                .catch(error => { console.log(error)})          
        },
        resetData() {
            this.userQuery = {}
            this.getList()
        },
        // 修改用户的状态
        changeAble(id,disable){
          this.changeDisabled.id = id
          this.changeDisabled.disabled = disable
          user.changeDisabled(this.changeDisabled).then( response =>{
            if (response.success === true) {
              this.$message({
              message: '成功',
              type: 'success'})
            }
          })
        }
    }

}
</script>

<style>

</style>