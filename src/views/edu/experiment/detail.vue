<template>
  <div>
      <el-button class="back" icon="el-icon-back" @click="back()">返回</el-button>
      <div class="msg"> 
        <el-form v-model="list">
            <el-form-item label="实验名称">
                <el-input :disabled="true" v-model="list.name"></el-input>
            </el-form-item>
            <el-form-item label="实验描述">
                <el-input v-html="list.description" :disabled="true">{{list.description}}</el-input>
            </el-form-item>
            <el-form-item label="实验文件">
                <div v-if="fileList.length !==0">
                    <div v-for="(item) in fileList" :key="item.id">
                        <el-tag @click="download(item.url)">{{item.fileName}}</el-tag>
                    </div>
                </div>
            </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import experiment from '@/api/edu/experiment'
export default {
    data(){
        return {
            list:{},
            fileList:[]
        }
    },
    mounted(){
        this.getList()
    },

    methods:{
        getList(){
            if(this.$route.params && this.$route.params.id){
               experiment.getExperiment(this.$route.params.id).then(response=>{
                   if(response.success){
                       this.list = response.data.experiment
                       this.fileList = response.data.fileList
                   }
               })
            }
        },
        download(url){
            window.open(url)
        },
        back(){
            this.$router.push({path:'/edu/experiment/list'})
        }
    }
}
</script>
<style scoped>
.back{
    margin-left: 10px;
    margin-top: 10px;
}
.msg{
    margin-left: 200px;
}
</style>