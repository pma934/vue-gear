<template>
  <div>
    about
    <div :class="{aa_a:1}" @click="getHello">aaa</div>
    <div v-html="mockData">{{mockData}}</div>
  </div>
</template>

<script>
export default {
  name: "About",
  props: {},
  data() {
    return {
      mockData: "<span style='color:red'>利用vue添加了插入一个span 元素</span>"
    };
  },
  computed: {},
  watch: {},
  methods: {
    getHello:function() {
      this.$http.get("http://jsonplaceholder.typicode.com/comments").then(
        response => {
          this.mockData += "<image src="+ response.body +">";
          console.log(response.body);
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  components: {},
  created() {},
  mounted() {}
};
</script>

<style scoped>
.aa_a {
  background-color: aqua;
}
</style>
