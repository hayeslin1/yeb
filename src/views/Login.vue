<template>
  <el-form
    ref="loginForm"
    :rules="rules"
    :model="loginForm"
    class="loginContainer"
  >
    <h3 class="loginTitle">系统登陆</h3>
    <el-form-item prop="username">
      <el-input
        type="text"
        aria-autocomplete="false"
        :model="loginForm.username"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        aria-autocomplete="false"
        :model="loginForm.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        type="text"
        :model="loginForm.code"
        placeholder="点击图片更换验证码"
        class="loginCode"
      ></el-input>
      <img :src="captchaUrl" />
    </el-form-item>
    <el-checkbox :model="checked" class="loginRemeberMe">记住我</el-checkbox>
    <el-button type="primary" style="width: 100%" @click="submit"
      >登陆</el-button
    >
  </el-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      captchaUrl: "",
      checked: true,
      loginForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$message.success(this.loginForm);
        } else {
          this.$message.error("false");
        }
      });
    },
  },
};
</script>


<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #ffffff;
  padding: 1px solid #eeaaee;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  margin: 0 auto 40 auto;
  text-align: center;
}
.loginCode {
  width: 250px;
  margin-right: 10px;
}
.loginRemeberMe {
  text-align: left;
  margin: 0 0 15px 0;
}
</style>