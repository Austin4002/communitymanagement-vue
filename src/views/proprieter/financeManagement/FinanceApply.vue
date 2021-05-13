<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>经费管理</el-breadcrumb-item>
      <el-breadcrumb-item>经费申请</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form :model="financeForm" ref="editFormRef" label-width="150px" label-position="left">
        <el-form-item label="用途">
          <el-input v-model="financeForm.purpose"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="financeForm.money"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="applyFinance">提交申请</el-button>
        </el-form-item>
      </el-form>

    </el-card>

  </div>
</template>

<script>
import {proprieterApplyFinance} from "@/network/finance";

export default {
  name: "FinanceApply",
  data() {
    return {
      financeForm: {
        purpose: '',
        money:''
      }
    }
  },
  methods: {
    applyFinance() {
      let stuNo = sessionStorage.getItem("no")
      proprieterApplyFinance(stuNo, this.financeForm).then(res => {
        if (res.code === 200) {
          this.$message.success("提交成功")
          this.financeForm = {}
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
