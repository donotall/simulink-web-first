<template>
  <div class="app-container">
    <el-form label-width="120px" :model="xpcAttr" :rules="rules" ref="ruleForm">
      <el-form-item label="ip地址">
        <el-input v-model="xpcAttr.ip"/>
      </el-form-item>
      <el-form-item label="xpc端口号">
        <el-input v-model="xpcAttr.port"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import xpcAttr from '@/api/edu/xpcAttr'
export default {
    data() {
    return {
      xpcAttr: {
        ip: '',
        port: '',
      },
      saveBtnDisabled: false, // 保存按钮是否禁用
      rules:{

      }
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
            this.xpcAttr = {}
        }
    },
    saveOrUpdate(formName) {
       this.$refs[formName].validate((valid) =>{
           if(valid){
            return this.$message.error("ip地址或者port不符合要求")
           }
            this.saveBtnDisabled = true
            if (!this.xpcAttr.id) {
                this.saveData()
            } else {
                this.updateData()
            }
       })
    },

    // 保存
    saveData() {
         xpcAttr.addXpcAttr(this.xpcAttr).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/edu/xpcAttr/list' })
      })
    },// 根据id查询记录
    fetchDataById(id) {
        xpcAttr.getXpcAttrByid(id).then(response => {
            this.xpcAttr = response.data.attr
        })
    },
    // 根据id更新记录
    updateData() {
        this.saveBtnDisabled = true
        xpcAttr.UpdatXpcAttr(this.xpcAttr).then(response => {
            return this.$message({
                type: 'success',
                message: '修改成功!'
            })
        }).then(resposne => {
            this.$router.push({ path: '/edu/xpcAttr/list' })
        })
    }
    

  }
}
</script>

<style>

</style>