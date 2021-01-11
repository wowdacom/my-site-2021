<template>
  <Header></Header>
  <Billboard></Billboard>
  <Home></Home>
  <About></About>
  <Footer></Footer>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
</template>

<script>
import Header from "@/components/Header";
import Billboard from "@/components/Billboard";
import Home from "@/components/Home";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Billboard,
    Home,
    About,
    Footer,
  },
  setup() {},
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
</style>
