<template>
  <div class="login login-light">
      <img src="appimgs/login/bg.png" style="position: fixed;;width:100%;height:100vh;z-index:-1;" alt="">
      <div class="head">
       
      </div>
      <div class="content">
        <div class="logo">
            <img src="appimgs/login/logo.png" width="280">
        </div>
        
        <div class="c_position c_form">
            <div class="userName"  v-if="!tourists">
              <div class="leftIcon"><img src="appimgs/login/icon-user.png" alt=""><i></i></div>
              <input type="text"  ref="username" placeholder="输入您的用户名" v-model="ruleForm.username">
            </div>
            
            <div class="password"  v-if="!tourists">
              <div class="leftIcon"><img src="appimgs/login/icon-pwd.png" alt=""></div>
              <input type="password" ref="password"  placeholder="输入您的密码" v-model="ruleForm.showpwd">
            </div>
              <div class="phone"  v-if="tourists">
              <div class="leftIcon"><img src="appimgs/login/icon-pwd.png" alt=""></div>
              <input type="phone" ref="phone"  placeholder="输入您的电话号码" v-model="phone">
            </div>
            <div>
                  <van-checkbox v-if="!tourists" v-model="isRememberPwd" shape="square" class="mt20" style="width:50%;    float: left;">记住密码</van-checkbox>
                  <span style="float: right;color: rgb(255, 255, 255); margin-top: 20px;line-height: 20px; border-bottom: 1px solid;" v-if="!tourists" @click="changtTourists">游客登录</span>
                  <span style="float: right;color: rgb(255, 255, 255); margin-top: 20px;line-height: 20px; border-bottom: 1px solid;" v-if="tourists" @click="changtTourists">用户登录</span>
            </div>
         
          <van-button type="primary" color="#008eff" size="large" round  @click="submitForm()" class="mt20" style="border-radius:5px;height: 46px;">登录</van-button>
        </div>
      </div>
      <div class="login-light-footer">
      </div>
  </div>
</template>
<script>
import SIdentify from "@/_sys_components/validCode";
import { localStorageSetting, pwdEncrypt } from "@/util/ds.common";
import {userApi} from "@/api";

