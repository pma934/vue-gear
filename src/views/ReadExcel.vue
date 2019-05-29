<template>
  <div id="ReadExcel">
    <div class="content">
      原始数据清洗模块
      <div>
        <input type="file" ref="upload" accept=".xls, .xlsx" class="outputlist_upload">
      </div>
      <code>{{outputs}}</code>
    </div>
  </div>
</template>

<script>
import readExcel from "@/assets/readExcel.js";

export default {
  name: "ReadExcel",
  props: {},
  data() {
    return {
      outputs: []
    };
  },
  computed: {},
  watch: {},
  methods: {},
  components: {},
  created() {},
  mounted() {
    let that = this;
    this.$refs.upload.addEventListener("change", async e => {
      readExcel(e).then(
        res => {
          that.outputs = res;
          that.$refs.upload.value = "";
        },
        err => {
          alert(err);
          that.$refs.upload.value = "";
        }
      );
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
