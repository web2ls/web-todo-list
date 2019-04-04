<template>
  <div id="app">
    <div class="container">
        <header>to do it now!</header>
        <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  }
};
</script>


<style lang="scss">
body {
  background: #f5f5f5;
}

.container {
  width: 75%;
  margin: 20px auto 0;

  & header {
      font-size: 18px;
      font-weight: 400;
      letter-spacing: 1px;
      text-transform: uppercase;
  }
}

#app {
  font-family: "Roboto Slab", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
