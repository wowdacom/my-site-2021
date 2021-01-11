<template>
  <div class="cover-wrapper">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
    </div> -->
    <div class="canvas-background">
      <canvas id="cover"></canvas>
    </div>

    <!-- <h1 class="title" :class="{ active: isUnlock }">{{ warning }}</h1> -->
  </div>
  <h1 v-if="isUnlock">Hello My Friend!</h1>
</template>

<script>
import {
  canvas,
  initCanvas,
  addText,
  addImage,
} from "@/compositions/Billboard";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Billboard",
  setup() {
    const store = useStore();
    onMounted(() => {
      const container = document.querySelector("#cover");
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      initCanvas("cover", {
        width,
        height,
      });

      addText("Implementation details", {
        fontFamily: "Alegreya",
        top: height / 2,
        left: width / 2,
      });
      addText("Hello World", {
        top: height / 3,
        left: width / 3,
      });
      addImage(require("../assets/logo.png"), {
        name: "target",
        scaleSize: 0.8,
        left: (container.offsetWidth / 5) * 3,
        top: container.offsetHeight / 4,
        isFilter: true,
      });
      addImage(require("../assets/logo.png"), {
        name: "arrow",
        scaleSize: 0.8,
        left: (container.offsetWidth / 5) * 1,
        top: container.offsetHeight / 3,
        isFilter: false,
      });

      canvas.on("object:modified", (e) => {
        const target = canvas._objects.find(
          (element) => element.name === "target"
        );
        if (
          e.target.name === "arrow" &&
          target.lineCoords.bl.x - 20 < e.target.lineCoords.bl.x &&
          target.lineCoords.bl.y + 20 > e.target.lineCoords.bl.y &&
          target.lineCoords.br.x + 20 > e.target.lineCoords.br.x &&
          target.lineCoords.br.y + 20 > e.target.lineCoords.br.y &&
          target.lineCoords.tl.x - 20 < e.target.lineCoords.tl.x &&
          target.lineCoords.tl.y - 20 < e.target.lineCoords.tl.y &&
          target.lineCoords.tr.x + 20 > e.target.lineCoords.tr.x &&
          target.lineCoords.tr.y - 20 < e.target.lineCoords.tr.y
        ) {
          e.target.set({
            left: target.left,
            top: target.top,
          });
          canvas.renderAll();
          store.commit("unlock", true);
        }
      });
    });

    return {
      isUnlock: computed(() => store.state.isUnlock),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cover-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, 0, 0);
    @keyframes shakeY {
      from,
      to {
        transform: translate3d(-50%, 0, 0);
      }

      10%,
      30%,
      50%,
      70%,
      90% {
        transform: translate3d(-50%, 10px, 0);
      }

      20%,
      40%,
      60%,
      80% {
        transform: translate3d(-50%, 10px, 0);
      }
    }

    &.active {
      transform-origin: center center;
      animation: shakeY 1s linear infinite;
    }
  }
  .canvas-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    #cover {
      width: inherit;
      height: inherit;
    }
  }

  #nav {
    width: 100%;
  }
}
</style>
