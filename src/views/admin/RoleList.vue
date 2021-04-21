<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table :data="roleList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini" :enterable="false" @click="deleteRole(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配权限" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini" :enterable="false" ></el-button>
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

    <!--添加角色对话框-->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="60%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px" label-position="left">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改角色对话框-->
    <el-dialog title="修改角色信息" :visible.sync="editDialogVisible" width="60%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="150px" label-position="left">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="editForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleInfo">确 定</el-button>
      </span>

    </el-dialog>


  </div>
</template>

<script>
import {addRole, deleteRoleById, getRoleById, roleList, updateRoleById} from "@/network/permission";

export default {
  name: "RoleList",
  data(){
    return {
      roleList:[],
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,
      //总条数
      totalCount:0,
      //总页数
      totalPage: 0,
      addDialogVisible:false,
      addForm:{},
      addFormRules:{
        name:[
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        description:[
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
      },
      editDialogVisible:false,
      editForm:{},
      editFormRules:{
        description:[
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods:{
    //监听pageSize改变的时间
    handleSizeChange(newSize){
      this.pageSize = newSize
      this.getRoleList()
    },
    //监听翻页操作
    handleCurrentChange(newPage){
      this.currentPage = newPage
      this.getRoleList()
    },
    // 获取角色信息
    getRoleList(){
      roleList(this.currentPage,this.pageSize).then(res =>{
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: '数据获取失败',
            type: 'error',
            center: true
          })
        } else if ( res.code === 200){
          // console.log(res.data);
          this.roleList = res.data.records
          this.totalPage = res.data.pages
          this.totalCount = res.data.total
        }

      })
    },
    // 展示添加角色对话框
    showAddDialog(){
      this.addDialogVisible = true
    },
    // 展示修改角色对话框
    showEditDialog(id){
      this.editDialogVisible = true
      getRoleById(id).then(res =>{
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
    // 修改角色信息
    editRoleInfo(){
      this.$refs.editFormRef.validate(valid =>{
        if(!valid) return
        //发起修改用户的请求
        updateRoleById(this.editForm).then(res =>{
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
            this.getRoleList()
          }

        },error =>{
          console.log(error);
        })
      })
    },
    // 添加角色信息
    addRoleInfo(){
      this.$refs.addFormRef.validate(valid =>{
        if(!valid) return
        addRole(this.addForm).then(res =>{
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
            this.getRoleList()
          }
        },error =>{
          console.log(error);
        })
      })
    },
    //监听添加角色的关闭事件,重置验证效果
    addDialogClosed(){
      this.$refs.addFormRef.resetFields()
    },
    //监听修改角色对话框的关闭事件,重置验证效果
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
    },
    //删除角色信息
    async deleteRole(id){
      const confirmResult = await this.$confirm('此操作可能导致严重后果, 请在了解所有情况后点击确认?', '提示', {
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
      const res = await deleteRoleById(id)
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

      this.getRoleList()
    },
  }
}
</script>

<style scoped>


</style>
