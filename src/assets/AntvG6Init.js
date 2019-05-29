export default function (G6) {
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
  G6.registerEdge("can-running", {
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
            shape.animate({
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
  G6.registerNode('circle-animate', {
    setState: function setState(name, value, item) {
      let shape = item.get("keyShape");
      if (name === "running") {
        if (value) {
          shape.animate({
              onFrame: function onFrame(ratio) {
                var cfg = {
                  r: 10 * (1 + ratio)
                };
                return cfg;
              },
            },
            500
          );
        } else {
          shape.stopAnimate();
          shape.attr("r", 10);
        }
      }
    }
  }, 'circle');

  G6.registerBehavior('setRunning', {
    getEvents() {
      return {
        'node:mouseenter': 'onMouseenter',
        'node:mouseleave': 'onMouseleave'
      };
    },
    onMouseenter(ev) {
      var that = this
      var node = ev.item;
      this.graph.setItemState(node, "running", true);
      var edges = node.getEdges();
      edges.forEach(function (edge) {
        that.graph.setItemState(edge, "running", true);
      });
    },
    onMouseleave(ev) {
      var that = this
      var node = ev.item;
      this.graph.setItemState(node, "running", false);
      var edges = node.getEdges();
      edges.forEach(function (edge) {
        that.graph.setItemState(edge, "running", false);
      });
    }
  });
}
