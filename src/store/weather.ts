import { defineStore } from "pinia";

interface StateTree {
  weathers: any[];
}

const state: () => StateTree = () => ({
  weathers: [],
});

export const useWeatherStore = defineStore("WeatherStore", {
  state,
  getters: {
    weatherAverage(): number {
      let average = 0;
      for (const weather of this.weathers) {
        average = (weather.temp.min + weather.temp.max) / 2 + average;
      }
      // Return the value of the average number rounded to the nearest integer
      return Math.round(average / this.weathers.length);
    },
  },
  actions: {
    async fetchWeather(index: number) {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=paris&cnt=15&units=metric&appid=${process.env.VUE_APP_WEATHER_API_KEY}`;
        const res = await fetch(url);
        const weatherList = await res.json();

        this.weathers = weatherList.list
          .map((weather: any) => {
            // Change the date from to UTC format
            weather.dt = new Date(weather.dt * 1000).toUTCString();
            return weather;
          })
          .slice(index, index + 5);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
