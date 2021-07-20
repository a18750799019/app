<template>
  <div class="contain">
    <div> 
      <!-- <van-nav-bar class="navbar" title="个人中心"/> -->
      <van-nav-bar class="nav" title="个人中心" >
      </van-nav-bar>
    </div>
    <div class="newsCard"  v-if="!isTourists">
      <img src="appimgs/icon-grzx.png" alt="">
      <table class="tableCard">
        <tr>
          <td class="first">姓名:</td><td class="second">{{contactDetailItem.name}}</td>
          <td class="third">性别:</td><td class="fourth">{{contactDetailItem.sexLabel}}</td>
        </tr>
        <tr>
          <td class="first">所属市:</td><td class="second">{{contactDetailItem.cityLabel}}</td>
          <td class="third">所属县:</td><td class="fourth">{{contactDetailItem.townLabel}}</td>
        </tr>
        <tr>
          <td class="first">部门:</td><td class="second">{{deptLabel}}</td>
          <td class="third">岗位:</td><td class="fourth">{{contactDetailItem.jobLabel}}</td>
        </tr>
        <tr>
          <td class="first" >手机:</td><td class="second" colspan="3"  >{{contactDetailItem.contact}}</td>
        </tr>
        <tr>
          <td class="first">邮箱:</td><td class="fourth"  colspan="3"  >{{contactDetailItem.email}}</td>
        </tr>
        <tr>
         <td colspan="4" class="final">
            <router-link to='/perNewsChange'>
              <van-button round type="info" class="editButton">修改个人信息</van-button>
            </router-link>
          </td>  
        </tr>
      </table> 
    </div>
    <div class="theLast">
      <van-cell-group class="last"  v-if="!isTourists">
        <router-link :to='`/codeChange/${userid}`' >
          <van-cell title="修改密码" icon="appimgs/修改密码.png" is-link class="detail">
          </van-cell>
        </router-link>
      </van-cell-group>
      <van-cell-group class="last">
        <van-cell @click="checkVersion" title="版本更新" icon="appimgs/版本更新.png" :value="`当前版本${version}`" class="detail">
          <van-icon slot="right-icon" name="replay" class="custom-icon"/>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="last">
        <van-button type="primary" @click="loginOut" style="border-radius:5px;background:#0070d3" block>退出</van-button>
      </van-cell-group>
    </div>  
    <van-loading class="laoding" v-if="showLoading" type="spinner" color="#1989fa">请稍等片刻</van-loading>
  </div>
</template>

<script>

