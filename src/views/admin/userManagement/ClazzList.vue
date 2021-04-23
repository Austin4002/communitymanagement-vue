<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>班级列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog">添加班级</el-button>
        </el-col>
      </el-row>

      <el-table :data="classList">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="班级名称" prop="name"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip effect="Light" content="编辑" placement="left">
              <el-button type="primary" icon="el-icon-edit" size="mini" :enterable="false" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip effect="Light" content="删除" placement="right">
              <el-button type="danger" icon="el-icon-delete" size="mini" :enterable="false" @click="deleteClassById(scope.row.id)"></el-button>
            </el-tooltip>
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
    <el-dialog title="添加班级" :visible.sync="addDialogVisible" width="60%" @close="addDialogClosed">
      <el-form :model="addForm" ref="addFormRef" label-width="150px" label-position="left">
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClassInfo">确 定</el-button>
      </span>
    </el-dialog>


    <!--修改信息-->
    <el-dialog title="修改班级信息" :visible.sync="editDialogVisible" width="60%" @close="editDialogClosed">
      <el-form :model="editForm" ref="editFormRef" label-width="150px" label-position="left">
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editClassInfo">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>

import {addClass, classList, deleteClassById, getClassById, updateClassById} from "@/network/clazz";

export default {
  name: "ClazzList",
  data() {
    return {
      classList:[],
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,
      //总条数
      totalCount:0,
      //总页数
      totalPage: 0,
      editDialogVisible: false,
      addDialogVisible: false,
      editForm:{
        id:'',
        name:''
      },
      addForm:{
        name:''
      }
    }
  },
  created() {
    this.getClassList()
  },
  methods: {
    //监听pageSize改变的时间
    handleSizeChange(newSize){
      this.pageSize = newSize
      this.getClassList()
    },
    //监听翻页操作
    handleCurrentChange(newPage){
      this.currentPage = newPage
      this.getClassList()
    },
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
    },
    addDialogClosed(){
      this.$refs.addFormRef.resetFields()
    },
    getClassList(){
      classList(this.currentPage,this.pageSize).then(res =>{
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: '数据获取失败',
            type: 'error',
            center: true
          })
        } else if ( res.code === 200){
          // console.log(res.data);
          this.classList = res.data.records
          this.totalPage = res.data.pages
          this.totalCount = res.data.total
        }

      })
    },
    addClassInfo(){
      this.$refs.addFormRef.validate(valid =>{
        if(!valid) return
        addClass(this.addForm).then(res =>{
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
            this.getClassList()
          }
        },error =>{
          console.log(error);
        })
      })
    },
    async deleteClassById(id){
      const confirmResult = await this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if(confirmResult !== 'confirm'){
        return this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }

      const res = await deleteClassById(id)
      if(res.code !==200){
        return this.$message({
          showClose:true,
          message:'删除失败',
          type:'error',
          center:true
        })
      }

      this.$message.success({
        message:"删除成功",
        showClose:true
      })

      this.getClassList()
    },
    showAddDialog(){
      this.addDialogVisible = true
    },
    showEditDialog(id){
      this.editDialogVisible = true
      getClassById(id).then(res =>{
        if(res.code !==200){
          this.$message({
            showClose: true,
            message: '数据查询失败',
            type: 'error',
            center: true
          })
        } else if (res.code === 200) {
          this.editForm = res.data
        }
      },error =>{
        console.log(error);
      })
    },
    editClassInfo(){
      this.$refs.editFormRef.validate(valid =>{
        if(!valid) return
        //发起修改用户的请求
        updateClassById(this.editForm).then(res =>{
          if (res.code !== 200) {
            this.$message({
              showClose: true,
              message: '更新失败',
              type: 'error',
              center: true
            })
            return
          } else if(res.code === 200){
            this.$message.success({
              message:"更新成功",
              showClose:true
            })
            //关闭对话框
            this.editDialogVisible = false

            //刷新数据
            this.getClassList()
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
