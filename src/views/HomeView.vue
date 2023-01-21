<template>
  <div class="home-view">
    <h1 class="home-view__title">Weather forecast</h1>
    <p class="home-view__subtitle">Next 7 days</p>
    <weather-list />
  </div>
</template>

<script setup lang="ts">
import WeatherList from "@/components/WeatherList.vue";
</script>

<style lang="scss">
.home-view {
  &__title {
    color: #ffffff;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 10px;
  }

  &__subtitle {
    color: #5887ff;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin: 0;
  }
}
</style>
