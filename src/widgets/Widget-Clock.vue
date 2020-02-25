<template>
  <b-col class="clock" :style="getStyle">
    <p>
      {{ timestamp }}
    </p>
  </b-col>
</template>

<script>
export default {
  name: "Clock",
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
      timestamp: "00:00"
    };
  },
  computed: {
    getStyle() {
      let styles = [];
      if (this.attributes.fontSize) {
        styles.push({ fontSize: this.attributes.fontSize });
      }
      //   if (this.attributes.position) {
      //     styles.push({
      //       float: this.attributes.position.substring(
      //         this.attributes.position.indexOf("-") + 1
      //       )
      //     });
      //   }
      return styles;
    }
  },
  mounted() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    getNow() {
      const today = new Date();
      const timM = today.getMinutes();
      const timH = today.getHours();
      const time =
        (timH < 10 ? "0" + timH : timH) + ":" + (timM < 10 ? "0" + timM : timM);
      this.timestamp = time;
    }
  }
};
</script>

<style scoped>
.clock {
  background-color: black;
  border: 2px solid blue;
  color: yellow;
  margin: 2px;
}
</style>