<template>
  <div id="app" class="Site">
    <Header :key="$route.fullPath" />
    <span style="padding-bottom: 30px"></span>
    <main class="Site-content container">
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<style lang="scss">
@import "~bootstrap/scss/bootstrap-grid";
@import "~bulma/css/bulma.min.css";
@import "~bulma-extensions/dist/css/bulma-extensions.min.css";
.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.Site-content {
  flex: 1;
}

.space-top {
  padding-top: 50px;
}

  .error {
    padding: 0.8rem;
    margin-top: 0.8rem;
    display: block;
    background: #ef2e55;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    color: #fff;
  }
</style>
<script>
  import Vue from "vue"
  import Header from "./components/includes/Header";
  import Footer from "./components/includes/Footer";
  import BulmaExtension from "bulma-extensions/dist/js/bulma-extensions.min"
  Vue.use(BulmaExtension);
  export default {
    components: {
      Footer,
      Header,
    },
  }

</script>