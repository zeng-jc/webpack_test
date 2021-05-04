<template>
  <div>
    <h2 class="title">{{ message }}</h2>
    <button @click="btnClick">按钮</button>
  </div>
</template>

<script>
// npm install vue-loader vue-template-compiler --save-dev 解析vue文件的包
export default {
  name: "App",
  data() {
    return {
      message: "hello webpack",
    };
  },
  methods: {
    btnClick() {
      alert("2321231");
    },
  },
};
</script>

<style>
.title {
  color: orange;
}
</style>