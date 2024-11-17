<template>
  <div id="app" class="container text-center">
    <img
      class="mb-4 mx-auto"
      alt="Vue logo"
      src="https://foodlabelmaker.com/wp-content/uploads/2022/12/logo.svg"
    />
    <NutritionLabel />
  </div>
</template>

<script>
import NutritionLabel from "./components/NutritionLabel.vue";

export default {
  name: "App",
  components: {
    NutritionLabel,
  },
};
</script>
