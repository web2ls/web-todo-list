<template>
  <div id="app">
    <div class="container">
        <header>
          <router-link to="/">to do it now!</router-link>
          </header>
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

      & a {
        color: #2c3e50;
        text-decoration: none;
      }
  }
}

#app {
  font-family: "Roboto Slab", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media screen and (max-width: 768px) {
  .container {
    width: 100%;
  }      
}
</style>
