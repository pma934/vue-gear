<template>
  <div>
    <button @click="delet">delete</button>
    <div id="mountNode" ref="mountNode"></div>
    <!-- <code>{{data}}</code> -->
  </div>
</template>

<script>
import AntvG6Init from "@/assets/AntvG6Init.js";

export default {
  name: "AntvG6",
  props: {},
  data() {
    return {
      data: require("@/assets/hhh.json"),
      maxX: 100,
      maxY: 100,
      graphdata: {
        nodes: [],
        edges: []
      },
      graph: null,
      timer: true //onresize防抖
    };
  },
  computed: {},
  watch: {},
  methods: {
    getmap(obj, x, y) {
      this.maxX = Math.max(this.maxX, x);
      this.maxY = Math.max(this.maxY, y);
      let y1 = y;
      if (obj.hasOwnProperty("child")) {
        for (let index in obj.child) {
          y1 = this.getmap(obj.child[index], x + 500, y1);
          if (index < obj.child.length - 1) {
            y1 += 50;
          }
          this.graphdata.edges.push({
            source: obj.id,
            target: obj.child[index].id
          });
        }
      }
      this.graphdata.nodes.push({
        id: obj.id,
        x: x + Math.random() * 100 - 50,
        y: (y + y1) / 2
      });
      return y1;
    },
    delet() {
      console.log(this.graph);
      // this.graph.changeSize()
    }
  },
  components: {},
  created() {
    this.getmap(this.data, 0, 0);
  },
  mounted() {
    var that = this;

    AntvG6Init(this.$G6);

    this.graph = new this.$G6.Graph({
      container: "mountNode",
      width: this.maxX,
      height: this.maxY,
      modes: {
        default: ["drag-node", "setRunning"]
      },
      defaultNode: {
        shape: "circle-animate",
        size: 20
      },
      nodeStyle: {
        // 节点在默认状态下的样式
        default: {
          fill: "#40a9ff",
          stroke:"#40a9ff"
        },
        // 当节点在 selected 状态下的样式
        running: {
          lineWidth: 2,
          fillOpacity: 0
        }
      },
      defaultEdge: {
        shape: "can-running",
        size: 2
      },
      edgeStyle: {
        default: {
          stroke: "#8ab9ea"
        }
      }
    });
    this.graph.data(this.graphdata);
    this.graph.render();
    this.graph.fitView();
    window.onresize = function() {
      if (that.timer) {
        that.timer = false;
        setTimeout(function() {
          that.timer = true;
          let width = that.$refs["mountNode"].clientWidth;
          that.graph.changeSize(width, (width * that.maxY) / (that.maxX + 50));
          that.graph.fitView();
        }, 200);
      }
    };
  }
};
</script>

<style scoped>
* >>> .g6-tooltip {
  padding: 10px 6px;
  color: blue;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}
</style>