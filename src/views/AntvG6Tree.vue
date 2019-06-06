<template>
  <div>
    <button @click="delet">delete</button>
    <div id="mountNode" ref="mountNode"></div>
    <!-- <code>{{data}}</code> -->
  </div>
</template>

<script>
import G6 from "@antv/g6";
import Hierarchy from "@antv/hierarchy";
import AntvG6Init from "@/assets/AntvG6Init.js";

export default {
  name: "AntvG6",
  props: {},
  data() {
    return {
      data: require("@/assets/skill.json"),
      graph: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    delet() {
      console.log(this.graph);
      this.graph.destroy();
    }
  },
  components: {},
  created() {},
  mounted() {
    AntvG6Init(G6);
    this.graph = new G6.TreeGraph({
      container: "mountNode",
      width: 500,
      height: 500,
      linkCenter: true,
      modes: {
        default: [
          "drag-node",
          "setRunning",
          {
            type: "tooltip",
            formatText(model) {
              let lv = ["不懂", "了解", "熟悉", "熟练", "掌握", "精通"];
              return model.value?`${model.id}\t${lv[model.value]}`:`${model.id}`;
            }
          }
        ]
      },
      defaultNode: {
        shape: "background-animate",
        color: "#40a9ff",
        size: 5
      },
      nodeStyle: {
        default: {
          lineWidth: 0
        },
        running: {
          fillOpacity: 0.5
        }
      },
      defaultEdge: {
        size: 0.5
      },
      edgeStyle: {
        default: {
          stroke: "#8ab9ea"
        }
      },
      layout: function layout(data) {
        var result = Hierarchy.dendrogram(data, {
          direction: "RL", // H / V / LR / RL / TB / BT
          nodeSep: 20,
          rankSep: 100
        });
        G6.Util.radialLayout(result);
        return result;
      }
    });
    this.graph.data(this.data);
    this.graph.render();
    this.graph.fitView();
  }
};
</script>

<style scoped>
* >>> .g6-tooltip {
  padding: 10px 6px;
  color: blue;
  background-color: rgba(255, 255, 255, 0.9);
  /* border: 1px solid #e2e2e2; */
  border-radius: 4px;
}
/* #mountNode >>> canvas {
  background-color: #eee;
} */
</style>