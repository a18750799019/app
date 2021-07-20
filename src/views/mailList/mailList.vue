<template>
<div class="mailContact">
   <van-nav-bar class="nav" title="通讯录" >
  </van-nav-bar>
  <div class="mailHead">
    <van-row type="flex" justify="center" style="text-align:center;line-height:48px;">
      <van-col span="6" style="height:35px;line-height:35px;">
        <div @click="clearSearch">查询条件:</div>
        <!-- <div v-if="!showResetBtn">查询条件:</div>
        <div @click="clearSearch" class="reset" v-if="showResetBtn">重置条件</div> -->
      </van-col>
      <van-col span="9" style="padding:0 3px;"> 
        <van-dropdown-menu  class="margin-bottom-15">
          <van-dropdown-item @change="toggleDefault('city')" v-model="city.value" :title="city.default" :options="city.list" />
        </van-dropdown-menu>
        <van-dropdown-menu>
          <van-dropdown-item @change="toggleDefault('dept')" v-model="dept.value" :title="dept.default" :options="dept.list" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="9" style="padding:0 3px;">
        <van-dropdown-menu  class="margin-bottom-15">
          <van-dropdown-item @change="toggleDefault('town')" v-model="town.value" :title="town.default" :options="town.list" />
        </van-dropdown-menu>
        <van-dropdown-menu>
          <van-dropdown-item @change="toggleDefault('jobs')" v-model="jobs.jobLabel"  :title="jobs.default" :options="jobs.list" />
        </van-dropdown-menu>
      </van-col>
    </van-row>

  </div>
  <div class="mailContent">
    <van-index-bar>
      <template v-for="(item,i) in  list">
        <van-index-anchor :index="item.type" />
        <van-cell value="">
          <template>
           <span class="customTitle">{{item.name}}</span>
            <div class="inline-block phoneNum">{{item.contact}}</div>
            <div class="inline-block searchphone" @click="seeContact(item)">查看</div>
            <a :href="`tel:${item.contact}`"><div class="inline-block callphone"><img src="appimgs/icon-phone.png" alt=""></div></a>
            <img @click="callMessage(item)" src="appimgs/icon-msg.png" class="callMsg" alt="">
          </template>
        </van-cell>
      </template>
    </van-index-bar>
  </div>
  <van-overlay :show="show" @click="show = false">
    <div class="wrapper" @click.stop>
      <div class="whead">
       <span>详情</span>
       <img @click="show=false" src="appimgs/icon-popiup-close.png" alt="">
      </div>
      <div class="wcontent">
        <table>
          <tr><td>姓名:</td><td>{{contactDetailItem.name}}</td></tr>
          <tr><td>性别:</td><td>{{contactDetailItem.sexLabel}}</td></tr>
          <tr><td>所属市:</td><td>{{contactDetailItem.cityLabel}}</td></tr>
          <tr><td>所属县:</td><td>{{contactDetailItem.townLabel}}</td></tr>
          <tr><td>部门:</td><td>{{deptLabel}}</td></tr>
          <tr><td>岗位:</td><td>{{contactDetailItem.jobLabel}}</td></tr>
          <tr><td>手机号:</td><td>{{contactDetailItem.contact}}</td></tr>
          <tr><td>邮箱:</td><td>{{contactDetailItem.email}}</td></tr>
          <tr>
            <td><a :href="`tel:${contactDetailItem.contact}`"><div class="inline-block callphone"><img src="appimgs/icon-phone.png" alt=""></div></a></td>
            <td><img @click="callMessage(contactDetailItem)" src="appimgs/icon-msg.png" class="callMsg" alt=""></td>
          </tr>
        </table>
      </div>
    </div>
  </van-overlay>
  <dialog-panel @close="closeDialog" ref="dialogList" :title="dialogTitle">
      <div style="height:60vh;position:relative">
        <div style="height:calc(100% - 80px);border:1px solid rgb(240, 240, 240);padding-top:3px;overflow-y:auto;margin: 0 10px 5px;border-radius: 5px;">
          <!-- 聊天内容 -->
          <template v-for="item in chatsList">
            <div v-if="item.receiveUserId ==sendMsgItem.id " style="text-align:right;margin:5px 7px;">
              <span style="display:inline-block;margin-right:5px;vertical-align: top;width: 170px;padding:4px;font-size: 13px;border-radius:5px;">{{item.msg}}</span>
              <span style="position: relative;top:2px;color:#057fd2;font-size: 13px;">我</span>
            </div>
            <div v-if=" sendMsgItem.id== item.sendUserId" style="margin:5px 7px;;width:97%">
              <span style="color:#057fd2;font-size: 13px;vertical-align: top;" v-if="sendMsgItem">{{sendMsgItem.name}}</span>
              <span style="margin-right:5px;vertical-align: top;width: 175px;padding:4px;font-size: 13px;border-radius:5px;">{{item.msg}}</span>
            </div>
          </template>
            
          <div v-for="item in sendSelfMsg">
            <div style="text-align:right;margin:5px 7px;">
              <span style="display:inline-block;margin-right:5px;vertical-align: top;width: 170px;padding:4px;font-size: 13px;border-radius:5px;">{{item}}</span>
              <span style="position: relative;top:2px;color:#057fd2;font-size: 13px;vertical-align: top;" >我</span>
            </div>
          </div>
          
        </div>
        <textarea v-model="sendValue" style="vertical-align: top;text-indent: 10px;border: 0.5px solid #f0f0f0;height: 65px;width: calc(100% - 55px);margin-left: 5px;resize: none;border-radius: 7px;"></textarea>
        <button @click="sendMsg" style="vertical-align: top;width: 35px;height: 65px;border-radius: 9px;border: none;background: #57bfff;margin-left: 2px;margin-top: 3px;color: #fff;">发送</button>
      </div>
    </dialog-panel>
