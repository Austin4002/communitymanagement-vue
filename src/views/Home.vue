<template>
    <el-container class="home_container">
      <el-header height="70px">
        <div class="title">
          <img src="" alt="">
          <span class="title_span">高校社团管理系统</span>
        </div>
        <div >
          <el-select class="selectRole" v-model="roleName" @change="switchRole($event)">
            <el-option
                v-for="item in roleList"
                :key="item.name"
                :label="item.description"
                :value="item.name">
            </el-option>
          </el-select>
          <el-button round size="medium" type="danger" @click="logout">退出</el-button>
        </div>

      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单-->
          <el-menu
              unique-opened
              background-color="#1c2b36"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse="isCollapse"
              :collapse-transition="false"
              :router="true"
              :default-active="activePath">
            <!-- 一级菜单 -->
            <el-submenu v-for="(item,i) in menuList" :index="item.path"  :key="i">
              <!-- 一级菜单的模版区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="item.icon"></i>
                <!-- 文本 -->
                <span>{{ item.name }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item v-for="(subItem,j) in item.child" :key="j" :index="subItem.path" @click="saveNavstate(subItem.path)">
                <template slot="title">
                  <!-- 图标 -->
                  <i :class="subItem.icon"></i>
                  <!-- 文本 -->
                  <span>{{ subItem.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>

          </el-menu>

        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

import {menuList} from "@/network/user";

export default {
  name: 'Home',

  data(){
    return {
      menuList:[],
      isCollapse:false,
      activePath:'',
      roleList:[],
      roleName:''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')

  },
  methods:{

    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    },
    getMenuList(){
      const roleString = window.sessionStorage.getItem('role')
      let role =JSON.parse(roleString);
      this.roleList = role
      // console.log(this.roleList);
      this.roleName = role[0].name
      menuList(role[0].name).then(res =>{
        this.menuList = res.data
        // console.log(this.menuList);
      },error =>{
        console.log(error);
      })

      // console.log(role[0]);
      // {id: "1", name: "admin", description: "管理员"}

    },
    saveNavstate(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    },
    switchRole(role){
      console.log(role);
      menuList(role).then(res =>{
        this.activePath = ''

        this.menuList = res.data
        this.$router.push({path:"/home"})
        // console.log(this.menuList);
      },error =>{
        console.log(error);
      })

    },
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },


  }
}
</script>

<style scoped>
.home_container {
  height: 100%;
}

.el-header {
  background-color: #438eb9;
  color: #000000;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  /*padding-left: 0;*/
  align-items: center;
  /*padding-top: 10px;*/
  /*background-image: url("../assets/bgi.jpg");*/
  /*background-size: 100%;*/
  background-position: 50% -85px;
  /*background-repeat: no-repeat no-repeat;*/
}

.title {
  /*display: flex;*/
  align-items: center;
  height: 40px;
  /*justify-content: space-between;*/
  width: 50%;
}

.title_span {
  margin-right: 20px;
}

.title img {
  width: 7%;
}

.el-aside {
  background-color: #1c2b36;
  color: #333;
}

.el-menu {
  border-right: none;
}

.el-main{
  background-color: #e5ebf5;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.selectRole {
  margin-right: 30px;
}

</style>
