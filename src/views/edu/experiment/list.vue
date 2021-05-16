<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">      
      <el-form-item>
        <el-input v-model="experimentQuery.name" placeholder="实验名字"/>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="experimentQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="experimentQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
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

      <el-table-column prop="name" label="实验名称" width="130" />

      <el-table-column prop="courseName" label="班课名称" width="130" />

      <el-table-column prop="userCreate" label="老师名称" width="130" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="gmtEnd" label="结束时间" width="160"/>

      <el-table-column label="操作" width="360" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="getExDetail(scope.row.id)">实验详情</el-button>
          <router-link :to="'/edu/experiment/edit/'+scope.row.id">
            <el-button type="warning" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <router-link :to="'/edu/score/score/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">评分</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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
    data() {
        return {
            list: null,//查询返回结果
            page: 1,
            limit: 10,
            total: 0,//总记录数
            experimentQuery: {},
            listLoading: true
        }
    },
    created() {
         this.init()
    },
   watch: {
       $route(to, from) {
           this.init()
       }
   },
    methods:{
       init(){
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.experimentQuery.courseId = id
        }
        this.getList()
       },
        // 获取所有数据
        getList(page =1) {
            this.page = page
            this.listLoading = true
            experiment.getExperimentPage(this.page,this.limit,this.experimentQuery)
                .then( response => {
                    if (response.success === true) {
                        this.list = response.data.pages.experimentPageList
                        this.total = response.data.pages.total
                    }
                    this.listLoading = false
                })
                .catch(error => { console.log(error)})          
        },
        resetData() {
            this.experimentQuery = {}
            this.getList()
        },
        removeDataById(id){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return experiment.removeById(id)
            }).then(() => {
                this.getList()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            })
        },
        getExDetail(id){
          this.$router.push({path:`/edu/experiment/detail/${id}`})
        }
    }

}
</script>

<style>

</style>