<template>
  <div id="container" ref="container">
    <div class="buttons">
      <v-btn large depressed color="primary" @click="animation1">animation 1</v-btn>
      <v-btn large depressed color="primary" @click="animation2">animation 2</v-btn>
      <v-btn large depressed color="primary" @click="kill">kill</v-btn>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { TweenMax, Bounce } from "gsap";
import { SlowMo, RoughEase, ExpoScaleEase } from "gsap/src/EasePack";

export default {
  name: "ThreeTest",
  data() {
    return {
      container: null,
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      myAnimation: null
    };
  },
  methods: {
    createScene() {
      this.scene = new THREE.Scene();
    },
    createCamera() {
      this.camera = new THREE.PerspectiveCamera();
      this.camera.position.set(0, 0, 10);
    },
    createRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });
    },
    createMesh() {
      const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
      const material = new THREE.MeshLambertMaterial({ color: 0x0f08f0 });
      this.mesh = new THREE.Mesh(geometry, material);
    },
    init(container, camera, scene, renderer, mesh) {
      const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 5);
      const mainlight = new THREE.DirectionalLight(0xffffff, 5.0);
      mainlight.position.set(10, 10, 10);
      scene.add(ambientLight, mainlight, mesh);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
    },
    update() {
      this.mesh.rotation.z += 0.01;
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;
    },
    animation1() {
      if(this.myAnimation instanceof TweenMax) this.kill();
      this.myAnimation = new TweenMax(this.mesh.scale, 2, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        ease: SlowMo.ease,
        yoyoEase: true,
        yoyo: true,
        repeat: -1,
        onComplete: function() {
          console.log("over");
        }
      });
    },
    animation2() {
      let that = this;
      if(this.myAnimation instanceof TweenMax) this.kill();
      this.myAnimation = new TweenMax(this.mesh.position, 2, {
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        z: Math.random() * 10 - 5,
        ease: SlowMo.ease,
        yoyoEase: true,
        yoyo: true,
        repeat: 1,
        onComplete: function() {
          that.animation2();
        }
      });
    },
    kill() {
      this.myAnimation.pause(0);
      this.myAnimation.kill();
      this.mesh.scale.set(1, 1, 1);
    }
  },
  created() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createMesh();
  },
  mounted() {
    this.container = this.$refs.container;
    this.init(
      this.container,
      this.camera,
      this.scene,
      this.renderer,
      this.mesh
    );
    this.renderer.setAnimationLoop(() => {
      this.update();
      this.renderer.render(this.scene, this.camera);
    });
  }
};
</script>

<style scoped>
#container {
  background-image: linear-gradient(#e4e0ba, #f7d9aa);
  height: 100%;
  width: 100%;
  position: absolute;
}
.buttons {
  position: absolute;
}
</style>
