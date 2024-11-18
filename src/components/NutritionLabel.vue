<template>
  <div class="row d-flex justify-content-center">
    <div id="label" class="col-lg-4 col-md-6 col-10 mx-auto border py-2">
      <h2 class="text-capitalize text-center mb-0">
        {{ $t("nutritionFacts") }}
      </h2>
      <hr class="my-1" />

      <LabelHeader
        :subTitle="label.amounts.number_of_servings + ' ' + $t('perContainer')"
        :serving="$t('servingSize')"
        :value="label.amounts.serving + 'g'"
      />

      <div class="border-separator my-2"></div>

      <LabelHeader
        :subTitle="$t('amountPerServing')"
        :serving="$t('calories')"
        :value="Math.round(label.serving.Calories.value)"
        bigFont="true"
      />

      <div class="border-separator-smaller my-2"></div>
      <div class="label-body">
        <p class="text-capitalize text-end fw-bold">
          {{ $t("dailyValue") }} <sup>*</sup>
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
                :name="
                  $i18n.locale === 'ar' && nutrient.name_ar
                    ? nutrient.name_ar
                    : nutrient.name
                "
                :value="Math.round(nutrient.value)"
                :unit="
                  $i18n.locale === 'ar' && nutrient.unit?.name_ar
                    ? nutrient.unit?.name_ar
                    : nutrient.unit?.name || $t('g')
                "
                :daily_value="
                  Math.round(label.daily_value[nutrient.name]) || ''
                "
                :indentation="nutrient.indentations > 0"
              />
            </div>
          </div>
        </template>

        <div class="border-separator-smaller my-2"></div>
        <p class="text-start fw-medium"><sup>*</sup> {{ $t("disclaimer") }}</p>
      </div>
    </div>

    <div id="cms" class="col-lg-5 col-md-6 col-10 mx-auto mt-lg-0 mt-3">
      <div class="row mb-3">
        <h3 class="text-center">{{ $t("nutritionDisplay") }}</h3>

        <div
          class="col-md-6 col-10 mx-auto text-start"
          v-for="(nutrients, section) in groupedNutrientsBySection"
          :key="section"
        >
          <h5 class="mt-lg-0 mt-3">{{ $t("section") }} {{ section }}</h5>
          <hr class="my-1" />
          <div v-for="(nutrient, index) in nutrients" :key="index">
            <label>
              <input
                type="checkbox"
                v-model="selectedNutrients"
                :value="nutrient.name"
              />
              {{
                $i18n.locale === "ar" && nutrient.name_ar
                  ? nutrient.name_ar
                  : nutrient.name
              }}
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
    changeLanguage(locale) {
      this.$i18n.locale = locale;
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
