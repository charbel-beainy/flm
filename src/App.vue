<template>
  <div class="container">
    <div id="app">
      <MainHeader />
      <NutritionLabel />
    </div>
  </div>
</template>

<script>
import NutritionLabel from "./components/NutritionLabel.vue";
import MainHeader from "./components/MainHeader.vue";

export default {
  name: "App",
  components: {
    MainHeader,
    NutritionLabel,
  },
};
</script>
