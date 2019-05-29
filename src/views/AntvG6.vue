<template>
  <div>
    <div id="mountNode"></div>
    <!-- <code>{{data}}</code> -->
  </div>
</template>

<script>
export default {
  name: "AntvG6",
  props: {},
  data() {
    return {
      data: require("@/assets/hhh.json"),
      graphdata: {
        nodes: [],
        edges: []
      },
      graph: {}
    };
  },
  computed: {},
  watch: {},
  methods: {
    getmap(obj, x, y) {
      this.graphdata.nodes.push({
        id: obj.id,
        x: x,
        y: y
      });
      if (obj.hasOwnProperty("child")) {
        for (let index in obj.child) {
          this.getmap(
            obj.child[index],
            x + 100,
            y + 100 * index - ((obj.child.length - 1) * 100) / 2
          );
          this.graphdata.edges.push({
            source: obj.id,
            target: obj.child[index].id,
            shape: "can-running"
          });
        }
      }
    }
  },
  components: {},
  created() {
    console.log(this.data);
    this.getmap(this.data, 0, 0);
  },
  mounted() {
    var that = this
    var dashArray = [
      [0, 1],
      [0, 2],
      [1, 2],
      [0, 1, 1, 2],
      [0, 2, 1, 2],
      [1, 2, 1, 2],
      [2, 2, 1, 2],
      [3, 2, 1, 2],
      [4, 2, 1, 2]
    ];

    var lineDash = [4, 2, 1, 2];
    var interval = 9;
    this.$G6.registerEdge(
      "can-running",
      {
        setState: function setState(name, value, item) {
          var shape = item.get("keyShape");
          if (name === "running") {
            if (value) {
              var length = shape.getTotalLength(); // 后续 G 增加 totalLength 的接口
              var totalArray = [];
              for (var i = 0; i < length; i += interval) {
                totalArray = totalArray.concat(lineDash);
              }
              var index = 0;
              shape.animate(
                {
                  onFrame: function onFrame(ratio) {
                    var cfg = {
                      lineDash: dashArray[index].concat(totalArray)
                    };
                    index = (index + 1) % interval;
                    return cfg;
                  },

                  repeat: true
                },
                3000
              );
            } else {
              shape.stopAnimate();
              shape.attr("lineDash", null);
            }
          }
        }
      },
      "cubic-horizontal"
    );
    this.graph = new this.$G6.Graph({
      container: "mountNode",
      width: 800,
      height: 500,
      modes: {
        default: ["drag-node", "zoom-canvas"]
      },
      defaultEdge: {
        shape: "cubic",
        size: 1
      },
      edgeStyle: {
        // 默认边的样式
        default: {
          stroke: "#A3B1BF"
        }
      }
    });
    this.graph.data(this.graphdata);
    this.graph.render();
    this.graph.fitView();
    this.graph.on("node:mouseenter", function(ev) {
      var node = ev.item;
      var edges = node.getEdges();
      edges.forEach(function(edge) {
        return that.graph.setItemState(edge, "running", true);
      });
    });

    this.graph.on("node:mouseleave", function(ev) {
      var node = ev.item;
      var edges = node.getEdges();
      edges.forEach(function(edge) {
        return that.graph.setItemState(edge, "running", false);
      });
    });
  }
};
</script>

<style scoped>
</style>