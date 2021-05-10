<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/home/proprieter/eventManagement/eventList'}">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="eventForm" ref="editFormRef" label-width="150px" label-position="left">
        <el-form-item label="活动名称">
          <el-input v-model="eventForm.name"></el-input>
        </el-form-item>
        <el-form-item label="参与社团">
          <el-tag v-for="item in eventForm.clubList">{{ item.name }}</el-tag>
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input v-model="eventForm.place"></el-input>
        </el-form-item>

        <el-form-item label="活动一级类型">
          <el-input v-model="eventForm.type1"></el-input>
        </el-form-item>
        <el-form-item label="活动二级类型">
          <el-input v-model="eventForm.type2"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="eventForm.startTime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="eventForm.endTime"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="SignIn">签到</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import {getEventInfoById, studentSignInEvent} from "@/network/event";

export default {
  name: "EventInfo",
  data() {
    return {
      eventForm: {
        place: '',
        type1: '',
        type2: '',
      },
      clubSize: 0
    }
  },
  created() {
    this.getEventById()
  },
  methods: {
    getEventById() {
      let eventId = this.$route.query.id;
      getEventInfoById(eventId).then(res => {
        if (res.code !== 200) {
          this.$message.error("数据获取失败，请重试")
        } else {
          this.eventForm = res.data
        }
      })
    },
    SignIn() {
      let eventId = this.$route.query.id;
      let stuNo = sessionStorage.getItem("no")
      studentSignInEvent(stuNo, eventId).then(res => {
        if (res.code === 200) {
          this.$message.success("签到成功")
        } else if (res.code === 503) {
          this.$message.warning(res.msg)
        } else {
          this.$message.error("操作失败，请重试")
        }

      })

    }
  }
}
</script>

<style scoped>

</style>
