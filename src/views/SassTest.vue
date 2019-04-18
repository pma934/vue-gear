<template>
  <div class="box">
    <div id="child_1">child1</div>
    <div id="child_2">child2</div>
  </div>
</template>

<script>
export default {
  name: "Name",
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  components: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
$highlight-color: rgba(180, 182, 47, 0.384);
$aa: 300px;
$bb: 100px;

.box {
  &:hover {
    border-width: 1px;
  }
  width: $aa;
  height: $aa;
  border-width: 10px;
  border-style: solid;
  border-top-color: blue;
  border-bottom-color: red;
  border-left-color: $highlight-color;
  border-right-color: green;
  #child_1,
  #child_2 {
    width: $bb;
    height: $bb;
    border: 5px solid;
  }
  #child_1 {
    border-top-color: blue;
    border-bottom-color: red;
    border-left-color: $highlight-color;
    border-right-color: green;
  }
  #child_2 {
    border-top-color: red;
    border-bottom-color: blue;
    border-left-color: $highlight-color;
    border-right-color: yellow;
  }
}
</style>
