<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>社团管理</el-breadcrumb-item>
      <el-breadcrumb-item>社团评分规则设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form :model="starSet" label-width="150px" label-position="left">
        <el-form-item label="活动数量占比" >
          <el-input type="number" v-model="starSet.actionRate"></el-input>
        </el-form-item>
        <el-form-item label="签到率占比">
          <el-input type="number" v-model="starSet.rate" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="calculate">计算</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
import {calculateStar} from "@/network/club";

export default {
  name: "ClubRateSet",
  data(){
    return{
      starSet:{
        actionRate:'',
        rate:''
      }
    }
  },
  methods:{
    calculate(){
      calculateStar(this.starSet.rate,this.starSet.actionRate).then(res=>{
        if (res.code === 200){
          this.$message.success("操作成功")

        }else {
          this.$message.error("操作失败")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
