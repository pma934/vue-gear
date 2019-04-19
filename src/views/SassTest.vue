<template>
  <div class="box">
    <div id="child_1">child1</div>
    <div id="child_2">child2</div>
    <div id="child_3">child3</div>
    <div id="child_4">child4</div>
    <div class="xxa"></div>
    <div class="xxb"></div>
    <div class="xxa"></div>
    <div class="xxc"></div>
    <div class="xxd">
      <div class="xxd"></div>
      <a href>123</a>
      <h1>123</h1>
    </div>
    <h1>123</h1>
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
//跟混合器相比，继承生成的css代码相对更少。因为继承仅仅是重复选择器，而不会重复属性，所以使用继承往往比混合器生成的css体积更小。如果你非常关心你站点的速度，请牢记这一点。

$highlight-color: rgba(180, 182, 47, 0.384);
$aa: 300px;
$bb: 100px;

@mixin border-item($width, $style, $color: red /* 默认值*/) {
  // 给混合器传参;
  border-width: $width;
  border-style: $style;
  border-color: $color;
}
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:focus {
    color: $visited;
  }
}

.box {
  @import "../assets/a.css";
  //群组选择器的嵌套;  父选择器的标识符&;
  /* 非静默注释 */
  //静默注释
  &:hover {
    border-width: 1px;
  }
  width: $aa;
  height: $aa;
  @include border-item(10px, solid, yellow);
  border-top-color: blue;
  border-bottom-color: red;
  border-left-color: $highlight-color;
  border-right-color: green;
  * {
    width: $bb/2;
    height: $bb/2;
    border: 5px solid;
    display: inline-block;
  }
  > * {
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
  #child_3 {
    //使用选择器继承来精简CSS;
    @extend #child_2;
  }
  #child_4 {
    //使用选择器继承来精简CSS;
    @extend #child_1;
  }
}
.xxa {
  //子组合选择器和同层组合选择器：>、+和~;
  + .xxb {
    background-color: red;
  }
  .xxb + & {
    background-color: blue;
  }
}

.xxc {
  //嵌套属性;
  @include border-item(20px, solid, $highlight-color);
}

.xxd {
  @import "../assets/a";
  @include test;
  a {
    @include link-colors(blue, red, green);
  }
}
h1 {
  //组合选择器样式也会被继承
  @extend a;
}
</style>
