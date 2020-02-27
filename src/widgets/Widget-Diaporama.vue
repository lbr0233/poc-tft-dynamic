<template>
  <!-- <b-carousel fade img-width="100%" img-height="100%" :interval="3000">
    <b-carousel-slide
      :img-src="getSrc(i)"
      v-for="(p, i) in attributes.photos"
      :key="i"
    />
  </b-carousel> -->
  <div class="carousel">
    <b-img
      v-show="currentPhotoIndex == i"
      :src="getSrc(i)"
      v-for="(p, i) in attributes.photos"
      :key="i"
      fluid
    />
  </div>
</template>

<script>
export default {
  name: "Diaporama",
  props: {
    attributes: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return { currentPhotoIndex: 0, duration: 5, t: undefined };
  },
  mounted() {
    // console.log("mounted ");
    this.initSequencer();
  },
  destroyed() {
    console.log("destroyed ");
    clearInterval(this.t);
    this.t = undefined;
  },
  methods: {
    getSrc(photo) {
      let img = require("../assets/" + this.attributes.photos[photo]);
      return img;
    },
    initSequencer() {
      if (!this.t) {
        this.currentPhotoIndex = 0;
        this.t = setInterval(this.nextPhoto, this.duration * 1000);
      }
    },
    nextPhoto() {
      this.currentPhotoIndex++;
      if (this.currentPhotoIndex >= this.attributes.photos.length) {
        this.currentPhotoIndex = 0;
      }
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
  /* object-fit: contain; */
  flex: 1;
}
.carousel {
  height: 100%;
  /* display: flex; */
  /* flex-direction: column;
  justify-content: space-between;
  align-items: stretch; */
  flex: 1 1 0;
}
</style>