<template>
    <div>
        <div>
            <van-nav-bar class="nav" title="个人信息" left-arrow  @click-left="onClickLeft">
            </van-nav-bar>
        </div>
        <div class="main">
            <table class="tableCode">
                <tr>
                    <td class="first">原密码：</td><td class="second">
                      <input type="password" class="rowCode" v-model="oldPassword"></td>
                </tr>
                <tr>
                    <td class="first">新密码：</td><td class="second">
                      <input type="password" class="rowCode" v-model="newPassword"></td>
                </tr>
                <tr>
                    <td class="first">确认密码：</td><td class="second">
                      <input type="password" class="rowCode" v-model="confirmPassword"></td>
                </tr>
            </table>
        </div>
        <div class="last">
            <van-button type="primary" class="keepButton" @click="save">保存</van-button>
        </div>
    </div>
</template>
<script>
import { pwdEncrypt } from "@/util/ds.common";
import {businessApi} from "@/api";
export default {
  props:["userid"],
  data(){
    return{
      oldPassword:"",
      newPassword:"",
      confirmPassword:""
    }
  },
  methods:{
    onClickLeft() {
        this.$router.go(-1);
    },
    save(){
      if(this.oldPassword.trim() == "") {
        this.$notify({ type: 'warning', message: "原密码不能为空"});
        return;
      }
      if(this.newPassword.trim() == "") {
        this.$notify({ type: 'warning', message: "请输入新密码"});
        return;
      }
      if(this.confirmPassword.trim() == "") {
        this.$notify({ type: 'warning', message: "请再次输入新密码"});
        return;
      }
      if(this.confirmPassword !== this.newPassword) {
        this.$notify({ type: 'warning', message: "两次新密码不一致"});
        return;
      }
      businessApi.changePwd({
        url: this.$api.editPassword,
        params:{
          id: this.userid,
          oldPassword:pwdEncrypt(this.oldPassword),
          newPassword: pwdEncrypt(this.newPassword)
        }
      }).then(data=>{
        if(data.code ==0){
          this.$notify({ type: 'success', message: "修改成功"});
          this.onClickLeft();
        }else {
           this.$notify({ type: 'warning', message: data.msg});
        }
      }).catch(res=>{
        this.$notify({ type: 'warning', message: "服务器故障，请稍后再试"});
      })

    }
  }
}
</script>
<style scoped>
    .main{
        margin-top: 10px;
    }
    .rowCode{
        width: 100%;
        height: 34px;
        border:1px solid #DCDCDC;
        border-radius: 4px;
        color: #666;
    }
    .tableCode{
        width: 96%;
        color: rgb(158, 158, 158);
        border-collapse:separate;
        border-spacing:0px 10px;
    }
    .first{
        width: 28%;
        text-align: right;
    }
    .second{
        width: 72%;
    }
    .keepButton{
        border-radius: 5px;
        background: #066BD4;
        border: none;
        width: 270px;
        height: 40px;
        
    }
    .last{
        width: 100%;
        text-align: center;
        margin: 20px auto;
    }
</style>