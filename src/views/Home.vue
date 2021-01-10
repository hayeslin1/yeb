<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu @select="menuClient">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>导航一
              </template>
              <el-menu-item-group>
                <el-menu-item index="/test1">选项1</el-menu-item>
                <el-menu-item index="/test2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
            <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
export default {
  name: "Home",
  data(){
      return{

      }
  },
  methods:{
      menuClient(index){
        this.$router.push(index)
      }
  }
};
</script>
