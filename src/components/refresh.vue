<template>
    <div>
         <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <slot></slot>
             
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
    export default {
          props: ["parentlist"],
          data() {
            return {
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
            };
  },
  methods: {
        onLoad() {
            setTimeout(() => {
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }

                for (let i = 0; i < 10; i++) {
                     if (this.list.length >= this.parentlist.length) {
                        this.finished = true;
                        return;
                    }
                     this.list.push(this.parentlist[this.list.length]);
                     this.$emit('refreshData', this.list);
                }
                this.loading = false;

                if (this.list.length >= this.parentlist.length) {
                this.finished = true;
                }
            }, 1000);
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
            },
        },
    }
</script>
 <style lang="scss" scoped>

</style>