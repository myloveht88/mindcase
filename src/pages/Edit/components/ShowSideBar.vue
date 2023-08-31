<template>
  <div>
    <el-tooltip
      class="item"
      effect="dark"
      :content="show"
      placement="top"
    >
      <div class="btn iconfont icongaikuozonglan" @click="Show"></div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ShowSideBar',
  props: {
  },
  data() {
    return {
      show:"边栏",
      value: false
    }
  },
  created() {
  },
  methods: {
    // 显示边栏
    Show() {
      // this.$emit('change', this.value = !this.value);
      if(this.$store.state.activeSidebar){
        this.$store.state.activeSidebar = this.value
      }else{
        this.$store.state.activeSidebar = !this.value
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
