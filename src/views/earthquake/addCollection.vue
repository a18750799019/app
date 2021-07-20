<template>
  <div class="addCollection">
    <div id="container"
         class="width-100 height-100 mapS"
         v-if="isShowMap"></div>
    <button class="ok"
            @click="ok(true)"
            v-if="isShowMap">确定</button>
    <button class="cancel"
            @click="ok()"
            v-if="isShowMap">取消</button>
    <img src="appimgs/marker-icon.png"
         v-if="isShowMap"
         class="center"
         alt="">
    <van-nav-bar class="nav"
                 :title="isDraft=='已上报'?'采集详情':title"
                 left-text="返回"
                 left-arrow
                 @click-left="goBackandClear"></van-nav-bar>
    <van-form style="height: calc(100% - 160px);">
      <div class="sub-nav">
        <div>
          <van-cell-group :style="`${isDraft=='已上报'?'':'padding-right:5rem'}`"
                          class="dz-van-cell">
            <van-field v-model="reportAddress"
                       :disabled="isDraft=='已上报'"
                       label="上报地点:"
                       placeholder="请重新定位" />
            <span @click="getCenters()"
                  v-if="isDraft != '已上报'"
                  class="btn-right">
              <van-image src="appimgs/icon-addr.png"
                         width="0.8rem"
                         style=" vertical-align: middle;"></van-image>重新定位
            </span>
          </van-cell-group>
        </div>
        <div>
          <van-cell-group class="dz-van-cell">
            <van-field v-if="isDraft != '已上报'"
                       v-model="reportTime"
                       label="采集时间:"
                       placeholder="请选择时间"
                       @click="showTime = true"
                       class="border" />
            <van-field v-if="isDraft == '已上报'"
                       v-model="reportTime"
                       label="采集时间:"
                       placeholder="请选择时间"
                       class="border"
                       :disabled="isAble" />
            <van-image src="appimgs/icon-time.png"
                       width="0.8rem"
                       class="time"></van-image>
          </van-cell-group>
        </div>
        <div>
          <div class="list">
            <span class="list-left"
                  style=" text-align: left;">地震标识：</span>
            <span class="list-cent">
              <van-dropdown-menu class="list-dropdown"
                                 :disabled="isAble">
                <van-dropdown-item v-model="quakeid"
                                   :options="equiListOption"
                                   :disabled="isAble"></van-dropdown-item>
              </van-dropdown-menu>
            </span>
          </div>
        </div>
        <div>
          <div class="list">
            <span class="list-left"
                  style=" text-align: left;">发震时刻：</span>
            <span class="list-cent">
              <van-dropdown-menu class="list-dropdown"
                                 :disabled="isAble">
                <van-dropdown-item v-model="quakeid"
                                   :options="equiListTime"
                                   :disabled="isAble"></van-dropdown-item>
              </van-dropdown-menu>
            </span>
          </div>
        </div>
      </div>
      <div class="cent"
           :style="{height:isDraft == '已上报'?'calc(100% - 44px)':'calc(100% - 160px)',background:isDraft == '已上报'?'#fff':''}">
        <div style="    background: #fff;padding: 0 8px;">
          <div class="list"
               v-if="!isTourists">
            <span class="list-left">烈度：</span>
            <span class="list-cent">
              <van-dropdown-menu class="list-dropdown"
                                 :disabled="isAble">
                <van-dropdown-item v-model="intensity"
                                   :options="option1"
                                   :disabled="isAble"></van-dropdown-item>
              </van-dropdown-menu>
            </span>
          </div>
          <div class="list">
            <span class="list-left">简要描述：</span>
            <span class="list-cent">
              <van-dropdown-menu class="list-dropdown"
                                 style="width:calc(50% - 2px);display: inline-block;">
                <van-dropdown-item v-model="casualties"
                                   :options="option2"
                                   :disabled="isAble" />
              </van-dropdown-menu>
              <van-dropdown-menu class="list-dropdown"
                                 style="width:calc(50% - 2px);display: inline-block;">
                <van-dropdown-item v-model="damage"
                                   :options="option3"
                                   :disabled="isAble" />
              </van-dropdown-menu>
            </span>
          </div>
          <div class="list">
            <span class="list-left">详细描述：</span>
            <span class="list-cent">
              <van-field style="padding:0px"
                         v-model="detailed"
                         rows="2"
                         autosize
                         type="textarea"
                         maxlength="50"
                         placeholder="请输入留言"
                         show-word-limit
                         :disabled="isAble" />
            </span>
          </div>
          <div class="list">
            <span class="list-left">上传图片：</span>
          </div>
          <div v-if="isDraft != '已上报'">
            <van-field name="uploader"
                       :before-read="beforeRead"
                       style="padding:10px"
                       :disabled="true">
              <template #input>
                <van-uploader @delete="deleteImgs"
                              @click
                              max-count="5"
                              v-model="imageJSONStr" />
              </template>
            </van-field>
          </div>
          <div v-if="isDraft == '已上报'"
               style="padding:0px 10px; display: flex; flex-wrap: wrap;">
            <div class="forPreview_img"
                 v-for="(item, index) in imageJSONStr"
                 :key="index"
                 @click="show(item)">
              <van-image :src="item.url"
                         style="width:100px;height:100px"></van-image>
            </div>
          </div>
          <div class="list">
            <span class="list-left">上传视频：</span>
          </div>
          <div style="padding:0px 10px; display: flex; flex-wrap: wrap;">
            <div class="forPreview_video"
                 v-for="(item, index) in videoFile"
                 :key="index">
              <video :src="videoSrc"
                     controls="controls"></video>
              <van-icon v-if="isDraft != '已上报'"
                        name="clear"
                        @click="delBtnVideo(index,item)"
                        class="delte"
                        color="#969799" />
            </div>
            <van-uploader v-if="isDraft != '已上报'"
                          v-show="videoFile.length==0"
                          multiple
                          accept="video/*"
                          :before-read="beforeReadVideo">
              <template>
                <van-image src="appimgs/icon-video.png"
                           width="100px"></van-image>
              </template>
            </van-uploader>
          </div>
          <div v-if="!(!isTourists || isDraft=='已上报')"
               class="list margin-bottom-30 margin-top-15">
            <span style="vertical-align: text-bottom;"
                  class="list-left">验证码：</span>
            <span style="vertical-align: text-bottom;"
                  @click="refreshCode">
              <s-identify style="display:inline-block"
                          :identifyCode="identifyCode"></s-identify>
            </span>
            <input v-model="code"
                   type="text"
                   style="height:30px;width:100px;vertical-align: text-bottom;border:0.5px solid #999">
          </div>
        </div>
      </div>
    </van-form>
    <div class="foot"
         v-if="isDraft != '已上报'">
      <van-button class="btn"
                  type="primary"
                  block
                  color="#066BD4"
                  style="  width: 80%;margin: 0 auto;"
                  @click="save('已上报')">上报</van-button>
      <van-button v-if="editId"
                  class="btn"
                  type="primary"
                  block
                  color="#F19149"
                  @click="goBackandClear"
                  style=" width: 80%;margin: 10px auto;">取消</van-button>
      <div v-if="!editId"
           style="width:80%;margin: 0 auto;">
        <van-button class="btn"
                    type="primary"
                    color="#80C269"
                    style="  width: calc(50% - 1rem);"
                    @click="save('草稿')">存草稿</van-button>
        <van-button @click="goBackandClear"
                    class="btn"
                    type="primary"
                    color="#F19149"
                    style="  width: calc(50% - 1rem);margin-left: 2rem">取消</van-button>
      </div>
    </div>

    <van-popup v-model="showTime"
               position="bottom"
               style="min-height:260px">
      <van-datetime-picker v-model="currentDate"
                           type="datetime"
                           @confirm="onConfirmStart"
                           @cancel="showTime = false"
                           :max-date="maxDate" />
    </van-popup>
    <van-image-preview v-model="imgPreviewShow"
                       :images="Previewimages">
    </van-image-preview>
  </div>
