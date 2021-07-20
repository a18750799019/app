<template>
  <div class="ds-main-container">
    <van-tabbar v-model="active" active-color="#066BD4" inactive-color="#A8AAAE">
      <van-tabbar-item
        v-for="item in tabbar"
        :key="item.name"
        @click="toggleRightMenu(item)"
        :name="item.name"
      >
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive">
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { localStorageSetting } from "@/util/ds.common";

import mqtt from "mqtt";

export default {
  components: {},
  data() {
    return {
      client: null,
      active: "earthquakeMap",
      tabbar: this.$config.tabbar,
      isTourists: false //不是游客
    };
  },
  mounted() {
    this.$router.push({ name: this.active });
    this.isTourists =
      localStorage.getItem("_tourists") == "true" ? true : false;
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let userid = localStorageSetting("userid");
      if (!userid) {
        vm.$router.push("/login");
        return;
      }
      vm.isTourists =
        localStorage.getItem("_tourists") == "true" ? true : false;
      let curTabbar = [];
      if (vm.isTourists == true) {
        vm.tabbar.filter((v, i) => {
          if (v.title != "辅助决策" && v.title != "通讯录") {
            curTabbar.push(v);
          }
        });
        vm.tabbar = curTabbar;
      } else {
        vm.tabbar = vm.$config.tabbar;
      }
    });
  },
  methods: {
    toggleRightMenu(item) {
      if (item.name) {
        this.$router.push({ name: item.name });
      }
    }
  }
};
</script>
<style lang="scss" scoped src="./Home/home.scss"></style>
