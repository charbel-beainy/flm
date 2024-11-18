<template>
  <div
    class="d-flex justify-content-between align-items-center flex-md-row flex-column p-3 mb-2"
  >
    <a href="https://foodlabelmaker.com/" target="_blank"
      ><img
        class="img img-fluid"
        alt="FLM logo"
        src="https://foodlabelmaker.com/wp-content/uploads/2022/12/logo.svg"
    /></a>
    <div>
      <template>
        <div class="dropdown">
          <button
            class="btn btn-success dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ $i18n.locale === "ar" ? "العربية" : "English" }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button @click="changeLanguage('en')" class="dropdown-item">
              Switch to English
            </button>
            <button @click="changeLanguage('ar')" class="dropdown-item">
              Switch to Arabic
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  methods: {
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    },
  },

  mounted() {
    document.documentElement.setAttribute("lang", this.$i18n.locale);

    document.documentElement.setAttribute(
      "dir",
      this.$i18n.locale === "ar" ? "rtl" : "ltr"
    );
  },

  watch: {
    "$i18n.locale"(newLang) {
      document.documentElement.setAttribute("lang", newLang);
      document.documentElement.setAttribute(
        "dir",
        newLang === "ar" ? "rtl" : "ltr"
      );
    },
  },
};
</script>
