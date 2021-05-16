<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.name" placeholder="实验班课名字"/>
      </el-form-item>
      
      <el-form-item>
        <el-input v-model="courseQuery.teacherName" placeholder="实验班课老师名字"/>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="courseQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="courseQuery.end"
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

      <el-table-column prop="name" label="班课名称" width="130" />

      <el-table-column prop="userCreate" label="老师名称" width="130" />

      <el-table-column prop="number" label="班课最大人数" />

      <el-table-column prop="realityNumber" label="班课已加入人数" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column label="操作" width="500" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="getExDataByCourseId(scope.row.id)">班课中的实验</el-button>
          <router-link :to="'/edu/user/courseuser/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">班课用户</el-button>
          </router-link>
          <router-link :to="'/edu/course/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
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
import course from '@/api/edu/course'
export default {
    data() {
        return {
            list: null,//查询返回结果
            page: 1,
            limit: 10,
            total: 0,//总记录数
            courseQuery: {},
            listLoading: true
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
            course.getCoursePage(this.page,this.limit,this.courseQuery)
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
            this.courseQuery = {}
            this.getList()
        },
        removeDataById(id){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return course.removeById(id)
            }).then(() => {
                this.getList()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            })
        },
        getExDataByCourseId(id){
           this.$router.push({ path: `/edu/experiment/list/${id}` })
        }

    }

}
</script>

<style>

</style>