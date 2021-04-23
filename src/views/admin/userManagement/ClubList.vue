<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>社团列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog">添加社团</el-button>
        </el-col>
      </el-row>
      <el-table :data="clubList" border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="社团名称" prop="name"></el-table-column>
        <el-table-column label="星级" prop="starLevel">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.starLevel" disabled></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip effect="Light" content="编辑" placement="left">
              <el-button type="info" size="mini" :enterable="false" @click="showClubInfo(scope.row.id)">查看详情</el-button>
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
    <el-dialog title="新建社团" :visible.sync="addDialogVisible" width="60%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px" label-position="left">
        <el-form-item label="社团名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="社团简介" prop="description">
          <el-input
              type="textarea"
              maxlength="120"
              show-word-limit
              :rows="2"
              placeholder="请输入内容"
              v-model="addForm.description">
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClubInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {addClub, clubList, getClubById} from "@/network/club";

export default {
  name: "ClubList",
  data() {
    return {
      clubList:[],
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,
      //总条数
      totalCount:0,
      //总页数
      totalPage: 0,

      addDialogVisible: false,

      addForm:{
        name:'',
        description:''
      },
      addFormRules: {
        name: [
          {required: true, message: '请输入社团名称', trigger: 'blur'},
        ],
        description: [
          {required: true, message: '请输入社团简介', trigger: 'blur'},
        ]
      },
    }
  },
  created() {
    this.getClubList()
  },
  methods:{
    //监听pageSize改变的时间
    handleSizeChange(newSize){
      this.pageSize = newSize
      this.getClubList()
    },
    //监听翻页操作
    handleCurrentChange(newPage){
      this.currentPage = newPage
      this.getClubList()
    },
    showAddDialog(){
      this.addDialogVisible = true
    },
    addDialogClosed(){
      this.$refs.addFormRef.resetFields()
    },
    getClubList(){
      clubList(this.currentPage,this.pageSize).then(res =>{
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: '数据获取失败',
            type: 'error',
            center: true
          })
        } else if ( res.code === 200){
          this.clubList = res.data.records
          this.totalPage = res.data.pages
          this.totalCount = res.data.total
        }

      })
    },
    showClubInfo(id){
      this.$router.push({path:'/home/userManagement/club/clubInfo',query:{id:id}})
      // console.log(id);
    },
    addClubInfo(){
      this.$refs.addFormRef.validate(valid =>{
        if(!valid) return
        addClub(this.addForm).then(res =>{
          if (res.code != 200){
            this.$message({
              showClose:true,
              message:'添加失败',
              type:'error',
              center:true
            })
          } else {
            this.$message.success({
              message:"添加成功",
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
    },
  }
}
</script>

<style scoped>

</style>
