<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="实验名称">
        <el-input v-model="experiment.name"/>
      </el-form-item>
      <el-form-item label="实验描述">
        <tinymce :height="300" v-model="experiment.description"></tinymce>
      </el-form-item>
      <el-form-item label="实验文件">
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:8222/eduoss/fileoss/file"
        :on-success="handlesuccess"
        :file-list="experiment.fileList"
        :on-remove="handleRemove"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      </el-form-item>
      <el-form-item label="实验结束时间">
        <el-date-picker
          v-model="experiment.gmtEnd"
          type="datetime"
          placeholder="选择结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item label="班课名称">
           <el-cascader v-model="courseId"  placeholder="老师名/班课名称" :options="teacherCourseLists"></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import experiment from '@/api/edu/experiment'
import course from '@/api/edu/course'
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  computed: {
    ...mapGetters([
      'nikeName'
    ])
  },
    data() {
    return {
      experiment: {
        name: '',
        description: '',
        gmtEnd: '',
        courseId: '',
        fileList: []
      },
      saveBtnDisabled: false, // 保存按钮是否禁用
      teacherCourseLists:[],
      courseId:[]
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
  methods: {
    init() {
        if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id       
        this.fetchDataById(id)
        }else{
            this.experiment = {}
            this.experiment.fileList = []
            this.getTeacherCourseList() 
        }
    },
    getTeacherCourseList() {
        course.getTeacherCourse().then(response => {
            this.teacherCourseLists = response.data.list
        })
    },
    saveOrUpdate() {
       this.saveBtnDisabled = true
        if (!this.experiment.id) {
            this.saveData()
        } else {
            this.updateData()
        }
    },

    // 保存
    saveData() {
        this.experiment.courseId = this.courseId[1]
         experiment.addExperiment(this.experiment).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/edu/experiment/list' })
      })
    },// 根据id查询记录
    fetchDataById(id) {
        // 等待多个异步方法执行完成在执行
        Promise.all([
            // 获取实验信息
            experiment.getExperiment(id).then(response => {
            this.experiment = response.data.experiment
            console.log(response.data.fileList)
            this.experiment.fileList = []
            if(response.data.fileList!=null){
              response.data.fileList.forEach(element => {
                this.experiment.fileList.push({url: element.url,name: element.fileName})
              });
            }
            }
            ),
            // 获取班课和老师信息
            course.getTeacherCourse().then(response => {
            this.teacherCourseLists = response.data.list})
            ]).then(response => {
            this.setCourseID()
        })
        
        
    },
    // 根据id更新记录
    updateData() {
        this.saveBtnDisabled = true
        experiment.updateExperimentById(this.experiment).then(response => {
            return this.$message({
                type: 'success',
                message: '修改成功!'
            })
        }).then(resposne => {
            this.$router.push({ path: '/edu/experiment/list' })
        })
    },
    // 给级联框中赋值
    setCourseID(){
        // 给courseId赋值
        
            for(let i in this.teacherCourseLists ){
                var teacher = this.teacherCourseLists[i]
                for(let j in  teacher.children){
                    var course = teacher.children[j]
                    if(course.value === this.experiment.courseId){
                        this.courseId=[teacher.value,course.value]
                        break;
                    }
                }
            }
    },
    //文件上传成功的钩子
    handlesuccess(response,file,fileList){
      if(response.success){
        this.experiment.fileList.push(response.data)
      }
    },
    //文件列表移除文件
    handleRemove(file,fileList){
      this.experiment.fileList = [] 
      fileList.forEach(e=>{
        this.experiment.fileList.push({url: e.url,name: e.name})
      })
    }
    

  }
}
</script>

<style>

</style>