<template>
    <div class="earthquakemap">
        <van-nav-bar :fixed=true>
            <template #left>
               <img :src="src" style="width:25px" @click="changPath">
                <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" />
                <van-button round type="info" @click="onSearch" class="serach-click">搜索</van-button>

            </template>
            <template #right >
               <div class="inline-block position-relative" v-if="!isTourists">
                 <van-image  width="1.2rem" 
                 v-if="false"
                 @click="showNotis"
                height="1.2rem"
                src="appimgs/icon-info.png"  style=" margin-right: 5px;vertical-align: middle;"/>
                <div v-if="newMsg" class="van-info van-info--dot" style="top:3px;right:10px;"></div>
               </div>
                <router-link to='/collection' >
                 <van-image 
                    width="0.9rem"
                    height="0.9rem"
                    src="appimgs/earthquake/icon-collection.png"
                    style=" vertical-align: bottom;"
                    />
                    <div class="nav-collection" >灾情采集</div>
                </router-link>
            </template>
        </van-nav-bar>
        <keep-alive>
          <router-view ref="child"></router-view>
        </keep-alive>
    </div>
</template>

<script>
import dialogPanel from "@/_sys_components/dialog"
import { localStorageSetting } from "@/util/ds.common";
export default {
  components:{dialogPanel},
  beforeRouteEnter(to, from, next){
    next(vm=>{
      if( localStorageSetting("userid")){
        vm.thisPath='earthquakeMap',
        vm.src='appimgs/icon-list.png',
        vm.$router.push("/earthquakelist")
      }else {
        vm.$router.push("/login")
      }
      
    })
  },
  data(){
        return {
            value:'',
            thisPath:'earthquakeMap',
            src:'appimgs/icon-list.png',
            newMsg: false,
            isTourists:false,//不是游客
        }
  },
   beforeRouteEnter(to, from, next) {
    next(vm=>{
        vm.isTourists = localStorage.getItem("_tourists")=="true"?true:false;
    })
  },
    methods:{
      showNotis(){
         this.$notify({ background:"#1989fa", duration: 1000, type: 'warning', message: '暂无通知' });
      },
      changPath(){
        let that =  this;
            if(this.thisPath =='earthquakeMap'){
                this.$refs.child.showListPanel=true;
                // this.$router.push("/earthquakelist");
                this.thisPath = 'earthquakelist';
                this.src='appimgs/earthquake/icon-map-select.png';
                 
            }else{
               this.$refs.child.showListPanel=false;
                // this.$router.push("/earthquakeMap");
                 this.thisPath = 'earthquakeMap';
                  this.src='appimgs/icon-list.png';
                
                this.$nextTick(v=>{
                  that.$refs.child.map.updateSize();
                })
            }
           
        },
        onSearch(){
          if(this.value==""){
            this.$notify({ duration: 500, type: 'warning', message: '请输入关键字' });
            return;
          }
            let address = this.value!=''? {searchCity:this.value}:{}
            this.$refs.child.onSearch(address);
        }
    },
    
}

</script>
<style lang="scss" scoped>
 .earthquakemap{
         width: 100%;
         height: 100%;
    .nav-collection{
        color:#066BD3;
        line-height: 16px;
        font-size: 12px;;
    }
   
    .serach-click{
        width: 56px;
        right: 4px;
        height: 34px;
        white-space: nowrap;
    }
    ::v-deep .van-nav-bar__left{
      width: calc(100%  - 80px);
    }
    ::v-deep .van-search{
        width: calc(100% - 85px);
    }
     
    ::v-deep .van-nav-bar__left:active{
      opacity: 1;
    } 
    
    ::v-deep .van-nav-bar__right:active{
      opacity: 1;
    }
    
 }
</style>