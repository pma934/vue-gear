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
  G6.registerNode("myimage", {
      afterDraw(cfg, group) {
        var shape = group.get('children')[0];
        shape._cfg['value'] = cfg.value || 1
        let l = Math.pow(1.1, shape._cfg.value) * 5
        shape._attrs['height'] = l
        shape._attrs['width'] = l
        if (!cfg.value) {
          group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              fontSize: 5,
              textAlign: 'center',
              textBaseline: 'middle',
              text: cfg.id,
              fill: '#666'
            }
          })
        }
      },
      setState(name, value, node) {
        let shape = node.get("keyShape");
        let l = Math.pow(1.1, shape._cfg.value) * 5
        if (name === "running") {
          if (value) {
            shape.attr("height", l * 1.4);
            shape.attr("width", l * 1.4);
            shape.attr("x", -2.5 - l * 0.2);
            shape.attr("y", -2.5 - l * 0.2);
          } else {
            shape.attr("height", l);
            shape.attr("width", l);
            shape.attr("x", -2.5);
            shape.attr("y", -2.5);
          }
        }
      },
    },
    "image"
  );

  G6.registerNode('background-animate', {
    afterDraw: function afterDraw(cfg, group) {
      let v = cfg.value / 2 + 1 || 1
      var r = cfg.size / 2;
      var back1 = group.addShape('circle', {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r: r,
          fill: cfg.color,
          opacity: 0.6
        }
      });
      var back2 = group.addShape('circle', {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r: r,
          fill: cfg.color, // 为了显示清晰，随意设置了颜色
          opacity: 0.6
        }
      });

      var back3 = group.addShape('circle', {
        zIndex: -1,
        attrs: {
          x: 0,
          y: 0,
          r: r,
          fill: cfg.color,
          opacity: 0.6
        }
      });
      group.sort(); // 排序，根据zIndex 排序
      back1.animate({ // 逐渐放大，并消失
        r: r * v,
        opacity: 0.1,
        repeat: true // 循环
      }, 3000, 'easeCubic', null, 0); // 无延迟

      back2.animate({ // 逐渐放大，并消失
        r: r * v,
        opacity: 0.1,
        repeat: true // 循环
      }, 3000, 'easeCubic', null, 1000); // 1 秒延迟

      back3.animate({ // 逐渐放大，并消失
        r: r * v,
        opacity: 0.1,
        repeat: true // 循环
      }, 3000, 'easeCubic', null, 2000); // 2 秒延迟

      if (cfg.url) {
        group.addShape('image', {
          attrs: {
            x: -2.5,
            y: -2.5,
            width: 5,
            height: 5,
            img: cfg.url
          }
        })
      } else {
        group.addShape('text', {
          attrs: {
            x: 0,
            y: 0,
            fontSize: 5,
            textAlign: 'center',
            textBaseline: 'middle',
            text: cfg.id,
            fill: '#666'
          }
        })
      }
      if (cfg.click) {
        group["click"] = cfg.click
      }
    }
  }, 'circle');

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
  G6.registerBehavior('setRunning', {
    getEvents() {
      return {
        'node:mouseenter': 'onMouseenter',
        'node:mouseleave': 'onMouseleave',
        'node:click': 'onClick',
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
    },
    onClick(ev) {
      let node = ev.item;
      let url = node.get("group").click
      if (url) {
        window.open(url)
      }
    },
  });
}