</template>

<script>
import { businessApi } from "@/api";
import { localStorageSetting } from "@/util/ds.common";
import SIdentify from "@/_sys_components/validCode";
export default {
  components: { SIdentify },
  name: "addCollection",
  props: {

  },

  data () {
    return {
      identifyCode: "",
      identifyCodes: "123456789",
      code: "",
      isShowMap: false,
      editId: null,
      imgPreviewShow: false,
      reportAddress: "", //地址
      reportLng: "",
      reportLat: "",
      tel: "", //电话
      reportTime: this.$moment(new Date()).format("YYYY-MM-DD HH:mm"), //时间
      maxDate: new Date(),
      relativePath: this.$config.relativePath,//视频和路径的相对
      quakeid: "", //地震标识
      quakeTime: "", //发震时刻
      showTime: false,
      currentDate: new Date(),
      intensity: "Ⅰ",
      option1: this.$config.intensityScale,
      option2: this.$config.describe1,
      option3: this.$config.describe2,
      casualties: 0, //描述1
      damage: 0, //描述2
      detailed: "", //留言
      imageJSONStr: [], //图片
      Previewimages: [],
      title: "新增采集",
      list: [],
      isDraft: "", //草稿
      showSrc: "",
      isAble: false, //是否禁用
      equiListOption: [],
      equiListTime: [],   //发震时刻列表
      showImg: false, //已上报查看图片的弹出
      showEarth: false, //弹出地震列表
      isTourists: false, //不是游客
      videoSrc: "",
      formData: "",
      videoFile: [],
      delAccessoryIds: [],
      bakCenter: {
        lng: "",
        lat: "",
        msg: ""
      }
    };
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.refreshCode();
      vm.isTourists =
        localStorage.getItem("_tourists") == "true" ? true : false;
      vm.title = vm.$router.currentRoute.query.title || "新增采集";
      if (vm.$router.currentRoute.query.id && vm.$router.currentRoute.query.id.includes("_")) {
        var listDraft = JSON.parse(
          localStorage.getItem("earthquakeListCache") || "[]"
        );
        for (let i = 0; i < listDraft.length; i++) {
          if (vm.$router.currentRoute.query.id == listDraft[i].id) {
            let item = listDraft[i];
            vm.isDraft = "草稿";
            vm.isAble = false;
            vm.editId = item.id;
            vm.reportAddress = item.reportAddress;
            vm.reportTime = item.reportTime;
            vm.quakeid = item.quakeid;
            vm.intensity = item.intensity + "";
            vm.casualties = Number.parseInt(item.casualties);
            vm.damage = Number.parseInt(item.damage);
            vm.detailed = item.description || "";
          }
        }
      }
      else if (vm.$router.currentRoute.query.id) {
        businessApi.getCommon({
          url: vm.$api.collentionList,
          params: {
            id: vm.$router.currentRoute.query.id,
            page: 1,
            rows: 1
          }
        }).then(data => {
          if (data.rows.length > 0) {
            var item = data.rows[0];

            vm.isDraft = item.isDraft;
            if (vm.isDraft == "已上报") {
              vm.isAble = true;
            } else {
              vm.isAble = false;
            }
            vm.editId = item.id;
            vm.reportAddress = item.reportAddress;
            vm.reportTime = item.reportTime;
            vm.quakeid = item.quakeid;
            vm.intensity = item.intensity + "";
            vm.casualties = Number.parseInt(item.casualties);
            vm.damage = Number.parseInt(item.damage);
            vm.detailed = item.description || "";
            for (let i = 0; i < item.accessory.length; i++) {
              if (item.accessory[i].type == 0) {
                vm.imageJSONStr.push({ ...item.accessory[i], url: `${vm.$config.relativePath}api/static/image/${item.accessory[i].fileName}` })
                vm.Previewimages.push(`${vm.$config.relativePath}api/static/image/${item.accessory[i].fileName}`)
              } else {
                vm.videoFile.push(item.accessory[i])
                vm.videoSrc = `${vm.$config.relativePath}api/static/video/${item.accessory[i].fileName}`
              }
            }
            vm.isDraft = item.isDraft;
            if (vm.isDraft == "已上报") {
              vm.isAble = true;
            } else {
              vm.isAble = false;
            }
          } else {
            vm.$notify({ type: 'danger', message: "暂未查询到指定数据" });
            vm.goBackandClear()
          }
        })
      } else {
        vm.getLocation();
        vm.isDraft = "";
        vm.isAble = false;
        vm.reportTime = vm.$moment(new Date()).format("YYYY-MM-DD HH:mm");
      }
      vm.formData = new FormData(); // 为上传文件定义一个formData对象
      vm.getEarthquakeData();
    });
  },
  methods: {
    refreshCode () {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    deleteImgs (file, detail) {
      if (file.id) {
        this.delAccessoryIds.push(file.id)
      }
    },
    // 上报时间
    onConfirmStart (reportTime) {
      this.reportTime = this.$moment(reportTime).format("YYYY-MM-DD HH:mm");
      this.showTime = false;
    },
    //上传文件
    beforeRead (file) {
      if (file.type !== "image/jpeg/png") {
        Toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
    //上传视频
    beforeReadVideo (file) {
      var thas = this;
      let uploadUrl = URL.createObjectURL(file);
      let audioElement = new Audio(uploadUrl);
      let duration;
      audioElement.addEventListener("loadedmetadata", function (_event) {
        duration = audioElement.duration; //时长为秒，小数，182.36
        if (duration < 16) {
          thas.videoFile.push(file);
          thas.videoSrc = uploadUrl;
          thas.formData.append("videoFile", file);
        } else {
          thas.$toast("请上传小于15s钟的视频");
        }
      });
    },
    //删除视频
    delBtnVideo (index) {
      if (isNaN(index) || index >= this.videoFile.length) {
        return false;
      }
      let tmp = [];
      for (let i = 0; i < this.videoFile.length; i++) {
        if (this.videoFile[i] !== this.videoFile[index]) {
          tmp.push(this.videoFile[i]);
        } else {
          if (this.videoFile[i].id) {
            this.delAccessoryIds.push(this.videoFile[i].id)
          }
        }
      }
      this.videoFile = tmp;
    },
    //存储本地
    failFun () {
      var that = this;
      var list = JSON.parse(
        localStorage.getItem("earthquakeListCache") || "[]"
      );
      let id = this.editId ? this.editId : localStorageSetting("userid") + "_" + list.length;
      var lon = "", lat = "";
      this.equiListOption.filter(v => {
        if (that.quakeid == v.id) {
          lon = v.lon;
          lat = v.lat;
        }
      });
      let imagelist = [];
      for (var i = 0; i < this.imageJSONStr.length; i++) {
        var curList = {
          data: this.imageJSONStr[i].content
        };
        imagelist.push(curList);
      }
      let item = {};
      item.id = id;
      item.reportAddress = this.reportAddress;
      item.lon = this.reportLng || lon;
      item.lat = this.reportLat || lat;
      item.reportTime = this.reportTime;
      item.quakeid = this.quakeid;
      item.intensity = this.intensity
      item.casualties = this.casualties
      item.damage = this.damage
      item.description = this.detailed
      // item.imageJSONStr = JSON.stringify(imagelist)
      item.isDraft = "草稿"
      let user = localStorageSetting("userCount");
      if (user) {
        item.reportUserid = user.id
      } else {
        item.reportUserid = localStorageSetting("userid");
      }


      for (let i = 0; i < list.length; i++) {
        if (this.editId == list[i].id) {
          list.splice(i, 1);
        }
      }
      list.push(item);
      //重新保存最新的数据
      localStorage.setItem("earthquakeListCache", JSON.stringify(list));
      for (let i = 0; i < this.$parent.$children.length; i++) {
        if (this.$parent.$children[i].$vnode.elm.getAttribute("class") == "collection") {
          this.$parent.$children[i].getCollentionListMy({ page: 1, rows: 10 });
          this.$parent.$children[i].getCollentionListAll({ page: 1, rows: 10 });
          this.goBackandClear()
        }
      }
    },
    //   上报
    save (state) {
      let that = this;

      if (this.isTourists) {
        if (this.code != this.identifyCode) {
          this.$notify({ type: 'danger', message: "验证码不正确，请重新输入" });
          vm.refreshCode();
          return;
        }
      }

      //这里是编辑
      if (this.editId && !this.editId.includes("_")) {
        //修改
        let imagelist = [];
        for (var i = 0; i < this.imageJSONStr.length; i++) {
          if (this.imageJSONStr[i].content) {
            imagelist.push({ data: this.imageJSONStr[i].content });
          }

        }
        let user = localStorageSetting("userCount");
        let userid = localStorageSetting("userid");
        this.formData.append("id", this.editId);
        this.formData.append("quakeid", this.quakeid);
        this.formData.append("intensity", this.intensity);
        this.formData.append("reportAddress", this.reportAddress);
        this.formData.append("casualties", this.casualties);
        this.formData.append("damage", this.damage);
        this.formData.append("description", this.detailed);
        this.formData.append("imageJSONStr", JSON.stringify(imagelist));
        this.formData.append("lon", this.reportLng);
        this.formData.append("lat", this.reportLat);
        if (this.isTourists) {
          this.formData.append("reportUserPhone", userid);
        } else {
          this.formData.append("reportUserid", user.id);
        }
        this.formData.append("reportTime", this.reportTime);
        this.formData.append("isDraft", "已上报")

        const loading = this.$toast({
          message: '上报中...',
          forbidClick: true,
        });
        businessApi.getCommonAdd({
          url: this.$api.collentionEdit,
          params: this.formData
        }).then(data => {
          loading.clear();
          if (this.delAccessoryIds.length > 0) {
            businessApi.delAccessories({
              url: this.$api.delAccessory,
              params: {
                ids: this.delAccessoryIds.join(",")
              }
            })
          }
          for (let i = 0; i < this.$parent.$children.length; i++) {
            if (this.$parent.$children[i].$vnode.elm.getAttribute("class") == "collection") {
              this.$parent.$children[i].getCollentionListMy({ page: 1, rows: 10 });
              this.$parent.$children[i].getCollentionListAll({ page: 1, rows: 10 });
              this.goBackandClear()
            }
          }
        }).catch(function (error) {
          console.log(error);
          loading.clear();
        });
      } else {
        if (state == "草稿") {
          this.getCommonAdd("草稿", () => {
            this.failFun();
            this.$notify({ type: 'danger', message: "连接服务器失败，已存至本地草稿" });
          });
        } else {
          this.getCommonAdd(state);
        }
      }
    },
    //已上报查看图片
    show (item) {
      this.showSrc = item.content || item.url;
      this.showImg = true;
      this.imgPreviewShow = true;
    },
    // 上报
    getCommonAdd (state, cb) {
      if (state == "已上报") {
        if (this.reportAddress == "") {
          this.getLocation(true)
          this.$notify({ type: 'warning', message: "努力获取定位中，请定位成功后提交" });
          return;
        }
        if (this.reportAddress == "获取当前定位中...") {
          this.$notify({ type: 'warning', message: "努力获取定位中，请定位成功后提交" });
          return;
        }
        if (this.reportAddress == "定位失败") {
          this.$notify({ type: 'warning', message: "定位失败，请重新定位" });
          return;
        }
      }
      var imagelist = [];
      var thas = this;
      for (var i = 0; i < this.imageJSONStr.length; i++) {
        var curList = {
          data: this.imageJSONStr[i].content
        };
        imagelist.push(curList);
      }
      var lon = "",
        lat = "";
      this.equiListOption.filter(v => {
        if (thas.quakeid == v.id) {
          lon = v.lon;
          lat = v.lat;
        }
      });
      let user = localStorageSetting("userCount");
      let userid = localStorageSetting("userid");
      this.formData.append("quakeid", this.quakeid);
      this.formData.append("intensity", this.intensity);
      this.formData.append("reportAddress", this.reportAddress);
      this.formData.append("casualties", this.casualties);
      this.formData.append("damage", this.damage);
      this.formData.append("description", this.detailed);
      this.formData.append("imageJSONStr", JSON.stringify(imagelist));
      this.formData.append("lon", this.reportLng);
      this.formData.append("lat", this.reportLat);
      if (this.isTourists) {
        this.formData.append("reportUserPhone", userid);
      } else {
        this.formData.append("reportUserid", user.id);
      }
      this.formData.append("reportTime", this.reportTime);
      this.formData.append("isDraft", state)

      let loading = this.$toast({
        message: '上报中...',
        forbidClick: true,
      });
      debugger
      businessApi.getCommonAdd({
        url: this.$api.collentionAdd,
        params: this.formData
      })
        .then(data => {
          this.$notify({ type: 'warning', message: '上报成功' });
          loading.clear();
          if (this.editId && this.editId.includes("_")) {
            var list = JSON.parse(
              localStorage.getItem("earthquakeListCache") || "[]"
            );
            for (let i = 0; i < list.length; i++) {
              if (this.editId == list[i].id) {
                list.splice(i, 1);
              }
            }
            localStorage.setItem("earthquakeListCache", JSON.stringify(list));
          }
          for (let i = 0; i < this.$parent.$children.length; i++) {
            if (this.$parent.$children[i].$vnode.elm.getAttribute("class") == "collection") {
              thas.$parent.$children[i].getCollentionListMy({ page: 1, rows: 10 });
              thas.$parent.$children[i].getCollentionListAll({ page: 1, rows: 10 });
              thas.goBackandClear()
            }
          }
        })
        .catch(error => {
          this.$notify({ type: 'warning', message: '上传失败' });

          loading.clear();
          cb ? cb() : "";
        })
    },
    //获取地震列表
    getEarthquakeData () {
      var thas = this;
      businessApi.getCommon({
        url: this.$api.ealist,
        params: {
          areal: 1
        }
      }).then(data => {
        if (data.rows.length > 0) {
          this.equiListOption = data.rows.filter(v => {
            v.value = v.id;
            v.text = `${v.address}[${v.quakeLevel}级]`;
            return v;
          });
          if (thas.quakeid == '') {
            thas.quakeid = thas.equiListOption[0].value;
          }
          this.equiListTime = []
          for (var i = 0; i < data.rows.length; i++) {
            var obj = JSON.parse(JSON.stringify(data.rows[i]))
            obj.value = obj.id;
            obj.text = obj.seismicTime;
            thas.equiListTime.push(obj)
          }





        }
      });
    },
    //情况数据 并返回上一页
    goBackandClear () {
      this.code = "";
      this.editId = null;
      this.reportAddress = ""
      this.reportLng = ""
      this.reportLat = ""
      this.imageJSONStr = [];
      this.videoSrc = "";
      this.videoFile = []
      this.detailed = ""
      this.damage = 0;
      this.casualties = 0
      this.quakeid = ""
      this.reportTime = ""
      this.intensity = ""
      this.delAccessoryIds = [];
      this.Previewimages = [];
      this.$router.go(-1);
    },
    getCenters () {
      this.isShowMap = true;
      let that = this;
      this.$nextTick(v => {
        let p = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 12,
          center: [this.reportLng || "119", this.reportLat || "26"],
        });
        AMap.event.addListener(p, 'moveend', () => {
          AMap.plugin('AMap.Geocoder', () => {
            let geocoder = new AMap.Geocoder({
              radius: 1000
            });
            geocoder.getAddress(p.getCenter(), (status, result) => {
              if (status == 'complete') {
                this.bakCenter.lat = p.getCenter().lat;
                this.bakCenter.lng = p.getCenter().lng;
                var res = result.regeocode.formattedAddress.split("省");
                this.bakCenter.msg = res.length > 1 ? res[1] : res[0];
              }
            })
          });
        });
      })
    },
    ok (val) {
      if (val) {
        this.reportLng = this.bakCenter.lng;
        this.reportLat = this.bakCenter.lat;
        if (this.bakCenter.msg) { this.reportAddress = this.bakCenter.msg; }
      }
      this.isShowMap = false;
    },

    //定位
    getLocation (flag) {
      const self = this;

      this.reportAddress = "获取当前定位中..."
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: false,
          // 设置定位超时时间，默认：无穷大
          timeout: 3000,
          GeoLocationFirst: true
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", (data) => {
          self.reportAddress = data.formattedAddress;
          self.reportLng = data.position.lng
          self.reportLat = data.position.lat
        });
        AMap.event.addListener(geolocation, "error", (data) => {
          self.getLngLatLocation();
        });
      })
    },
    getLngLatLocation () {
      var thas = this;
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            AMap.plugin("AMap.Geocoder", function () {
              var geocoder = new AMap.Geocoder({
                city: result.adcode
              });
              var lnglat = result.rectangle.split(";")[0].split(",");
              thas.reportLng = lnglat[0];
              thas.reportLat = lnglat[1];
              geocoder.getAddress(lnglat, function (status, data) {
                if (status === "complete" && data.info === "OK") {
                  thas.reportAddress = data.regeocode.formattedAddress;
                } else {
                  thas.reportAddress = "定位失败"
                }
              });
            });
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.addCollection {
  height: 100%;
  background: #ecf0fb;
  ::v-deep .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border: 0px;
  }
  ::v-deep .van-cell::after {
    border: 0px;
  }
  ::v-deep .van-uploader__preview-image {
    width: 100px;
    height: 100px;
    border: 0px;
  }
  .forPreview_video {
    position: relative;
    width: 100%;
    height: 200px;
    margin: 0 8px 8px 0;
    /*background: rgba(0,0,0,.7);*/
    video {
      width: 95%;
      height: 100%;
    }
    .delte {
      position: absolute;
      right: -4px;
      top: -4px;
    }
  }
  .forPreview_img {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 8px 8px 0;
  }
  ::v-deep .van-uploader__upload {
    border-radius: 0px;
    width: 100px;
    height: 100px;
  }
  ::v-deep .van-uploader__file {
    border-radius: 0px;
    width: 100px;
    height: 100px;
  }
  .dz-van-cell {
    .van-cell {
      padding: 7px 16px;
      padding-right: 0px;
      padding-left: 0px;
    }
    .border {
      ::v-deep .van-field__control {
        border: 1px solid #ddd;
      }
    }
    ::v-deep .van-field__label {
      line-height: 30px;
      width: 4.5rem;
      font-size: 13px;
      color: #999;
    }
    ::v-deep .van-field__control {
      height: 30px;
      border-radius: 4px;
    }
    .time {
      position: absolute;
      right: 0px;
      right: 4px;
      top: 13px;
    }
  }
  .sub-nav {
    height: 190px;
    padding: 0 8px;
    background: #fff;
    box-shadow: 1px 1px 4px 2px #ddd;
    position: relative;
    z-index: 9;
    .btn-right {
      position: absolute;
      right: 0px;
      display: inline-block;
      bottom: 5px;
      width: 75px;
      height: 30px;
      background: rgba(195, 224, 255, 1);
      border: 1px solid rgba(6, 107, 212, 1);
      border-radius: 5px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(6, 107, 212, 1);
      vertical-align: middle;
      line-height: 30px;
      text-align: center;
    }
    .list {
      padding: 6px 0px;
      .list-left {
        height: 35px;
        font-size: 13px;
        line-height: 35px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        display: inline-block;
        width: 4.5rem;
        text-align: right;
        vertical-align: middle;
      }
      .list-cent {
        display: inline-block;
        width: calc(100% - 4.5rem);
        vertical-align: middle;
      }
      .list-dropdown {
        height: 35px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        ::v-deep .van-dropdown-menu__bar {
          height: 35px;
          border-radius: 4px;
        }
        ::v-deep .van-dropdown-menu__title {
          width: calc(100% - 20px);
          padding: 0px;
        }
      }
      ::v-deep .van-cell__value--alone {
        border-radius: 4px;
        border: 1px solid #dcdcdc;
      }
    }
  }
  .cent {
    height: calc(100% - 160px);
    padding: 8px 0px;
    overflow: auto;
    .list {
      padding: 6px 0px;
      .list-left {
        height: 35px;
        font-size: 13px;
        line-height: 35px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        display: inline-block;
        width: 4.5rem;
        text-align: right;
      }
      .list-cent {
        display: inline-block;
        width: calc(100% - 4.5rem);
      }
      .list-dropdown {
        height: 35px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        ::v-deep .van-dropdown-menu__bar {
          height: 35px;
          border-radius: 4px;
        }
        ::v-deep .van-dropdown-menu__title {
          width: calc(100% - 20px);
          padding: 0px;
        }
      }
      ::v-deep .van-cell__value--alone {
        border-radius: 4px;
        border: 1px solid #dcdcdc;
      }
    }
  }
  .foot {
    padding: 15px 8px;
    .btn {
      height: 36px;
      border-radius: 5px;
      margin-top: 10px;
    }
  }
  ::v-deep .van-field__word-limit {
    padding-right: 5px;
  }
}
#container {
  position: absolute;
  width: 100%;
  height: calc(100vh - 46px);
  top: 46px;
  z-index: 100;
}
.center {
  width: initial;
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 12px);
  z-index: 9999;
}
.ok {
  position: absolute;
  right: 80px;
  bottom: 10px;
  z-index: 9999;
  padding: 7px 15px;
  border-radius: 10px;
  background: skyblue;
  border: none;
}
.cancel {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 9999;
  padding: 8px 15px;
  border-radius: 10px;
  border: none;
}
</style>