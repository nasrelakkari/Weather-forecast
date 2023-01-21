<template>
  <div class="weather-card">
    <img
      v-if="weather.weather[0].icon"
      class="weather-card__icon"
      :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
    />
    <div class="weather-card__date">
      <p class="weather-card__date__day">{{ weather.dt.substr(0, 3) }}.</p>
      <p class="weather-card__date__week-day">
        {{ weather.dt.substr(5, 2) }}
      </p>
      <p class="weather-card__date__month">
        {{ weather.dt.substr(8, 3) }}
      </p>
    </div>

    <div class="weather-card__temperature">
      <div class="weather-card__temperature__text">
        <span>min temp</span>
        <span>max temp</span>
      </div>
      <div class="weather-card__temperature__degree">
        <span>{{ roundNumber(weather.temp.min) }} °C</span>
        <span>{{ roundNumber(weather.temp.max) }} °C</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  weather: any;
}>();

// Return the value of the number rounded to the nearest integer
const roundNumber = (number: number) => {
  return Math.round(number);
};
</script>

<style lang="scss" scoped>
.weather-card {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(9px);
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  width: 100%;

  &__icon {
    width: 80px;
  }

  &__date {
    font-weight: 700;
    margin-left: 20px;

    &__day {
      font-size: 16px;
      line-height: 19px;
      text-transform: lowercase;
      margin: 0;
    }

    &__week-day {
      font-size: 30px;
      line-height: 36px;
      margin: 0;
    }

    &__month {
      font-size: 16px;
      line-height: 19px;
      text-transform: lowercase;
      margin: 0;
    }
  }

  &__temperature {
    margin-left: auto;
    display: flex;
    align-items: center;

    &__text {
      margin-right: 80px;
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      text-transform: uppercase;
      display: flex;
      flex-direction: column;
      text-align: left;
      gap: 12px;
    }

    &__degree {
      margin-right: 20px;
      color: #5887ff;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  }
}
</style>
