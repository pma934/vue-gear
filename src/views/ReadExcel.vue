<template>
  <div id="ReadExcel">
    <div class="content">
      原始数据清洗模块
      <div>
        <input type="file" ref="upload" accept=".xls, .xlsx" class="outputlist_upload">
      </div>
      <code>{{outputs}}</code>
      <MyTable :table-data="outputs"></MyTable>
    </div>
  </div>
</template>

<script>
import readExcel from "@/assets/readExcel.js";
import MyTable from "@/components/MyTable.vue";

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
  components: {
    MyTable: MyTable
  },
  created() {},
  mounted() {
    let that = this;
    this.$refs.upload.addEventListener("change", async e => {
      console.log(e, e.target);
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