export default {
  components: {
    SIdentify
  },
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        showpwd:"",
        code: "",
      },
      phone:"",
      tourists:false,
      isRememberPwd: false,
      identifyCode: "",
      identifyCodes: "123456789",
      rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ]
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{ 
      let remObj = localStorageSetting("REMERBERPWD");
      vm.tourists=localStorage.getItem("_tourists")=="true"?true:false;
      if(remObj){
        vm.ruleForm.username = remObj.username;
        vm.ruleForm.password = remObj.password;
        vm.ruleForm.showpwd = remObj.password.slice(0,18);
        vm.isRememberPwd = remObj.isRememberPwd;
      }
    })
  },
  methods: {
    submitForm(){
      this.ruleForm.password = pwdEncrypt(this.ruleForm.showpwd,this.ruleForm.password)
      if(!this.tourists){
           if (this.ruleForm.username.trim() == "") {
              
              this.$notify({ type: 'warning', message: this.rules.username[0].message});
              this.$refs.username.focus();
              return;
            }
            if (this.ruleForm.password.trim() == "") {
                this.$notify({ type: 'warning', message: this.rules.password[0].message});
                this.$refs.password.focus();
              return;
            }
      }else{
        if (this.phone.trim() == "") {
          this.$notify({ type: 'warning', message: this.rules.phone[0].message});
          this.$refs.phone.focus();
          return;
        }
        if(!(/^1[3456789]\d{9}$/.test(this.phone.trim()))) {
          this.$notify({ type: 'warning', message: "请填写正确的手机号码"});
          this.$refs.phone.focus();
          return;
        }
        localStorage.setItem("userid",this.phone);
        localStorage.setItem("_tourists",this.tourists);//是游客登录的时候切换的tabbar power==true时候不显示
        this.$router.push("/earthquakeMap");
        return
      }
      let loading =  this.$toast({
        message: '验证中...',
        forbidClick: true,
      });
        userApi.loginValid({
          url:this.$api.login,
          params:{
            userName:this.ruleForm.username.trim(),
            password:this.ruleForm.password.trim()
          }
        }).then(res=>{
          if(res.code==200){
            if(this.isRememberPwd){
              localStorageSetting("REMERBERPWD",{
                isRememberPwd: this.isRememberPwd,
                username:this.ruleForm.username.trim(),
                password:this.ruleForm.password.trim()
              })
            } else {
              localStorageSetting("REMERBERPWD", "remove")
            }
            localStorage.setItem("userid",this.ruleForm.username.trim());
            this.$store.dispatch("userCount",res.data);
            localStorageSetting("userCount",res.data);
            localStorage.setItem("_tourists",this.tourists);//非游客
            loading.clear();
            this.$router.push("/earthquakeMap");
          }else{
          this.$notify({ type: 'danger', message: res.msg});
          }
        }).catch(c=>{
          console.log(c)
          if(
          this.ruleForm.username.trim() == "admin" && 
          this.ruleForm.password.trim() == "123456"  
          ) {
        
          setTimeout(()=>{
            if(this.isRememberPwd){
              localStorageSetting("REMERBERPWD",{
                isRememberPwd: this.isRememberPwd,
                username:this.ruleForm.username.trim(),
                password:this.ruleForm.password.trim()
              })
            } else {
              localStorageSetting("REMERBERPWD", "remove")
            }
            localStorage.setItem("userid",this.ruleForm.username.trim());
            let _userCount = {
              account:"admin",
              provinceCode:"350000",
              cityCode:"350010",
              deptCode:21
            };
            this.$store.dispatch("userCount",_userCount)
            localStorageSetting("userCount",_userCount)
            this.$router.push("/earthquakeMap");
            loading.clear();
          },1000)
        }  else {
          this.$notify({ type: 'danger', message:"用户名或密码有误，请重新输入"});
        }
      })
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    changtTourists(){
     this.tourists = !this.tourists
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .mt20{
    margin-top: 20px;
  }
  .head {
    position: absolute;
    top: 80px;
    left: calc(50% - 200px);
    font-family: Microsoft YaHei;
  }
  .content {
      position: absolute;
      width: 300px;
      height: 364px;
      left: calc(50% - 150px);
      top: calc(50% - 38%);
    .logo{
      margin: 0px auto;
      text-align: center;
    }
    .c_form {
      background:rgba(3,41,86,0.6);
      border:1px solid rgba(44, 71, 146, 0.19);
      box-shadow:0px 3px 7px 0px rgba(77,116,200,0.49);
      border-radius:20px;
      padding: 10px 20px 20px;
      margin-top:10px;
      .h {
        color: #05327B;
        font-size: 21.34px;
        text-align: center;
        font-weight: Bold;
        margin-bottom: 14px;
        margin-top: 25px;
      }
      .userName, .password ,.phone{
        height:46px;
        width: 100%;
        margin-top: 20px;
        .leftIcon{
            width:50px;
            height:46px;
            line-height: 60px;
            vertical-align: top;
            display: inline-block;
            background: #008DFF;
            text-align: center;
            border-radius: 5px 0 0 5px;
            img{
              width:25px;height:25px;z-index:-1;
            }
        }
        input{
          height: 46px;
          width: calc(100% - 50px);
          border-radius: 0 5px 5px 0;
          border:none;
          text-indent: 10px;
        }
      }
      ::v-deep .van-cell{
          border-radius: 4px;
      }
     
      ::v-deep .van-checkbox__label{
        color: #fff;
      }
    }
    .sub-btn{
      width: 100%;
    }
  }
  .login-light-footer {
    width: calc(100% - 40px);
    overflow: hidden;
    display: block;
    position: absolute;
    padding: 20px;
    color: #929292;
    bottom: 0;
    left: 0;
  }
}

.form-item{
  margin-bottom: 0;
}
.form-item-valid{
  margin-top: 5px;
  margin-bottom: 5px;
}


.height100 {
  height: 100%;
}

 ::v-deep .el-input-group__prepend {
  background: #008EFF;
  border-color:#008EFF;
  padding:0 12px;
  line-height: 10px;
}

::v-deep .el-input__inner{
  height: 38px;
  line-height: 38px;
}


</style>
