<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>经费管理</el-breadcrumb-item>
      <el-breadcrumb-item>入账管理</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>
      <el-table :data="clubList" border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="社团名称" prop="name"></el-table-column>
        <el-table-column label="免申请周期" prop="period"></el-table-column>
        <el-table-column label="免申请周期开始时间" prop="financeStartTime"></el-table-column>
        <el-table-column label="免申请金额" prop="money"></el-table-column>

        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip effect="Light" content="编辑" placement="left">
              <el-button type="info" size="mini" :enterable="false" @click="showFinanceInfo(scope.row.id)">设置</el-button>
            </el-tooltip>
            <!--            <el-tooltip effect="Light" content="删除" placement="right">-->
            <!--              <el-button type="danger" icon="el-icon-delete" size="mini" :enterable="false" @click="deleteClubById(scope.row.id)"></el-button>-->
            <!--            </el-tooltip>-->
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 3, 5]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
      </el-pagination>
    </el-card>

    <!--添加信息-->
    <el-dialog title="设置入账" :visible.sync="addDialogVisible" width="60%" @close="addDialogClosed">
      <el-form :model="addForm" ref="addFormRef" label-width="150px" label-position="left">
        <el-form-item label="社团名称">
          <el-input v-model="addForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="免申请周期">
          <el-select v-model="addForm.period">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
              v-model="addForm.financeStartTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"

              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="addForm.money" type="number" ></el-input>
        </el-form-item>


      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setClubFinance">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {addClub, clubList, getClubById} from "@/network/club";
import {clubFianceSetting} from "@/network/finance";

export default {
  name: "In",
  data() {
    return {
      clubList: [],
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,
      //总条数
      totalCount: 0,
      //总页数
      totalPage: 0,
      addDialogVisible:false,
      addForm: {
        financeStartTime:'',
        money:0
      },
      options: [
        {
          value: "一周",
          label: '一周'
        },
        {
          value: "一个月",
          label: '一个月'
        },
        {
          value: "三个月",
          label: '三个月'
        },
        {
          value: "一年",
          label: '一年'
        }
      ],

    }
  },
  created() {
    this.getClubList()
  },
  methods: {
    //监听pageSize改变的时间
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getClubList()
    },
    //监听翻页操作
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getClubList()
    },
    addDialogClosed(){
      this.$refs.addFormRef.resetFields()
    },
    getClubList() {
      clubList(this.currentPage, this.pageSize).then(res => {
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: '数据获取失败',
            type: 'error',
            center: true
          })
        } else if (res.code === 200) {
          this.clubList = res.data.records
          this.totalPage = res.data.pages
          this.totalCount = res.data.total
        }
      })
    },
    showFinanceInfo(clubId) {
      this.addDialogVisible = true
      getClubById(clubId).then(res => {
        if (res.code ===200){
          this.addForm = res.data

        }else{
          this.$message.error("操作失败，请重试")
        }
      }, error => {
        console.log(error);
      })
    },
    setClubFinance(){
      this.$refs.addFormRef.validate(valid =>{
        if(!valid) return
        clubFianceSetting(this.addForm).then(res =>{
          if (res.code !== 200){
            this.$message.error("操作失败")
          } else {
            this.$message.success({
              message:"设置成功",
              showClose:true
            })
            //关闭对话框
            this.addDialogVisible = false
            //刷新数据
            this.getClubList()
          }
        },error =>{
          console.log(error);
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
