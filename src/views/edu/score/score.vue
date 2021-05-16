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

      <el-table-column prop="userName" label="姓名" width="130" />
      <el-table-column prop="experimentName" label="实验名称" width="130" />

      <el-table-column label="实验完成情况" width="130" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.finished == true" type="success" >已完成</el-tag>
          <el-tag v-else-if="scope.row.finished == false" type="danger">未完成</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="score" label="得分" />

      <el-table-column label="实验评分情况" width="130" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isScore == true" type="success" >已评分</el-tag>
          <el-tag v-else-if="scope.row.isScore == false" type="danger">未评分</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130" >
        <template slot-scope="scope">
          <el-button type="success" @click="getUrl(scope.row)">评分</el-button>
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
    <el-dialog
        title="评分"
        :visible.sync="dialogVisible"
        width="60%">
        <div>
            <span>学生提交数据展示</span>
            <el-image
                style="width: 100px; height: 100px"
                src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1278177485,1285685648&fm=26&gp=0.jpg" 
                :preview-src-list="imgUrl" fit="contain">
            </el-image>
        </div>
        <el-form>
          <el-form-item label="实验评分">
           <el-input v-model="studentscore"  placeholder="请输入分数" max="100" min="0" type="number"></el-input>
          </el-form-item>
          <el-form-item>
           <el-button @click="changeScore()" type="success" class="commmitScore">提交</el-button>
          </el-form-item>
        </el-form>
    </el-dialog> 
  </div>
</template>

<script>
import scores from '@/api/edu/score'
import user from '@/api/edu/user'
export default {
    data(){
        return {
            list: null,
            page:1,
            limit:10,
            total:0,
            studentscore:0,
            dialogVisible:false,
            imgUrl:[],
            id:"",
            listLoading:true
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
          this.listLoading = true
            if(this.$route.params && this.$route.params.id){
                scores.getScorePage(this.$route.params.id,this.page,this.limit).then(response=>{
                    if(response.success){
                        this.list = response.data.items
                        this.total = response.data.total
                    }
                    this.listLoading = false
                })
            }
        },
        getUrl(msg){
            user.getImgUrl(msg.userId,msg.experimentId).then(response =>{
                if(response.success){
                    this.imgUrl = [] 
                    response.data.imgUrl.forEach(element => {
                        this.imgUrl.push(element.url)
                    });
                    this.dialogVisible = true
                    this.studentscore = msg.score
                    this.id = msg.id
                }
            })
        },
        changeScore(){
            scores.setScore(this.id,this.studentscore).then(response =>{
                if(response.success){
                    this.$message.success("评分成功！")
                    this.dialogVisible = false
                    this.getList()
                }
            })
        }
    }
}
</script>

<style scoped>
.commmitScore{
   margin-left: 22em;
}
</style>