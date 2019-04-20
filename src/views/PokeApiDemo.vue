<template>
  <div>
    <p v-text="str"></p>
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
      str: "nothing"
    };
  },
  computed: {},
  watch: {},
  methods: {},
  components: {},
  created() {},
  mounted() {
    this.P.getPokemonsList()
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.error("There was an ERROR: ", error);
      });
  }
};
</script>

<style scoped>
</style>