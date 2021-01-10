<template>
    <div>
        <el-form class="loginContainer" ref="form" :model="form" :rules="rules">
            <h3 class="loginTitle">系统登陆</h3>
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" auto-complete="false"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" type="password" auto-complete="false"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="form.code" placeholder="点击图片更换验证码" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="form.checked" class="loginRemeberMe">记住我</el-checkbox>
                <el-button type="primary" style="width: 100%;" @click="loginSubmit">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {

                form: {
                    username: "hayes",
                    password: "123456",
                    checked:true,

                },
                rules: {
                    username: [{required: true, message: "无效", trigger: 'blur'}],
                    password: [{required: true, message: "无效", trigger: 'blur'}],
                    code: [{required: true, message: "无效", trigger: 'blur'}],
                }
            }
        },
        methods:{
            loginSubmit(){
                this.$refs.form.validate((valid) => {
                    if (!valid) return false
                    alert(JSON.stringify(this.form))
                });
            }
        }
    }
</script>

<style>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #ffffff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 0 auto 40px auto;
        text-align: center;
    }

    .loginRemeberMe {
        text-align: left;
        margin: 0 0 15px 0;
    }
</style>