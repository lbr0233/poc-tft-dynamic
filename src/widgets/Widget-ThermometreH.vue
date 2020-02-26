<template>
  <b-row>
    <b-col>
      <b-img src="require('../assets/fleche.png')" fluid-grow />
    </b-col>
    <b-col>
      <b-img src="require('../assets/atstop.png')" alt="arret" fluid-grow />
    </b-col>
    <b-col cols="3">
      <b-img src="require('../assets/fleche.png')" fluid-grow />
    </b-col>
    <b-col>
      <b-img src="require('../assets/atstop.png')" alt="arret" fluid-grow />
    </b-col>
    <b-col cols="3">
      <b-img src="require('../assets/fleche.png')" fluid-grow />
    </b-col>
    <b-col>
      <b-img src="require('../assets/atstop.png')" alt="arret" fluid-grow />
    </b-col>
    <b-col cols="2">
      <b-img src="require('../assets/fleche.png')" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Logo",
  props: {
    attributes: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      src: "../assets/logo.png"
    };
  },
  computed: {
    getSrc() {
      let img = require("../assets/" + this.attributes.resource);
      return img;
    },
    computeStyle() {
      console.log("computeStyle", this.attributes);
      let styles = [];
      //On a position et height/width pour ce widget
      if (this.attributes.height) {
        styles.push({ height: this.attributes.height });
      }
      if (this.attributes.position) {
        styles.push({
          float: this.attributes.position.substring(
            this.attributes.position.indexOf("-") + 1
          )
        });
      }

      console.log("styles", styles);
      return styles;
    }
  }
};
</script>

<style scoped>
</style>