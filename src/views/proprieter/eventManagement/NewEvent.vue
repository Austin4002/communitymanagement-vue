<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动创建</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form :model="eventForm" ref="editFormRef" label-width="150px" label-position="left">
        <el-form-item label="活动名称">
          <el-input v-model="eventForm.name"></el-input>
        </el-form-item>

        <el-form-item label="活动地点">
          <el-input v-model="eventForm.place"></el-input>
        </el-form-item>

        <el-form-item label="活动一级类型">
          <el-select v-model="eventForm.type1" placeholder="请选择">
            <el-option
                v-for="item in type1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动二级类型">
          <el-select v-model="eventForm.type2" placeholder="请选择">
            <el-option
                v-for="item in type2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker
              v-model="eventForm.startAndEndTime"
              format="yyyy年MM月dd日 HH点mm分"
              value-format="yyyy年MM月dd日HH点mm分"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addEvent">创建活动</el-button>
        </el-form-item>
      </el-form>
    </el-card>


  </div>
</template>

<script>


import {proprieterAddEvent} from "@/network/event";
import {getClubByProprieterNo} from "@/network/club";

export default {
  name: "NewEvent",
  data() {
    return {
      eventForm: {
        place: '',
        type1: '',
        type2: '',
        startAndEndTime: []
      },
      club: {},
      type1: [
        {
          value: '国家级',
          label: '国家级'
        },
        {
          value: '省级',
          label: '省级'
        },
        {
          value: '校级',
          label: '校级'
        },
        {
          value: '院级',
          label: '院级'
        },
      ],
      type2: [
        {
          value: '招新',
          label: '招新'
        },
        {
          value: '换届',
          label: '换届'
        },
        {
          value: '比赛',
          label: '比赛'
        },
        {
          value: '展示',
          label: '展示'
        }
      ]
    }
  },
  created() {
    this.getClubInfo()
  },
  methods: {
    async addEvent() {
      if (this.club !== null) {
        await proprieterAddEvent(this.eventForm, this.club.id).then(res => {
          if (res.code === 200) {
            this.$message.success("添加成功")
            this.eventForm = {}
          }
        })
      }
    },
    async getClubInfo() {
      let proprieterNo = sessionStorage.getItem("no");
      await getClubByProprieterNo(proprieterNo).then(res => {
        if (res.code === 200) {
          this.club = res.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
