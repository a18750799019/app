<template>
  <div class="earthquakemap">
    <ds-map
      v-show="!showListPanel"
      class="map"
      @init="initMap"
      :center="[119,26]" 
      projection ="EPSG:4326"
      :options="{ controls:{zoom: false},resolutions:0}"
      :zoom="6" 
      providers="Tianditu.Normal"
    ></ds-map>
    <!-- 查询条件 -->
    <div  class="sub-nav">
         <van-row>
          <van-col span="3" style="white-space: nowrap;text-align: right; line-height: 44px; color: hsla(0,0%,100%,.9);  font-weight: bold;font-size: 14px;" >震级：</van-col>
          <van-col span="9">
            <van-dropdown-menu>
              <van-dropdown-item v-model="value1" :options="option1" @change="onSearch"/>
            </van-dropdown-menu>
          </van-col>
          <van-col span="4" style="white-space: nowrap;text-align: right; line-height: 44px; color: hsla(0,0%,100%,.9);  font-weight: bold;font-size: 14px;">时段：</van-col>
          <van-col span="8">
            <van-dropdown-menu >
              <van-dropdown-item v-model="value2" :options="option2"  @change="onSearch"/>
            </van-dropdown-menu>
          </van-col>
        </van-row>
    </div>
    <div  v-if="!showListPanel" class="legend">
      <img
        style="width:40px; height:40px;"
        src="appimgs/icon-legend-collapse.png"
        @click="showLegendPanel=true"
        v-if="!showLegendPanel"
      >
      <img  style="width:100%; height:100%;" v-if="showLegendPanel" src="appimgs/icon-legend.png">
      <img
        style="width:10px; height:10px;"
        v-if="showLegendPanel"
        @click="showLegendPanel=false"
        class="legendclose"
        src="appimgs/icon-legend-close.png"
      >
    </div>
    <!-- 地图 生命线 灾损 图标 -->
    <div v-if="!showListPanel" class="ctr-map">
      <div >
        <van-image
          @click.stop="changMapShow"
          width="3rem"
          height="3rem"
          src="appimgs/earthquake/icon-map.png"
        />
      </div>
      <div v-if="!isTourists">
        <van-image
          @click="changlifelineShow"
          width="3rem"
          height="3rem"
          src="appimgs/earthquake/icon-dough-line.png"
        />
      </div>
      <!-- <div v-if="!isTourists">
        <van-image
          @click="changdamageShow"
          width="3rem"
          height="3rem"
          src="appimgs/earthquake/icon-disaster.png"
        />
      </div> -->
    </div>

    <popue-panel
      class="mapPup"
      ref="mapShow"
      :title="mapList.title"
      :position="mapList.position"
      :height="mapList.height"
      :width="mapList.width"
    >
      <div
        class="div-itme"
        v-for="item in $config.eyesList[0].children"
        @click="toggleMapBase(item.type)"
      >
        <van-image width="120px" :src="item.icon"/>
        <div>{{item.name}}</div>
      </div>
    </popue-panel>

    <popue-panel
      class="lifeline"
      ref="lifeline"
      :title="lifeline.title"
      :position="lifeline.position"
      :height="lifeline.height"
      :width="lifeline.width"
    >
      <van-checkbox
        class="item"
        v-for="(item,i) in lifeline.list"
        :key="i"
        v-model="item.select"
        checked-color="#009FE9"
        @change="loadLifeLine(item)"
        shape="square"
      >
        <van-image width="26px" :src="item.url"/>
        <span>{{item.name}}</span>
      </van-checkbox>
    </popue-panel>

    <popue-panel
      class="damage"
      ref="damage"
      :title="damage.title"
      :position="damage.position"
      :height="damage.height"
      :width="damage.width"
    >
      <van-checkbox
        class="item"
        v-for="(item,i) in damage.list"
        :key="i"
        v-model="item.checked"
        checked-color="#009FE9"
        shape="square"
      >
        <van-image width="26px" :src="item.url"/>
        <span>{{item.name}}</span>
      </van-checkbox>
    </popue-panel>
    <div class="cent" v-if="showListPanel">
      <van-list v-model="loading" :immediate-check="false" offset="10" :finished="finished" finished-text="没有更多了" @load="onload()">
        <van-row
          v-for="(item,index) in list"
          :key="index"
          gutter="10"
          class="list-row"
          @click="clickFunItem(item)"
        >
          <van-col span="6" :style="{background:item.baColor}" class="row-left">{{item.quakeLevel}}</van-col>
          <van-col span="18">
            <div>
              <span>地址： {{item.address}}</span>
            </div>
            <div>
              <span>发震时刻： {{item.seismicTime}}</span>
            </div>

            <van-row>
              <van-col span="15">
                <span>位置： {{item.lon}}°, {{item.lat}}°</span>
              </van-col>
              <van-col span="9">
                <span>深度： {{item.depth}}米</span>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-list>
    </div>

    <dialog-panel ref="dialogList" @close="close" :title="dialogTitle">
      <div class="dialog-c">
        <div class="map">
          <ds-map
            class="map position-relative"
            @init="initSubMap"
            :center="[119,26]" 
            :options="{ controls:{zoom: false}}"
            :zoom="6"
      providers="Tianditu.Normal"
          >
          <img width="70%" style="right:0;bottom:0" class="position-absolute" v-if="damage.selItem" :src="damage.selItem.url" alt="">
          </ds-map>
        </div>

        <div class="dialog-text">{{dialogCtext}}</div>
        <div>
          <van-checkbox
            @change="toggleState($event,item)"
           style="display:inline-flex"
            class="item margin-left-10"
            v-for="(item,i) in damage.list"
            :key="i"
            v-model="item.checked"
            checked-color="#009FE9"
            shape="square"
          > 
            <span class="font-size-13">{{item.name}}</span>
          </van-checkbox>
        </div>
      </div>
    </dialog-panel>
    <div class="popupContent" id="popupContent_ea" ref="popupContent_ea">
      <table>
        <caption>{{popupObj.address}}</caption>
        <tr>
          <td>发震时刻</td>
          <td>{{popupObj.seismicTime}}</td>
        </tr>
        <tr>
          <td>发震经纬度</td>
          <td>纬度:{{popupObj.lat}}°/ 经度:{{popupObj.lon}}°</td>
        </tr>
        <tr>
          <td>震源深度</td>
          <td>{{popupObj.depth?popupObj.depth+"Km":"-"}}</td>
        </tr>
        <tr>
          <td>震级</td>
          <td>{{popupObj.quakeLevel?popupObj.quakeLevel+"M":"-"}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import dsMap from "@3d-space/ds-map/dist/dsMap.umd";
import "@3d-space/ds-map/dist/dsMap.css";
import popuePanel from "@/components/popupnew";
import dialogPanel from "@/components/dialog";
import { businessApi } from "@/api";
import { setMapPointStyle, magnitudeStyle } from "@/util/ds.common.js";
export default {
  name: "",
  components: { dialogPanel ,dsMap, popuePanel },
  data() {
    return {
      showLegendPanel: true,
      showListPanel:false,
      pointLayer: [],
      popupObj: {
        seismicTime: "",
        lat: "",
        lon: "",
        depth: "",
        quakeLevel: ""
      },
      map: "",
      itemList: this.$config.eaTimeRange,
      mapList: {
        title: "地图",
        position: "right",
        height: "100%",
        width: "200px"
      },
      lifeline: {
        title: "生命线",
        position: "right",
        height: "100%",
        width: "222px",
        list: this.$config.lifeProjSubject
      },
      damage: {
        title: "灾损",
        position: "right",
        height: "100%",
        width: "222px",
        list: this.$config.mapCasualtyLossLayer,
        selItem:null,
      },
      mapPopup:null,
      value1: "",
      value2: 2,
      option1: this.$config.magnitude,
      option2: [
        {
          text: "全部",
          value: ""
        },
        {
          text: "最近24小时",
          value: 0
        },
        {
          text: "最近一周",
          value: 1
        },
        {
          text: "最近一个月",
          value: 2
        },
        {
          text: "一个月以上",
          value: 3
        }
      ], //时段
      isTourists:"",
      subMap: null,
      list: [],
      loading: false,
      finished: false,
      dialogShow: true,
      dialogItem:{},
      dialogTitle: "福建省莆田市秀屿区A街道",
      dialogCtext:"",
      pageSize:1
    };
  },
  mounted() {
  },
   beforeRouteEnter(to, from, next) {
    next(vm=>{
      vm.onSearch();
      vm.isTourists = localStorage.getItem("_tourists")=="true"?true:false;
    })
  },
  methods: {
    close(){
      this.damage.list.forEach(v=>{
          v.checked=false;
        });
        this.damage.selItem = null;
        this.subMap.removeLayers("zaisunlayer");
    },
    toggleState(value,item){ 
      if(value){ 
        this.damage.selItem = item;
        this.subMap.removeLayers("zaisunlayer");
        this.damage.list.forEach(v=>{
          if(v!=item){
            v.checked=false;
          }
        })
        this.subMap.addLayerWmsByImage("zaisunlayer",null,300,null,null,item.haNo+ this.dialogItem.obsTime,null,null,null,this.$config.geoServerUrl1)
      }

      let f = this.damage.list.some(v=>v.checked); 
      if(!f){
        this.damage.selItem = null;
        this.subMap.removeLayers("zaisunlayer");
      }
      
     

    },
    //初始化地图
    initMap: function(map) {
      this.map = map;
      // this.map.addLayerWmtsByXYZ("vec_w", this.$config.mapSource.vec_w, 0);
      this.map.addLayerWmts({
        layerName:"cva", 
        matrixSet:"w",
        url:this.$config.mapSource.cva_c,
        zIndex: 100
      }); 
this.map.addLayerWmsByImage("fujian",null,500,null,null,null,null,null,null,this.$config.geoFujianUrl)
      this.map.on("click", evt => {
        var feature = map.forEachFeatureAtPixel(evt.pixel, function(
          feature
        ) {
          return feature;
        });
        if (feature) {
          var data = feature.getProperties().data;
          let con = this.map._layerPopup.getElement().getElementsByClassName("ds-popup-content")
          if(con.length>0){
            this.popupObj = data;
            this.$nextTick(()=>{
              con[0].innerHTML = this.$refs.popupContent_ea.outerHTML;
              this.map._layerPopup.setPosition(evt.coordinate);
            })
          }
        }else {
          for (let i = 0,_layerName=Object.keys(this.map._layers); i < _layerName.length; i++) {
            if(!_layerName[i].includes("fjseismgis") || !this.map._layers[_layerName[i]]) continue;
            let source = this.map._layers[_layerName[i]].getSource();
            let viewResolution = this.map.getView().getResolution();
          let url=null;
          if(source.getFeatureInfoUrl){
            url = source.getFeatureInfoUrl(
              evt.coordinate, viewResolution, this.map.projection.getCode(), {'INFO_FORMAT': 'application/json'}
            );
            if (url) {
              businessApi.getCommon2GET({url:url}).then(xx=>{
                if(xx.features && xx.features.length>0){
                  let concc = this.map._layerPopup.getElement().getElementsByClassName("ds-popup-content")
                  if(concc && concc.length>0){
                    concc[0].innerHTML = `
                       <div class="popupContent">
                          <table>
                            <caption>&nbsp;</caption>
                            <tr><td>名称</td><td>${xx.features[0].properties.NAME}</td></tr>
                            <tr><td>地址</td><td>${xx.features[0].properties.ADDRESS}</td></tr>
                          </table>
                        </div>
                    `;
                    this.map._layerPopup.setPosition(evt.coordinate);
                  }
                }
              }).catch(e=>{
                console.log(e)
              })
            }
          }
          }
          //无弹窗时候
          this.map._layerPopup.setPosition(undefined);
        }
      });
    },
    //初始化列表弹窗地图
    //只做地图叠加和中心点打点
    initSubMap(map) {
      this.subMap = map;
      // this.subMap.addLayerWmtsByXYZ("vec_w",this.$config.mapSource.vec_w,0);
      // this.subMap.addLayerWmtsByXYZ("cva_c",this.$config.mapSource.cva_c,100);
        this.subMap.getView().setCenter(this.subMap.projFromLonLatTrans({center:this.itemLociton}));         
      this.subMap.addImagePoint({
        layerName: "point",
        center: this.itemLociton,
        imgUrl: "appimgs/location.png",
        zIndex: 101,
        text:{
          text:""
        }
      });
    },
    onload() {
      this.onSearch({},true);
    },
    // 单个列表点击函数
    clickFunItem: function(item) {
      this.$refs.dialogList.show = true;
      this.dialogTitle = item.address;
      this.dialogItem = item;
      this.dialogCtext = "据中国地震台网测定，北京时间"+this.$moment(item.seismicTime).format("YYYY年MM月DD日 hh时:mm分")+"在"+item.address+"（北纬"+
      item.lat+"度，东经"+item.lon+"度）发生"+item.quakeLevel+"级地震，震源深度"+item.depth+"米";
      this.itemLociton = [item.lon, item.lat];
      if (this.subMap) {
        this.subMap.removeLayers("point"); 
        this.subMap.removeLayers("zaisunlayer");
        this.subMap.addImagePoint({
          layerName: "point",
          center: this.itemLociton,
          imgUrl: "appimgs/location.png",
          zIndex: 101,
          text:{
            text:""
          }
        });
        this.subMap.getView().setCenter(this.subMap.projFromLonLatTrans({center:this.itemLociton}));
      }
    },
    //加载生命线图层
    loadLifeLine(item){
      if(item.select){
        this.map.addLayerWmsByImage(item.layer,null,101,null,null,null,null,null,null,this.$config.geoServerUrl)
      }else {
        this.map.removeLayers(item.layer)
      }
    },
    //切换底图
    toggleMapBase(type) {
      switch (type) {
        case "yx":
          this.map.toggleBuiltInBaseLayer("Tianditu.Satellite",true)
          this.map.addLayerWmts({
            layerName:"cva", 
            matrixSet:"w",
            url:this.$config.mapSource.cva_c,
            zIndex: 100
          });
          break;
        case "sl":
          this.map.toggleBuiltInBaseLayer("Tianditu.Normal",true)
          this.map.addLayerWmts({
            layerName:"cva", 
            matrixSet:"w",
            url:this.$config.mapSource.cva_c,
            zIndex: 100
          });
          break;
      }
    },
    // 三个地图切换
    changMapShow: function() {
      this.$refs.mapShow.ifShow();
    },
    changlifelineShow: function() {
      this.$refs.lifeline.ifShow();
    },
    changdamageShow: function() {
      this.$refs.damage.ifShow();
    },
    // 查询
    onSearch(searchCity, isOnload){
       var quakeLevel = (this.value1+'')!=''? {quakeLevelMin:this.value1.split("-")[0],quakeLevelMax:this.value1.split("-")[1]}:{};
       var searchTimeType = (this.value2+'')!=''? {searchTimeType:this.value2}:{};//时段
       
       if(!isOnload) {
         this.pageSize = 1;
       }
       var params = {
        ...searchCity,
        ...quakeLevel,
        ...searchTimeType,
        page:this.pageSize,
        rows:10
      }
      this.getEarthquakeData(params, isOnload);
    },
    //获取地震列表数据
    getEarthquakeData(params, isOnload) {
       while (this.pointLayer.length > 0) {
        this.map.removeLayers(this.pointLayer.shift());
      }
      businessApi.getListCommon({
        url:this.$api.ealist,
        params
      }).then(data => {
          this.loading = false;
          if(data.rows.length == 0){
            this.finished = true;
            if(!isOnload){
              this.list = []
            }
            return;
          }
          if(isOnload){
            let _newrow = data.rows.filter((v, i) => {
              let _res = setMapPointStyle(v.seismicTime, v.quakeLevel || 1);
              let _resColor = magnitudeStyle( v.quakeLevel || 1, this);
              v.baColor = _resColor.color;
              v.diameter =  _res.diameter;
              v.color = _resColor.color
              return v;
            });
            this.list.push(..._newrow)
          } else {
             this.list = data.rows.filter((v, i) => {
              let _res = setMapPointStyle(v.seismicTime, v.quakeLevel || 1);
              let _resColor = magnitudeStyle( v.quakeLevel || 1, this);
              v.baColor = _resColor.color;
              v.diameter =  _res.diameter;
              v.color = _resColor.color
              return v;
            });
          }
         if(data.rows.length<10){
           this.finished = true;
         }else{
           this.finished = false
           this.pageSize +=1
         }
          this.list.filter((v,i)=>{
            this.pointLayer.push("point" + i);
            this.map.addPoint({
              property: v,
              layerName: "point" + i,
              center: [v.lon, v.lat],
              zIndex: 101,
              style: {
                point: {
                  radius: v.diameter,
                  strokeColor: "#fff",
                  fillColor: v.color
                }
              }
            });
          })
        });
    },
  }
};
</script>
<style lang="scss" scoped>
.earthquakemap {
  position: relative;
  height: calc(100% - 100px);
  margin-top: 50px;

  .sub-nav {
    position: absolute;
    width: calc(100% - 10px);
    padding: 0 5px;
    top: 0px;
    height: 44px;
    left: 0px;
    background: rgba(130, 134, 146, 0.8);
    ::v-deep .van-cell {
      padding: 5px 10px;
      margin-top: 5px;
      border-radius: 2px;
    }
    ::v-deep .van-cell:after {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 10px solid rgba(50, 55, 74, 0.5);
      right: 3px;
      left: auto;
      top: calc(50% - 3px);
    }
    ::v-deep .van-dropdown-menu__bar {
      height: 34px;
      margin-top: 5px;
      border-radius: 2px;
      background-color: #ffffff82;
    }
    ::v-deep .van-dropdown-menu__title {
      width: calc(100% - 20px);
    }
  }
  .legend {
    position: absolute;
    bottom: 0;
    height: 66px;
    width: 150px;
    z-index: 999;
    padding: 10px;
    .legendclose {
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
  .ctr-map {
    top: 54px;
    position: absolute;
    right: 10px;
  }
  .item-list {
    margin-top: 7px;
    display: inline-block;
    padding: 0 7px;
    height: 30px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(5, 107, 211, 1);
    border-radius: 15px;
    font-size: 12px;
    color: rgba(6, 107, 211, 1);
    line-height: 30px;
  }
  .active {
    background: rgba(15, 171, 249, 1);
    border: 1px solid rgba(15, 171, 249, 1);
    color: #fff;
  }
  .mapPup {
    .div-itme {
      text-align: center;
      margin-top: 20px;
      font-size: 13px;
      line-height: 26px;
    }
  }
  .lifeline {
    .item {
      margin-top: 10px;
      line-height: 52px;
      padding-left: 10px;
      color: #333;
      font-size: 13px;
      font-weight: 400;
    }
    ::v-deep .van-image {
      vertical-align: middle;
      margin-right: 4px;
    }
    ::v-deep .van-checkbox__icon {
      font-size: 15px;
    }
  }
  .cent {
    padding: 0 8px;
    height: calc(100% - 44px);
    position: relative;
    background: #fff;
    top: 44px;
    overflow-y: auto;
    .list-row {
      background: #fff;
      border-radius: 4px;
      padding: 5px;
      font-size: 13px;
      margin-top: 5px;
      line-height: 1.5rem;
      color: #636363;
    }
    .list-row .row-left {
      border-radius: 4px;
      height: 100%;
      text-align: center;
      color: #fff;
      font-size: 25px;
      line-height: 4.5rem;
    }
  }
  .dialog-c {
    padding: 10px;
    padding-top: 0px;
    .dialog-img {
      border-radius: 5px;
      overflow: hidden;
    }
    .dialog-text {
      font-size: 13px;
      line-height: 1.5rem;
      font-weight: 400;
      color: #333;
      text-indent: 2em;
    }
    .map {
      height: 240px;
    }
  }
  .damage {
    .item {
      margin-top: 10px;
      line-height: 52px;
      padding-left: 10px;
      color: #333;
      font-size: 13px;
      font-weight: 400;
    }
    ::v-deep .van-image {
      vertical-align: middle;
      margin-right: 4px;
    }
    ::v-deep .van-checkbox__icon {
      font-size: 15px;
    }
  }
}
 ::v-deep  .ds-popup-closer{
  top:6px;
}

</style>

<style lang="scss">

.popupContent {
  padding: 3px;
  font-size: 13px;
  min-width: 190px;
  table {
    caption{
      color: #057FD2;
      font-weight: bold;
      text-align: left;
      padding: 0px 0 6px;
    }
    border-collapse: collapse;
    td {
      height: 32px;
      line-height: 20px;
      border: 1px solid #c9c9c9;
    }
    td:first-child {
      background: rgba(201, 201, 201, 0.5);
      min-width: 70px;
      color: #666666;
      text-align: right;
      padding: 0 5px;
    }
    td:last-child {
      padding: 0 5px;
      color: #323333;
      min-width: 100px;
      max-width: 150px;
    }
  }
}
</style>