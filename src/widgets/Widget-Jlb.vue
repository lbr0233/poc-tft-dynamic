<template>
  <div>
    <h1 v-if="hasTitle">
      {{ attributes.title }}
    </h1>
    <div class="defileParent">
      <span data-text="attributes.text" class="defile" :style="getFontSize">
        {{ attributes.text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Jlb",
  props: {
    attributes: {
      type: Object,
      default: function() {
        return { text: "pas de texte :(" };
      }
    }
  },
  computed: {
    getFontSize() {
      console.log("font-size:" + this.attributes.fontSize, this.attributes);
      return "font-size:" + this.attributes.fontSize;
    },
    hasTitle() {
      return "title" in this.attributes;
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 10rem;
}
.defileParent {
  /* display: block; */
  margin: 3em auto;
  /* overflow: hidden; */
  position: relative;
  table-layout: fixed;
  width: 400%;
}
.defile {
  /* display: block; */
  animation: linear marqueelike 10s infinite;
  margin-left: -100%;
  padding: 0 5px;
  text-align: left;
  /* height: 25px; */
}
@keyframes marqueelike {
  0%,
  100% {
    margin-left: 0;
  }
  99.99% {
    margin-left: -100%;
  }
}
</style>