</div>
</template>
<script>
import dialogPanel from "@/components/dialog";
import {businessApi} from "@/api";
import { localStorageSetting } from "@/util/ds.common";
require("@/util/pinyin_dict_firstletter.js")
require("@/util/pinyinUtil.js")
export default {
  components:{dialogPanel},
  data() {
    return {
      user:{},
      chatsList:[],
      dialogTitle:"",
      showResetBtn:false,
      list:[],
      sendSelfMsg:[],
      show:false,
      jobs:{
        list:this.$config.jobsType,
        jobLabel:"",
        default:"选择岗位"
      },
      city:{
        list:[],
        value:"",
        default:"选择地市"
      },
      town:{
        list:[{text:"选择县区",value:""}],
        value:"",
        default:"选择县区"
      },
      dept:{
         list:[],
          value:"",
          default:"选择部门"
      },
      contactDetailItem:{
        name:"-",
        sexLabel:"-",
        cityLabel:"-",
        townLabel:"-",
        jobLabel:"-",
        deptLabel:"-",
        contact:"-",
        email:"-"
      },
      deptLabel:"",
      sendMsgItem:null,
      sendValue:""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{
      // vm.jobs.default="选择岗位";
      // vm.city.default="选择地市";
      // vm.town.default="选择县区";
      // vm.dept.default="选择部门";
      // vm.getUserList();
        vm.user = localStorageSetting("userCount");
    })
  },
  mounted(){
    //绑定地市
    this.city.list = this.$areacode.province[0].city.filter(v=>{
          v.text = v.name;
          v.value = v.areacode;
          return v;
        })
    //绑定部门
    businessApi.getDeptList({
      url:this.$api.deptManage
    }).then(data=>{
      this.dept.list = data.rows.filter(_=>{
        if(_.name){
          _.text = _.name;
          _.value = _.id;
          return _;
        }
      })
    })
    this.getUserList();
  },
  methods:{
    closeDialog(){
      this.chatsList = [];
      this.sendSelfMsg = [];
    },
    callMessage(item){
      this.sendMsgItem = item;
      this.$refs.dialogList.show = true;
      this.dialogTitle = `${item.name}[${item.contact}]`;
      businessApi.getListCommon({
        url:this.$api.chatslist,
        params:{
          userIdA:this.user.id,
          userIdB: item.id
        }
      }).then(res=>{
        this.chatsList = res.rows;
      })
    },
    sendMsg(){
      businessApi.getListCommon({
        url:this.$api.chats,
        params:{
          msg:this.sendValue,
          sendUserId:this.user.id,
          receiveUserId: this.sendMsgItem.id
        }
      })
      this.sendSelfMsg.push(this.sendValue)
      this.sendValue = "";
    },
    clearSearch(){
      this.jobs.default="选择岗位";
      this.city.default="选择地市";
      this.town.default="选择县区";
      this.dept.default="选择部门";
      this.city.value=""
      this.town.value=""
      this.dept.value=""
      this.jobs.jobLabel=""
      this.showResetBtn=!this.showResetBtn;
      this.getUserList();
    },
    toggleDefault(type){
      this.showResetBtn=!this.showResetBtn;
      switch (type) {
        case 'jobs':
           this.jobs.default="";
          break;
        case "city":
          this.city.default="";
          this.changeProvind(this.city.value)
        break;
        case "town":
          this.town.default=""
        break;
        case "dept":
          this.dept.default=""
        break;
      }
      let cityCode = this.city.value!=''? {cityCode:this.city.value}:{}
      let CountyCode = this.town.value!=''? {CountyCode:this.town.value}:{}
      let deptCode = this.dept.value!=''? {deptCode:this.dept.value}:{}
      let job = this.jobs.jobLabel!=''? {job:this.jobs.jobLabel}:{}
      this.getUserList({
        ...cityCode,
        ...CountyCode,
        ...deptCode,
        ...job
      })
    },
    changeProvind(value){
          for(let i=0;i<this.city.list.length;i++){
            if(this.city.list[i].areacode==value){
                this.town.list= this.city.list[i].county.filter(v=>{
                  v.text = v.name;
                  v.value = v.areacode;
                  return v;
                });
                return;
            }
          }
      },
    seeContact(item){
      let _sexLabel = this.$config.sexType.find(v=>v.value==item.sex)
      item.sexLabel = _sexLabel?_sexLabel.text:item.sex;

      let _cityLabel = this.$areacode.province[0].city.find(v=>v.areacode==item.cityCode)
      item.cityLabel = _cityLabel?_cityLabel.name:item.cityCode

      let _townLabel = null;
      for (let i = 0; i < this.$areacode.province[0].city.length; i++) {
        for (let j = 0; j < this.$areacode.province[0].city[i].county.length; j++) {
          const element = this.$areacode.province[0].city[i].county[j];
          if(element.areacode == item.countyCode){
            _townLabel = element;
            break;
          }
        }
      }
      item.townLabel = _townLabel?_townLabel.name:item.countyCode

      let _jobLabel = this.$config.jobsType.find(v=>v.value==item.job)
      item.jobLabel = _jobLabel?_jobLabel.text:item.job

       businessApi.getListCommon({
        url:this.$api.allDeptList
      }).then(data=>{
        let _deptLabel = data.rows.find(v=>v.id == item.deptCode);
        this.deptLabel = item.deptLabel = _deptLabel?_deptLabel.name:  item.deptCode;
      })

      this.contactDetailItem = item;
      this.show = true;
    },
    getUserList(params){
       businessApi.getListCommon({
          url:this.$api.user,
          params
        }).then(data=>{
          this.list = data.rows.sort((a,b)=>{
            return a.name.localeCompare(b.name)
          }).filter((v,i)=>{
            if(!v.name || v.name==""){
              v.name = "-"
            }
            if(v.name !== "-"){
               let res = pinyinUtil.getFirstLetter(v.name[0]);
               if(i>0 && data.rows[i-1].typeBak !== res) {
                 v.type = res.toUpperCase();
                 v.typeBak = res.toUpperCase();
               }else if( i==0){
                  v.type = res.toUpperCase();
                 v.typeBak = res.toUpperCase();
               } else{
                 v.typeBak = data.rows[i-1].typeBak;
               }
            } else {
              v.type = "#"
              v.typeBak = "#";
            }
            
            return v;
           
          })
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.mailContact{
  .mailHead{
    height:90px;
    background:#DBE2F1;
    padding:10px;
  }
  .mailContent{
    height: calc(100vh - 207px);
    overflow-y: auto;
    .customTitle{
      width:70px;
      display: inline-block;
    }
    .phoneNum{
      width:98px;
    }
    .searchphone{
      background: #C5B9D1;
      border-radius: 50%;
      padding:8px;
      width:30px;
      height:30px;
      line-height: 30px;
      margin-right:5px;
      color: #fff;
    } 
    
  }
  .callphone,.callMsg{
      background: #6CB2DB;
      border-radius: 50%;
      padding:8px;
      width:30px;
      height:30px;
      text-align: center;
      line-height: 30px;
      img{
        width:25px;
        vertical-align: middle;
      }
    }
    .callMsg{
      background: #b5ceb7;
      margin-left: 5px;
      vertical-align:middle;
    }
  .wrapper{
    width: 230px;
    height: 320px;
    background: #fff;
    position: absolute;
    top:calc(50% - 160px);
    left: calc(50% - 115px);
    border-radius: 10px;
    .whead {
      height:40px;
      line-height: 40px;
      background: #066BD4;
      border-radius: 8px 8px 0 0;
      color: #fff;
      padding: 0 12px;
      img{
        width:15px;
        float: right;
        margin-top: 13px;
      }
    }
    .wcontent {
      overflow: hidden;
      table {
        font-size: 14px;
        margin-top: 10px;
        width: 100%;
        td:first-child{
          text-align: right;
          width:90px;
          line-height: 24px;
          min-width: 50px;
        }
        td:last-child{
          padding-left: 10px;
        }
      }
    }
  }
  .reset{
    background: #d0d4df;
    border-radius: 4px;
    position: relative;
    left: 6px;
    padding: 0px;
    margin: 0;
    color: #fff;
    font-size: 12px;
    width: 69px;
    height: 33px;
    line-height: 34px;
  }
}

::v-deep .van-dropdown-menu__bar{
  height:35px;
  border-radius: 5px;
  background: #ECF0F9;
  border: 0.4px solid #B5B5B5;
}
::v-deep .van-dropdown-menu__title{
    color: #666;
  }
</style>
