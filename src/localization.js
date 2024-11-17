import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    nutritionFacts: "Nutrition Facts",
    nutritionDisplay: "Select Nutrients to Display",
    section: "Section",
    calories: "calories",
    amountPerServing: "amount per serving",
    dailyValue: "% daily value",
    servingSize: "Serving Size",
    perContainer: "serving per container",
    g: "g",
    disclaimer:
      "The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.",
  },
  ar: {
    nutritionFacts: "حقائق التغذية",
    nutritionDisplay: "اختر العناصر الغذائية للعرض",
    section: "القسم",
    calories: "السعرات الحرارية",
    amountPerServing: "القيمة لكل حصة",
    dailyValue: "% النسبة المئوية",
    servingSize: "حجم الحصة",
    perContainer: "عدد الحصص",
    g: "ج",
    disclaimer:
      " تخبرك النسبة المئوية للقيمة اليومية بمقدار العناصر الغذائية فى حصة الطعام التى تساهم فى نظام الغذاء",
  },
};

const localization = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

Vue.prototype.$locale = localization.locale;

export default localization;
