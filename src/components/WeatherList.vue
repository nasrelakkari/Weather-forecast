<template>
  <div class="weather-list">
    <div class="weather-list__range">
      <div>
        <div class="weather-list__range__temperature">
          <p class="weather-list__range__temperature__text">min temp</p>
          <p class="weather-list__range__temperature__degree">
            {{ weatherMinTemprature }} °C
          </p>
        </div>
        <div class="weather-list__range__input">
          <input
            type="range"
            id="maxtemp"
            name="maxtemp"
            min="-10"
            max="40"
            v-model="weatherMinTemprature"
          />
        </div>
      </div>
      <div>
        <div class="weather-list__range__temperature">
          <p class="weather-list__range__temperature__text">max temp</p>
          <p class="weather-list__range__temperature__degree">
            {{ weatherMaxTemprature }} °C
          </p>
        </div>
        <div class="weather-list__range__input">
          <input
            type="range"
            id="mintemp"
            name="mintemp"
            min="-10"
            max="40"
            v-model="weatherMaxTemprature"
          />
        </div>
      </div>
    </div>

    <weather-card
      v-for="(weather, index) in weatherList"
      :key="index"
      :weather="weather"
    />
    <p class="weather-list__average">Average temp : {{ weatherAverage }}°C</p>
    <div class="weather-list__footer">
      <span
        v-if="index !== 0"
        class="weather-list__footer__button"
        @click="handlePaginate(Paginate.PREVIOUS)"
        >Previous</span
      >
      <span
        v-if="index !== 10"
        :class="[
          { 'align-button': index === 0 },
          'weather-list__footer__button',
        ]"
        @click="handlePaginate(Paginate.NEXT)"
        >Next</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import WeatherCard from "@/components/WeatherCard.vue";
import { Paginate } from "@/interface/Paginate";
import { useWeatherStore } from "@/store/weather";
import { storeToRefs } from "pinia";

const weatherStore = useWeatherStore();
const { weathers, weatherAverage } = storeToRefs(weatherStore);

const weatherMaxTemprature = ref<number>(20);
const weatherMinTemprature = ref<number>(20);
const index = ref<number>(0);

const weatherList = computed(() => {
  // Filter down to just the elements from the weathers array based on the max temprature and the min temprature
  return weathers.value.filter(
    (weather: any) =>
      weather.temp.max <= weatherMaxTemprature.value &&
      weather.temp.min <= weatherMinTemprature.value
  );
});

onMounted(async () => {
  await weatherStore.fetchWeather(index.value);
});

const handlePaginate = async (type: string) => {
  type === Paginate.NEXT
    ? (index.value = index.value + 5)
    : (index.value = index.value - 5);

  // Initialize the range values
  weatherMaxTemprature.value = 20;
  weatherMinTemprature.value = 20;

  await weatherStore.fetchWeather(index.value);
};
</script>

<style lang="scss" scoped>
.weather-list {
  max-width: 450px;
  margin: 50px auto;

  &__range {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;

    &__temperature {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      &__text {
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;
        text-transform: uppercase;
        color: #ffffff;
        margin: 0;
      }

      &__degree {
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        text-transform: uppercase;
        color: #5887ff;
        margin: 0;
      }
    }

    &__input {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(9px);
      border-radius: 110px;
      width: 100%;
      padding: 0 5px 8px 5px;

      input[type="range"]::-webkit-slider-runnable-track {
        background: #dbe5ff;
        height: 3px;
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        margin-top: -6px;
        height: 2rem;
      }
    }
  }

  &__average {
    text-align: left;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    text-transform: uppercase;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    &__button {
      color: #ffffff;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      text-transform: uppercase;
      cursor: pointer;
    }

    .align-button {
      margin-left: auto;
    }
  }
}
</style>
