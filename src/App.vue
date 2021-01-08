<template>
  <div class="cover-wrapper">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
    </div>
    <div class="canvas-background">
      <canvas id="cover"></canvas>
    </div>
    <h1 class="title" :class="{ active: isUnlock }">{{ warning }}</h1>
  </div>
  <div v-if="isUnlock" class="content">
    <h1>看下面更多的內容</h1>
  </div>

  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

  <!-- <router-view /> -->
</template>

<script>
import { fabric } from "fabric";
import { onMounted, ref } from "vue";

export default {
  name: "App",
  components: {},
  setup() {
    // create a wrapper around native canvas element (with id="c")
    var isUnlock = ref(false);
    var warning = ref("解鎖看更多");

    onMounted(() => {
      let box = document.querySelector("#cover");
      let width = box.offsetWidth;
      let height = box.offsetHeight;
      let scaleSize = 0.8;
      let isCorrect = false;
      var canvas = new fabric.Canvas("cover", {
        width,
        height,
      });
      canvas.on("object:modified", (e) => {
        let target = canvas._objects.find(
          (element) => element.name === "target"
        );
        console.log(target);
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
          isCorrect = true;
        }
      });

      canvas.on("after:render", function() {
        // let isLoadingTimeout = false;
        if (isCorrect == true) {
          // isLoadingTimeout = true;
          setTimeout(() => {
            // isLoadingTimeout = false;
            isCorrect = false;
            isUnlock.value = true;
            warning.value = "恭喜答對!往下滑看更多!";
          }, 300);
        }
      });

      fabric.Image.fromURL(require("./assets/logo.png"), function(oImg) {
        oImg.name = "arrow";
        oImg.left = box.offsetWidth / 4 - (oImg.width / 2) * scaleSize;
        oImg.top = (box.offsetHeight / 5) * 3 - (oImg.height / 2) * scaleSize;
        oImg.angle = 15;
        oImg.scale(scaleSize).set("flipX", true);
        oImg.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
          bl: false,
          br: false,
          tl: false,
          tr: false,
          mtr: false,
        });
        canvas.add(oImg);
      });

      fabric.Image.fromURL(require("./assets/logo.png"), function(oImg) {
        oImg.name = "target";
        oImg.left = (box.offsetWidth / 5) * 3 - (oImg.width / 2) * scaleSize;
        oImg.top = box.offsetHeight / 4 - (oImg.height / 2) * scaleSize;
        oImg.angle = 15;
        oImg.scale(scaleSize).set("flipX", true);
        oImg.filters.push(new fabric.Image.filters.Grayscale());
        oImg.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
          bl: false,
          br: false,
          tl: false,
          tr: false,
          mtr: false,
        });
        oImg.applyFilters();

        canvas.add(oImg);
      });
    });

    return {
      isUnlock,
      warning,
    };
  },
};
</script>

<style lang="scss">
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}
#app {
  margin: 0;
  padding: 0;
}
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
