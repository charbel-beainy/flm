<template>
  <div>
    <p
      v-if="indentation"
      class="text-capitalize d-flex justify-content-between ms-3"
    >
      <span class="d-flex"
        >{{ name }} <span>{{ value }}{{ unit }}</span></span
      >
      <span v-if="daily_value">{{ daily_value }}%</span>
    </p>

    <p v-else class="text-capitalize d-flex justify-content-between">
      <span class="fw-bold d-flex"
        >{{ name }}
        <span class="fw-normal"
          >{{ value }} <bdi>{{ unit }}</bdi></span
        ></span
      >
      <span v-if="daily_value">{{ daily_value }}%</span>
    </p>
    <hr class="my-1" />
  </div>
</template>

<script>
export default {
  name: "LabelData",
  props: {
    name: String,
    value: Number,
    unit: String,
    daily_value: Number,
    indentation: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
