<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="xpcAttrQuery.ip" placeholder="xpc的ip"/>
      </el-form-item>
      
      <el-form-item>
        <el-input v-model="xpcAttrQuery.port" placeholder="xpc端口"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <el-button type="primary" @click="dialogVisible = true">批量添加</el-button>
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

      <el-table-column prop="ip" label="xpc的IP地址" />

      <el-table-column prop="port" label="xpc的端口号" />

      <el-table-column  label="使用情况" >
           <template slot-scope="scope">
               <el-tag v-if="scope.row.isUse" type="danger">使用中</el-tag>
               <el-tag v-else type="success">未使用</el-tag>
           </template>
      </el-table-column>


      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/xpcAttr/edit/'+scope.row.id">
            <el-button type="primary"  icon="el-icon-edit" :disabled="scope.row.isUse">修改</el-button>
          </router-link>
          <el-button type="danger"  icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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
        title="批量添加"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <el-form label-width="120px">
                <el-form-item label="信息描述">
                    <el-tag type="info">excel模版说明</el-tag>
                    <el-tag>
                    <i class="el-icon-download"/>
                    <a :href="OSS_PATH">点击下载模版</a>
                    </el-tag>

                </el-form-item>

                <el-form-item label="选择Excel">
                    <el-upload
                    ref="upload"
                    :auto-upload="false"
                    :on-success="fileUploadSuccess"
                    :on-error="fileUploadError"
                    :disabled="importBtnDisabled"
                    :limit="1"
                    action="http://localhost:8222/manageservice/xpcAttr/saveBatch"
                    name="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button
                        :loading="loading"
                        style="margin-left: 10px;"
                        size="small"
                        type="success"
                        @click="submitUpload">{{ fileUploadBtnText }}</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
        </el-dialog>
  </div>
</template>

<script>
import xpcAttr from '@/api/edu/xpcAttr'
export default {
    data() {
        return {
            list: null,//查询返回结果
            page: 1,
            limit: 10,
            total: 0,//总记录数
            xpcAttrQuery: {},
            listLoading: true,
            dialogVisible: false,
            OSS_PATH: "https://simulink-experiment.oss-cn-hangzhou.aliyuncs.com/excel/1.xlsx", // 阿里云OSS地址
            fileUploadBtnText: '上传到服务器', // 按钮文字
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false
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
            xpcAttr.getXpcAttrPage(this.page,this.limit,this.xpcAttrQuery)
                .then( response => {
                    if (response.success === true) {
                        this.list = response.data.list
                        this.total = response.data.total
                    }
                    this.listLoading = false
                })
                .catch(error => { console.log(error)})          
        },
        resetData() {
            this.xpcAttrQuery = {}
            this.getList()
        },
        removeDataById(id){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return xpcAttr.removeById(id)
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
        },
         submitUpload(){
            this.fileUploadBtnText = '正在上传'
            this.importBtnDisabled = true
            this.loading = true
            this.$refs.upload.submit()
        },
        fileUploadSuccess(response) {
            if (response.success === true) {
            this.fileUploadBtnText = '添加地址成功'
            this.loading = false
            this.$message({
                type: 'success',
                message: response.message
            })
            }
            this.dialogVisible  = false
            //重新获取list
            this.getList()
        },

        fileUploadError(response) {
            this.fileUploadBtnText = '添加地址失败'
            this.loading = false
            this.$message({
            type: 'error',
            message: '导入失败'
            })
        }

    }

}
</script>

<style>

</style>