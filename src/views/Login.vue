<template>
  <div>
    <el-form class="loginContainer" ref="form" :model="form" :rules="rules">
      <h1 class="loginTitle">系统登陆</h1>
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          auto-complete="false"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
          auto-complete="false"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="form.code"
          placeholder="点击图片更换验证码"
          style="width: 250px; margin-right: 10px"
        ></el-input>
        <img :src="captchaUrl" />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.checked" class="loginRemeberMe"
          >记住我</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="loginSubmit"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postRequest } from "../utils/api";
export default {
  name: "Login",
  data() {
    return {
      // captchaUrl:"/captcha?time"+new Date(),
      captchaUrl:
        "data:image/gif;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAA8AKADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtrW1ga1hZoIySikkoOeKsCztv+feL/vgU2z/484P+ua/yqyKiMY8q0IjGPKtCIWdr/wA+0P8A3wKeLK1/59of+/YqUU7IAyafLHsPlj2IhZWn/PrD/wB+xThY2n/PrB/37FZ2ueI9O8PWDXd7NgD7kacu59FFUvCvjSy8TiaNImtruE/PbyH5seo9f6V0RwVWVF11D3F1sK0L2OhFhZ/8+sH/AH7FOFhZ/wDPpB/37FTLzTxXPyx7D5Y9iEafZf8APpb/APfsf4U4adZf8+dv/wB+l/wqccVieJPFumeFrNZ752LOcRxIMs5/wrSlh5VZqnTjdvogaitWjXGnWP8Az52//fpf8KcNNsf+fK3/AO/S/wCFQaPqsGs6VbahbhhFcRh1DdR9a0RUypqLcZLVByx7FcaZYf8APlbf9+l/wp40yw/58bb/AL9L/hVgVE19axtIrTxK0f3wWA28Z59OKXIuwcsewg0vT/8Anxtv+/K/4U8aVp//AD4Wv/flf8K4pviz4fXxCmmozvbl/KN8P9UH9B6j36fhzXfRuHAIOQa3r4Krh+X2sOW+quhJQexANK07/nwtf+/K/wCFOGk6d/0D7X/vyv8AhVoU8Vz8sew+WPYqjSdN/wCgfaf9+V/wqtqel6fHpF66WNqrrA5VhCoIO08jitYVV1b/AJAt/wD9e8n/AKCaUox5XoKUY8r0OSs/+POD/rmv8qsiq9n/AMecH/XNf5VZFOPwocfhQ4Vn6u27T54t5QuhUMP4SR1rRAqjqVsZoGA9KtOzuijwSx1V9L8QPLrImuJbfIjDHdsbPUA/oas6h4h8vWrXX9Jfy5k+WVcY3f7w9xx+Vavi/R/KjmmaEM6qcNjkVwscPnR/us+YOGX1r77A4jCYxLGVfda9yS+zZrt0Tf4nLJSj7qPpXw1rSa5olrfKu0yoCy+h6EfnmtwV4L4c8car4ahtYrrTlOmJhGKqQ31BzjPfHevTtV8c2djolvqFlBNfm6IS2WFch3PRSe386+WxuVVqNa1NXjJvlaaa9G+9u5tGaa1Opnk2Rk14Z4w0e/vDe3uoXRubxZP9HVfurECeAOxIOfrXSL4u8VaPJ9r8SWcE2mzH5/sgBa1J6ZweR25J+vYyx6hpvitbp9NE7LAQDI8ZVWJ9DV0Y4vLn9Yo2cdPeWq32v0v1XVeQPlnow+EniNbnSf7IlcCe0J2g/wAUZOQfwJI/L1r1dGBFfOGqWV54X1ePW9LyhjfLrjgeuR/dP+fbrTdv4hePxT4c1GWz1ZECTWrvmOQj+Bh9O/Q4B4PNb47B0cRP65Sly06n/ks+sX2T6P8AQUZNLle6PYnbaua818ZeFbbXNYS/a4nhk8sRSrGcCRQcjPv2rHvNa8TeLITa6kBoOmxj/SXRvnmPoCTwv6fWk0p9W8PTwRWvma7oUzAKyndNB9MdR+nH8PfnoYephpc1KslU7J6W/wAXw38r/joNtS3WhH4l061HheXT4bWOGKJQYQq/dIOevXnuevJrZ+EnjWfUoW0S/Jae1jBilJyWQHGD7jIqXx3ppm0WRbfiQfMMd8dq4T4WSiLxbMWOJDEQB68jNduEUcRlNf2r5pRfMu6btr6PqTLSorH0khyKkFV7Rt0Sn2qyK+aNhwqrq3/IEv8A/r2k/wDQTVsVV1f/AJAl/wD9e0n/AKCamXwsmXws5Kz/AOPKD/rmv8qsiq9l/wAeUH/XNf5VZFEfhQR+FDhSlQwwaBTxVFHL+IdKW4gYhea8d1jRZdHuvttvGTErfvEHYf4V9DzQiVCCK5XVtBEpYqgIPUYrtwONlhal0rxekl0a7f5PoTKPMjx+61OfUNPa3srSQwkDzGYcfQVp/Dy9votSm08F/szqXZD0Vh3Fdi3hh2j2LGFUdABitHQvDhs7jfsAJ6nHWvQeb0lhamEp0UoS21bafd9/lYj2b5lJsu/2dMynI3KwwQRkEVp6Zpyw24gSFIox0RFCgfgK3IbZRGARVhIVXoK8O7tY1POvF1lbWFjNdXOFtwuHyMgg8Y/HOK8q0S7utDvzqEdvcDS5Ww+4c7M8E+4z1/xr6D13TY9QtWgliWSNuqsMg456Vx8vhyQOxKblbggjIIr0sFmEcNSnScOZT0d3pby8/PW3YiUOZ37HH3Sw+J9Z+zDVlmsEjEwt4chieh3HHrj357danh0nXNAmJ8Nzq0Ep+a2uDkI394E/5+vbsdC8KWljI5t7RIi/3iByf/re1dKPD68ECnLMnBqnR1ppfDJKz82l189/MOS+r3Oc0vRr9NDePUdRlv7uVzLI7fdUn+FPRR/kDpXG6lYr4V1FdWtNOe51GaTyrdcEoHIPOBySRnjv7V7Xa6asce0iqV3pAaZXCDKnIOOhrnpYyUKzqy1T3S0TXbTp5Dcbqxp6DdyXelW008DW8zxgvC3VGxyK1xWbp0DRRgGtMVyN3dyhwqrq/wDyBL//AK9pP/QTVsVV1f8A5Al//wBe0n/oJqJfCyZfCzkrL/jyt/8Armv8qsiuZi1q5iiSNUiIRQoyD2/GpP7fuv8AnnD/AN8n/Gso1o2RnGrGyOlFOFcz/wAJDd/884P++T/jS/8ACRXf/POD/vk/41Xtoj9tE6gCgxK/UVzH/CSXn/PKD/vk/wCNL/wkt5/zyg/75P8AjR7aIe2idMtsg/hFSJAinIArlv8AhJ73/nlb/wDfLf40v/CUXv8Azyt/++W/xo9tEPbROvUYp4rjv+Eqvv8Anlb/APfLf40v/CV33/PK2/75b/Gj20Q9tE7AxhuopptY2HKiuS/4S2//AOeNt/3y3+NL/wAJfqH/ADxtv++W/wDiqPbRD20TrorREOQoq0qCuI/4TDUP+eNr/wB8t/8AFUv/AAmWo/8APG1/75b/AOKo9tEPbRO5AFL5YPUVw3/CZ6j/AM8bX/vhv/iqX/hNdS/54Wn/AHw3/wAVR7aIe2id4qgVIK4D/hNtS/54Wn/fDf8AxVL/AMJxqf8AzwtP++G/+Ko9tEPbRPQRVXV/+QHqH/XtJ/6Ca4r/AITnU/8Anhaf98N/8VUdz4z1G6tZrd4bUJKjIxVWyARjj5qmVaNmKVWNmf/Z",
      form: {
        username: "hayes",
        password: "123456",
        checked: true,
      },
      rules: {
        username: [{ required: true, message: "无效", trigger: "blur" }],
        password: [{ required: true, message: "无效", trigger: "blur" }],
        code: [{ required: true, message: "无效", trigger: "blur" }],
      },
    };
  },
  methods: {
    loginSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;
        postRequest("/login", this.form).then((resp) => {
          if (resp) {
            this.$message.success(JSON.stringify(resp));
            this.$router.replace("/home");
          }
        });
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
.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>
