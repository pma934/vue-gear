<template>
  <div ref="div" style="border:1px solid;background:grey">
    <!--  cardsUrl、radius、cardWidth、cardHeight、clockwise、cycle、isSpin、isDrag、cardClickEvent-->
    <rotate-card :cards-url="cardsUrl" :radius="400" :cardWidth="240" :cardHeight="340" :clockwise="true" :cycle="30" :isDrag="true" :cardClickEvent="setBackGroundImage"></rotate-card>
  </div>
</template>

<script>
import RotateCard from "../components/RotateCard";

export default {
  name: "RotateCardTest",
  props: {}, //name:type
  data() {
    return {
      cardsUrl: [
        "https://images.pokemontcg.io/xyp/XY62_hires.png",
        "https://images.pokemontcg.io/xyp/XY158_hires.png",
        "https://images.pokemontcg.io/xy7/68_hires.png",
        "https://images.pokemontcg.io/xy5/105_hires.png",
        "https://images.pokemontcg.io/xyp/XY103_hires.png",
        "https://images.pokemontcg.io/xy2/107_hires.png",
        "https://images.pokemontcg.io/smp/SM126_hires.png"
      ]
    };
  },
  computed: {}, //计算属性
  watch: {},
  methods: {
      setBackGroundImage(){
          console.log(arguments)
          var div = this.$refs['div']
          div.style.backgroundImage = `url(${arguments[0]})`
      }
  },
  components: {
    "rotate-card": RotateCard
  }, //组件componentsName:name
  created() {},
  mounted() {}
};
</script>

<style scoped>
</style>