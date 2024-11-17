<template>
  <div class="row">
    <div id="label" class="col-lg-4 col-md-6 col-10 mx-auto border py-2">
      <h2 class="text-capitalize mb-0">Nutrition Facts</h2>
      <hr class="my-1" />

      <LabelHeader
        :subTitle="label.amounts.number_of_servings + ' serving per container'"
        serving="Serving Size"
        :value="label.amounts.serving + 'g'"
      />

      <div class="border-separator my-2"></div>

      <LabelHeader
        subTitle="amount per serving"
        serving="calories"
        :value="Math.round(label.serving.Calories.value)"
        bigFont="true"
      />

      <div class="border-separator-smaller my-2"></div>
      <div class="label-body">
        <p class="text-capitalize text-end fw-bold">
          % daily value <sup>*</sup>
        </p>
        <hr class="my-1" />

        <template>
          <div
            v-for="(nutrients, section) in groupedAndSortedNutrients"
            :key="section"
          >
            <div v-if="section === '1'">
              <div class="border-separator-smaller my-2"></div>
            </div>

            <div v-for="(nutrient, index) in nutrients" :key="index">
              <LabelData
                v-if="selectedNutrients.includes(nutrient.name)"
                :name="nutrient.name"
                :value="Math.round(nutrient.value)"
                :unit="nutrient.unit?.name || 'g'"
                :daily_value="
                  Math.round(label.daily_value[nutrient.name]) || ''
                "
                :indentation="nutrient.indentations > 0"
              />
            </div>
          </div>
        </template>

        <div class="border-separator-smaller my-2"></div>
        <p class="text-start fw-medium">
          <sup>*</sup> The % Daily Value (DV) tells you how much a nutrient in a
          serving of food contributes to a daily diet. 2,000 calories a day is
          used for general nutrition advice.
        </p>
      </div>
    </div>

    <div id="cms" class="col-lg-5 col-md-6 col-10 mx-auto mt-lg-0 mt-3">
      <div class="row mb-3">
        <h3>Select Nutrients to Display</h3>

        <div
          class="col-md-6 col-10 mx-auto text-start"
          v-for="(nutrients, section) in groupedNutrientsBySection"
          :key="section"
        >
          <h5 class="mt-lg-0 mt-3">Section {{ section }}</h5>
          <hr class="my-1" />
          <div v-for="(nutrient, index) in nutrients" :key="index">
            <label>
              <input
                type="checkbox"
                v-model="selectedNutrients"
                :value="nutrient.name"
              />
              {{ nutrient.name }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LabelHeader from "./LabelHeader.vue";
import LabelData from "./LabelData.vue";

export default {
  name: "NutritionLabel",
  components: {
    LabelHeader,
    LabelData,
  },

  data() {
    return {
      label: null,
      selectedNutrients: [],
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get("/jsons/response.json");
        this.label = response.data.label;
        this.initializeSelectedNutrients();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    initializeSelectedNutrients() {
      this.selectedNutrients = this.availableNutrients
        .filter((nutrient) => nutrient.enabled === 1)
        .map((nutrient) => nutrient.name);
    },
  },

  computed: {
    availableNutrients() {
      if (!this.label || !this.label.serving) return [];
      return Object.values(this.label.serving);
    },

    groupedAndSortedNutrients() {
      const grouped = {};
      Object.values(this.label.serving).forEach((nutrient) => {
        const section = nutrient.section || "0";
        if (!grouped[section]) {
          grouped[section] = [];
        }
        grouped[section].push(nutrient);
      });

      Object.keys(grouped).forEach((section) => {
        grouped[section] = grouped[section].sort((a, b) => a.order - b.order);
      });

      return grouped;
    },

    groupedNutrientsBySection() {
      const grouped = {};

      this.availableNutrients.forEach((nutrient) => {
        const section =
          nutrient.section === 0
            ? 1
            : nutrient.section === 1
            ? 2
            : nutrient.section;
        if (!grouped[section]) {
          grouped[section] = [];
        }
        grouped[section].push(nutrient);
      });

      Object.keys(grouped).forEach((section) => {
        grouped[section] = grouped[section].sort((a, b) => a.order - b.order);
      });

      return grouped;
    },
  },
};
</script>
