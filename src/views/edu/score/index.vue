<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="name" placeholder="实验名字"/>
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

      <el-table-column prop="name" label="班课名" width="130" />
      <el-table-column prop="userCreate" label="老师名" width="130" />
      <el-table-column prop="name" label="实验名" width="130" />
      <el-table-column label="最高分">
        <template slot-scope="scope">
         <el-tag v-if="scope.row.exData!=null"> {{scope.row.exData.max}}</el-tag>
         <el-tag v-else type="warning"> 无</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="最低分">
        <template slot-scope="scope">
         <el-tag v-if="scope.row.exData!=null"> {{scope.row.exData.min}}</el-tag>
         <el-tag v-else type="warning"> 无</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="平均分">
        <template slot-scope="scope">
         <el-tag v-if="scope.row.exData!=null"> {{scope.row.exData.avg}}</el-tag>
         <el-tag v-else type="warning"> 无</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
         <router-link :to="'/edu/score/score/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">评分</el-button>
          </router-link>
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
import experiment from '@/api/edu/experiment'
export default {
  data(){
      return {
      list:null,
       page: 1,
       limit: 10,
       total: 0,//总记录数
       listLoading: true,
       name:''
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    getList(){
      this.listLoading = true
      experiment.getExperimentScore(this.page,this.limit,this.name).then(response=>{
        if(response.success){
          this.list = response.data.experiment
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    resetData(){
    this.name = ''
    this.getList()
   }
  }
  
}
</script>

<style>

</style>