<template>
  <div>
    <p class="text-capitalize text-start mb-0">{{ subTitle }}</p>

    <h3
      v-if="bigFont"
      class="d-flex justify-content-between text-capitalize mb-0 fw-bolder"
    >
      <span>{{ serving }}</span
      ><span class="fs-2">{{ value }}</span>
    </h3>

    <h5
      v-else
      class="d-flex justify-content-between text-capitalize mb-0 fw-bolder"
    >
      <span>{{ serving }}</span
      ><span>{{ value }}</span>
    </h5>
  </div>
</template>
<script>
export default {
  name: "LabelHeader",
  props: {
    subTitle: String,
    serving: String,
    value: String,
    bigFont: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