import { localStorageSetting } from "@/util/ds.common";
import {businessApi} from "@/api";
export default {
  data(){
    return{
      deptLabel:"",
      userid:0,
      showLoading:false,
      contactDetailItem:{
        name:"-",
        sexLabel:"-",
        cityLabel:"-",
        townLabel:"-",
        jobLabel:"-",
        deptLabel:"-",
        contact:"-",
        email:"-",
      
      },
        isTourists:false,//不是游客,
        version:"1.0.0"
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{ 
      document.addEventListener('deviceready',function(){
        cordova.getAppVersion.getVersionNumber().then(function (version){
            //获取当前app的版本号；
            vm.version = version;
          });    
        },false);
       vm.isTourists = localStorage.getItem("_tourists")=="true"?true:false;
      let user = localStorageSetting("userCount");
      if(!user){
        return;
      }
      vm.userid = user.id;
      let _sexLabel = vm.$config.sexType.find(v=>v.value==user.sex)
      user.sexLabel = _sexLabel?_sexLabel.text:user.sex;

      let _cityLabel = vm.$areacode.province[0].city.find(v=>v.areacode==user.cityCode)
      user.cityLabel = _cityLabel?_cityLabel.name:user.cityCode

      let _townLabel = null;
      for (let i = 0; i < vm.$areacode.province[0].city.length; i++) {
        for (let j = 0; j < vm.$areacode.province[0].city[i].county.length; j++) {
          const element = vm.$areacode.province[0].city[i].county[j];
          if(element.areacode == user.countyCode){
            _townLabel = element;
            break;
          }
        }
      }
      user.townLabel = _townLabel?_townLabel.name:user.countyCode
      
      let _jobLabel = vm.$config.jobsType.find(v=>v.value==user.job)
      user.jobLabel = _jobLabel?_jobLabel.text:user.job

      vm.bindDept(data=>{
        let _deptLabel = data.rows.find(v=>v.id == user.deptCode);
        user.deptLabel = _deptLabel?_deptLabel.name:  user.deptCode;
        vm.contactDetailItem.deptLabel = vm.deptLabel = _deptLabel?_deptLabel.name:  user.deptCode;
      })

      vm.contactDetailItem = user;
    })
  },
  methods:{
    checkVersion(){
      let that = this;
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

      businessApi.getVersion({url:this.$api.version}).then(data=>{
        if(data.rows[0].version == this.version){
          this.$notify({type:"success",message:"已经是最新版本"})
        }else {
          if(isAndroid){
            this.$dialog.confirm({message:"检测到新版本，是否更新？"}).then(() => {
              that.showLoading=true;
              // fileTransfer.onprogress = function(e) {
              //   if (e.lengthComputable) {
              //     let progress = e.loaded / e.total;
              //     // 显示下载进度
              //     cosnole.log(progress)
              //     // _this.progress = (progress * 100).toFixed(2);
              //   }
              // };
              let baseUrl = this.$config.apkUrl;
              const target = cordova.file.externalDataDirectory + 'fjdz.apk';
              var fileURL = 'cdvfile://localhost/temporary/fjdz.apk'
              let fileTransfer = new FileTransfer();
              fileTransfer.download(
                baseUrl,
                fileURL,
                function(entity){
                   that.showLoading=false;
                  cordova.plugins.fileOpener2.open(
                    fileURL,
                    'application/vnd.android.package-archive'
                  )
                },
                function (error) {
                  alert('download error: ' + error.source + error.target + error.code)
                },
              )
            })
            .catch(() => {
              // on cancel
            });
          } else if (isiOS) {
            this.$dialog({message:"请前往应用商店下载最新版本"}).then(() => {
              // on confirm
            })
          }
         
        }
      })
    },
    loginOut(){
      localStorageSetting("userid", "remove");
      localStorageSetting("userCount", "remove");
      this.$router.push("/login")
    },
    bindDept(cb){
      businessApi.getListCommon({
        url:this.$api.allDeptList
      }).then(data=>{
        cb?cb(data):"";
      })
    },
    downloadFile(fileEntry) {
  // 初始化进度条并显示
  // 此处采用mint-ui的Progress组件
  // _this.progress = 0;
  // _this.showProgress = true;
  //实例化
  let fileTransfer = new FileTransfer();
  //监听下载进度
  fileTransfer.onprogress = function(e) {
    if (e.lengthComputable) {
      let progress = e.loaded / e.total;
      // 显示下载进度
      cosnole.log(progress)
      // _this.progress = (progress * 100).toFixed(2);
    }
  };
  // 使用fileTransfer.download开始下载
  fileTransfer.download(
    encodeURI(_this.savePath), //uri网络下载路径
    fileEntry.toURL(), //文件本地存储路
    function(error) {
      _this.toast('下载失败！');
    }
  );
}
  }
}


</script>
<style scoped  lang="scss">
.laoding{
  position: absolute;
  top:50%;
  left:calc(50% - 50px);
}
  .contain{
    background: #ECF0FB;
    height: 100%;
  }
  .newsCard{
    width: 98%;
    height: 240px;
    background-size:cover;
    margin: 5px auto;
    position: relative;
    border-radius:25px;
    img{
      width: 100%;
      z-index: 0;
      position: absolute;
      top:px;
      height: inherit;
    }
  }
  .newsCard .tableCard{
    font-size: 14px;
    color:#fff;
    width:92%;
    margin: 0px auto;
    border-collapse:separate;
    border-spacing:0px 12px;
    padding-top: 15px;
    padding-left: 10px;
    position: relative;
  }
  .first{
    text-align: right;
    width:18%;
  }
  .second{
    width:32%;

  }
  .third{
    text-align: right;
    width:18%;
  }
  .fourth{
    width:32%;
  }
  .final{
    text-align: center;
  }
  .editButton{
    width:150px;
    height:35px;
    background-color:rgba(0,0,0,0.2);
  }
  .custom-icon{
    margin-top: 5px;
    margin-left: 8px;
  }
  .last{
    width: 94%;
    margin-top: 10px;
    border-radius: 10px;
    border: none;
    margin-left: 12px;
  }
  .theLast{
    width: 100%;
    /* margin-left: 12px; */
    margin: 0 auto;
  }
  .detail{
    border-radius: 10px;
  }
  /* ::v-deep  .van-nav-bar__title{
    color: #fff;
    margin-bottom: -15px;
  } */
</style>