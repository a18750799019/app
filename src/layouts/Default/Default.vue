<template>
  <div class="wrap">
    <div class="leftMenu">
      <div class="logo"></div>
    </div>
    <div class="container">
      <keep-alive>
        <router-view ref="parent"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script src="./Default.js"></script>
<style src="./Default.scss" lang="scss" scoped></style>
