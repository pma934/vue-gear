<template>
  <div class="context">
    <div v-for="data in datas" :key="data.name" class="iconbox">
      <div :class="[data.副属性?'type-'+data.主属性+'-'+data.副属性:'type-'+data.主属性+'-'+data.主属性]">
        <span>#{{data.全国编号}}</span>
        <span>{{data.中文名}}</span>
        <span :class="['sprite-icon','sprite-icon-'+data.全国编号]"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Pokedex from "pokedex-promise-v2";

export default {
  name: "PokeApi",
  props: {},
  data() {
    return {
      P: new Pokedex(),
      datas: require("@/assets/Pokemon/Kanto.json")
    };
  },
  computed: {},
  methods: {},
  components: {},
  created() {},
  mounted() {
    console.log(this.datas);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/Pokemon/PokemonIcon.css";
@import "../assets/Pokemon/TypeColor";
.context {
  margin: 10px 20px;
  .iconbox {
    width: 100px;
    height: 100px;
    margin: 2px;
    display: inline-block;
    &:hover {
      transform: scale(1.05);
    }
    div {
      display: flex;
      height: 100%;
      flex-direction: column;
      span {
        &:first-child {
          font-style: italic;
        }
        font-weight: bolder;
        text-align: center;
        margin: auto;
      }
    }
  }
}
</style>
