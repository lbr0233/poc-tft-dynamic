<template>
  <transition :name="screenProps.transition" mode="out-in">
    <div class="screen" :class="computeClass" :style="computeStyle">
      <p>{{ slideProps.name }}</p>
      <component
        :is="c.name"
        v-for="(c, index) in slideProps.components"
        :key="index"
        :attributes="c"
      />
    </div>
  </transition>
</template>

<script>
import jlb from "../widgets/Widget-Jlb.vue";
import thermoH from "../widgets/Widget-ThermometreH.vue";
import diaporama from "../widgets/Widget-Diaporama.vue";

export default {
  name: "SequenceScreen",
  components: { jlb, thermoH, diaporama },
  props: {
    screenProps: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
    slideProps: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    computeClass() {
      let classe = [];
      if (this.screenProps.size === "full") {
        classe.push("fullscreen");
      } else {
        classe.push("halfscreen");
      }
      return classe;
    },
    computeStyle() {
      console.log("computeStyle", this.slideProps);
      let styles = [];
      if (this.slideProps.bg) {
        console.log("if this.screenProps.bg", this.slideProps.bg);
        styles.push({ backgroundColor: this.slideProps.bg.color });
        if (this.slideProps.bg.picture) {
          //Syntaxe avec un serveur qui sert les images :
          // styles.push({ background: "url(" + this.screenProps.bg.picture + ")  no-repeat center fixed" });
          styles.push({
            background:
              "url(" +
              require("@/assets/" + this.slideProps.bg.picture) +
              ")   no-repeat center/50% fixed"
          });
        }
      } else {
        console.log("else this.slideProps.bg", this.slideProps.bg);
      }
      console.log("styles", styles);
      return styles;
    }
  }
};
</script>

<style scoped>
.screen {
  background-color: aquamarine;
  /* width: 100%;
  height: 100%; */
  border: 2px solid blue;
  margin: 2px;
  flex: 1 1 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
  position: absolute;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-enter-active {
  animation: slideIn 5s;
}

.slide-leave-active {
  animation: slideOut 5s;
  position: absolute;
  /* top: 0;
  left: 0; */
  height: 60%;
  flex-shrink: 1;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.fullscreen {
  /* height: 100%; */
  width: 100%;
}

.halfscreen {
  /* height: 100%; */
  width: 50%;
}
</style>
