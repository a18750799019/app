<template>
    <div>
        <div>
            <van-nav-bar class="nav" title="个人信息" left-arrow  @click-left="onClickLeft">
            </van-nav-bar>
        </div>
        <div class="main">
            <van-row  justify="space-between">
                <van-col span="6" class="text">姓名：</van-col>
                <van-col span="18">
                    <van-field v-model="name"/>
                </van-col>
            </van-row>
             <van-row  justify="space-between">
                <van-col span="6" class="text">性别：</van-col>
                <van-col span="18">
                    <van-radio-group v-model="sexLabel" direction="horizontal" style="padding-top:14px;padding-left:20px">
                        <van-radio :key="i" v-for="(item,i) in sexType" :name="item.value" checked-color="#9DA4B4">{{item.text}}</van-radio>
                    </van-radio-group>
                </van-col>
            </van-row>
            <van-row  justify="space-between" >
                <van-col span="6" class="text">所属市：</van-col>
                <van-col span="18">
                     <van-dropdown-menu >
                        <van-dropdown-item @change="changeProvind" v-model="cityLabel" :options="city" />
                    </van-dropdown-menu>
                </van-col>
            </van-row>
            <van-row  justify="space-between" style="padding-top:8px;">
                <van-col span="6" class="text">所属县：</van-col>
                <van-col span="18">
                     <van-dropdown-menu>
                        <van-dropdown-item v-model="townLabel" :options="town" />
                    </van-dropdown-menu>
                </van-col>
            </van-row>
            <van-row  justify="space-between" style="padding-top:8px;">
                <van-col span="6" class="text">部门：</van-col>
                <van-col span="18">
                     <van-dropdown-menu>
                        <van-dropdown-item v-model="deptLabel" :options="dept" />
                    </van-dropdown-menu>
                </van-col>
            </van-row>
            <van-row  justify="space-between" style="padding-top:8px;">
                <van-col span="6" class="text">岗位：</van-col>
                <van-col span="18">
                     <van-dropdown-menu>
                        <van-dropdown-item v-model="jobLabel" :options="job" />
                    </van-dropdown-menu>
                </van-col>
            </van-row>
            <van-row  justify="space-between" style="padding-top:8px;">
                <van-col span="6" class="text">手机号：</van-col>
                <van-col span="18">
                    <van-field v-model="phone"/>
                </van-col>
            </van-row>
            <van-row  justify="space-between">
                <van-col span="6" class="text">邮箱：</van-col>
                <van-col span="18">
                    <van-field v-model="email"/>
                </van-col>
            </van-row>
        </div>
        <div class="last">
            <van-button type="primary" class="keepButton" @click="save">保存</van-button>
        </div>
    </div>
</template>
<script>

import {userApi, businessApi } from "@/api";
import { localStorageSetting } from "@/util/ds.common";
export default {
    data(){
        return{
          editId:"",
          sexType: this.$config.sexType,
            name:'',
            sexLabel: '1',
            cityLabel: 0,
            townLabel: 0,
            deptLabel: 0,
            jobLabel: 0,
            phone:'',
            email:'',
            city: [],
            town: [],
            dept: [],
            job: this.$config.jobsType
        };
    },
    beforeRouteEnter(to, from, next) {
      next(vm=>{
        let user = localStorageSetting("userCount");
        vm.changeProvind(user.cityCode);
        vm.name = user.name;
        vm.sexLabel = user.sex +"";
        vm.cityLabel = user.cityCode;
        vm.townLabel = user.countyCode;
        vm.deptLabel = user.deptCode;
        vm.jobLabel = user.job;
        vm.phone = user.contact
        vm.email = user.email
        vm.editId = user.id;
        vm.city = vm.$areacode.province[0].city.filter(v=>{
          v.text = v.name;
          v.value = v.areacode;
          return v;
        })

        vm.bindDept(data=>{
          vm.dept =  data.rows.filter(v=>{
            v.value = v.id+"";
            v.text = v.name;
            return v;
          })
        })

        vm.changeProvind(vm.cityLabel)

        
      })
    },
    methods:{
      onClickLeft() {
          this.$router.go(-1);
      },
      changeProvind(value){
          for(let i=0;i<this.city.length;i++){
            if(this.city[i].areacode==this.cityLabel){
                this.town= this.city[i].county.filter(v=>{
                  v.text = v.name;
                  v.value = v.areacode;
                  return v;
                });
                return;
            }
          }
      },
    bindDept(cb){
      businessApi.getListCommon({
        url:this.$api.allDeptList
      }).then(data=>{
        cb?cb(data):"";
      })
    },
      save(){
        userApi.updateUser({
          url:this.$api.editUser,
          params:{
            id: this.editId,
            name: this.name,
            sex: this.sexLabel,
            cityCode: this.cityLabel,
            countyCode: this.townLabel,
            deptCode: this.deptLabel+"",
            job: this.jobsLabel,
            contact:this.phone,
            email:this.email
          }
        }).then(res=>{
          if(res.code==0){
            this.$notify({ type: 'success', message: "修改成功"});
            let user = localStorageSetting("userCount");
            user.name = this.name;
            user.sex = this.sex;
            user.cityCode = this.cityLabel;
            user.countyCode = this.townLabel;
            user.deptCode = this.deptLabel;
            user.job = this.jobLabel;
            user.contact = this.phone;
            user.email = this.email;

            localStorageSetting("userCount",user);
            this.onClickLeft();
          }
        })
      }
    }
}
</script>
<style scoped>
    .main{     
        margin-top: 10px; 
    }
    .text{
        text-align: right;
        line-height:40px;
        margin-top:8px;
        color: rgb(158, 158, 158);
    }
    ::v-deep .van-field__control{
        padding-left: 15px;
        border-radius: 4px;
        height: 34px;
        border:1px solid #DCDCDC;
        color: #666666;
    }
    ::v-deep .van-dropdown-menu{
        margin-top: 10px;
        margin-left: 15px;
        width: calc(100% - 35px);
        height: 34px;
        color: #666666;
    }
    ::v-deep .van-dropdown-menu__bar{
        height: 34px;
        border:1px solid #DCDCDC;
        border-radius: 4px;
    }
    ::v-deep .van-dropdown-menu__title{
        width: 90%;
        color: #666666;
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