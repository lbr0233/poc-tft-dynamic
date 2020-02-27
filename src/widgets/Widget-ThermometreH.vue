<template>
  <b-row>
    <b-col>
      <b-img :src="getFleche" fluid-grow />
    </b-col>
    <b-col>
      <b-img :src="getStopAt" alt="arret" fluid-grow />
    </b-col>
    <b-col cols="3">
      <b-img :src="getFleche" fluid width="100%" />
    </b-col>
    <b-col>
      <b-img :src="getStopAt" alt="arret" fluid-grow />
    </b-col>
    <b-col cols="3">
      <b-img :src="getFleche" fluid width="100%" />
    </b-col>
    <b-col>
      <b-img :src="getStopAt" alt="arret" fluid-grow />
    </b-col>
    <b-col cols="2">
      <b-img :src="getFleche" fluid width="100%" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "ThermoH",
  props: {
    attributes: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    getStopAt() {
      let img = require("../assets/atstop.png");
      return img;
    },
    getFleche() {
      let img = require("../assets/fleche.png");
      return img;
    }
  }
};
</script>

<style scoped>
</style>