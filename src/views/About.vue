<template>
  <div>
    about
    <div :class="{aa_a:1}" @click="getHello">
      <button class="btn success"  @click="btn">按钮</button>
    </div>
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
    getHello: function() {
      console.log('外')
      // this.$http.get("http://jsonplaceholder.typicode.com/comments").then(
      //   response => {
      //     this.mockData += "<image src=" + response.body + ">";
      //     console.log(response.body);
      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
    },
    btn(){
      console.log('内')
    }
  },
  components: {},
  created() {
    console.log(this.Global.a++);
  },
  mounted() {}
};
</script>

<style scoped>
.aa_a {
  background-color: aqua;
}
</style>
