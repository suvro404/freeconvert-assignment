<template>
  <div id="app">
    <b-container>
      <div v-if="weatherData" class="d-flex justify-content-center">
        <div id="data-container" class="px-4 py-4">
          <div>
            {{getCurrentDate()}}
          </div>
          <div v-if="weatherData.name" class="text-title">
            {{weatherData.name.toUpperCase()}}
          </div>
          <div v-if="weatherData.weather">
<!--            showing only the first item of the array for the sake of design!-->
            <div v-for="weather in weatherData.weather.slice(0,1)" :key="weather.id">
              <div>{{weather.description.toUpperCase()}}</div>
              <img :src="weather.icon" class="weather-icon" alt="Weather Icon" />
            </div>
          </div>
          <div>
            <b-row class="mb-2">
              <b-col v-if="weatherData.main.humidity">
                <div class="text-sub-title">Humidity</div>
                <div>{{weatherData.main.humidity}} %</div>
              </b-col>
              <b-col v-if="weatherData.main.pressure">
                <div class="text-sub-title">Pressure</div>
                <div>{{weatherData.main.pressure}} mph</div>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col v-if="weatherData.main.temp_max">
                <div class="text-sub-title">Temp (Max)</div>
                <div>{{weatherData.main.temp_max}} °C</div>
              </b-col>
              <b-col v-if="weatherData.main.temp_min">
                <div class="text-sub-title">Temp (Min)</div>
                <div>{{weatherData.main.temp_min}} °C</div>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
      <div v-if="!loading && !weatherData">
        No weather data of your current location can be shown! Please make sure you allowed the browser to share your current location.
      </div>
      <div class="mt-4">
        <div>You called Weather API : <b>{{apiCallingTimes}}</b> times.</div>
        <div>Refresh this page to get updated data.</div>
      </div>
      <div v-if="locUnsupported">Geolocation is not supported by this browser.</div>
      <div v-if="loading">
        <b-spinner variant="primary" style="width: 4rem; height: 4rem;"></b-spinner>
        <div class="text-sub-title">
          Loading ....
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      locUnsupported: false,
      weatherData: null,
      loading: false
    }
  },
  computed: {
    apiCallingTimes: {
      get() {
        return this.$store.state.fcassignment.apiCallingTimes;
      },
      set(value) {
        this.$store.commit("fcassignment/changeApiCallingTimes", value);
      }
    }
  },
  beforeMount() {
    this.resetAll();
  },
  mounted() {
    this.init();
  },
  methods: {
    getCurrentDate() {
      const date = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString("en-US", options);
    },
    getUserLocation() {
      if (navigator.geolocation) {
        return new Promise(function(resolve, reject) {
          navigator.geolocation.getCurrentPosition(function (pos) {
            let latitude = pos.coords.latitude;
            let longitude = pos.coords.longitude;
            resolve({latitude, longitude});
          });
        });
      } else {
        this.locUnsupported = true;
      }
    },
    resetAll() {
      this.locUnsupported = false;
      this.weatherData = null;
      this.loading = false;
    },
    getWeatherData(userLoc) {
      this.loading = true;
      this.$api.query(userLoc,
          (response) => {
            console.log(response);
            this.weatherData = response;
            this.loading = false;
            this.$store.commit("fcassignment/changeApiCallingTimes", 1);
          },
          (error) => {
            console.log(error);
            this.loading = false;
          }
      );
    },
    async init() {
      try {
        let userLoc = await this.getUserLocation();
        let reqData = "lat=" + userLoc.latitude + "&" + "lon=" + userLoc.longitude;
        this.getWeatherData(reqData);
      } catch (err) {
        console.log(err);
      }

    }
  }
}
</script>
<style scoped>
  #data-container {
    border-radius: 50px;
    background-image: linear-gradient(#30A2C5, #00242F);
    max-width: 350px;
    min-width: 300px;
    color: #FFFFFF;
  }
  .weather-icon {
    width: 100px;
    height: 100px;
  }
</style>
