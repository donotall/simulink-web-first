<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="班课名称">
        <el-input v-model="course.name"/>
      </el-form-item>
      <el-form-item label="班课描述">
        <el-input v-model="course.description"/>
      </el-form-item>
      <el-form-item label="班课最大人数">
        <el-input-number v-model="course.number" controls-position="right" :min="0"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from '@/api/edu/course'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'nikeName'
    ])
  },
    data() {
    return {
      course: {
        name: '',
        description: '',
        number: '',
        userCreate: ''
      },
      saveBtnDisabled: false, // 保存按钮是否禁用
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
            this.course = {}
        }
    },
    saveOrUpdate() {
       this.saveBtnDisabled = true
        if (!this.course.id) {
            this.saveData()
        } else {
            this.updateData()
        }
    },

    // 保存
    saveData() {
      this.course.userCreate = this.nikeName
      console.log(this.nikeName)
         course.addcourse(this.course).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/edu/course/list' })
      })
    },// 根据id查询记录
    fetchDataById(id) {
        course.getCourseById(id).then(response => {
            this.course = response.data.course
        })
    },
    // 根据id更新记录
    updateData() {
        this.saveBtnDisabled = true
        course.updateCourseById(this.course).then(response => {
            return this.$message({
                type: 'success',
                message: '修改成功!'
            })
        }).then(resposne => {
            this.$router.push({ path: '/edu/course/list' })
        })
    }
    

  }
}
</script>

<style>

</style>