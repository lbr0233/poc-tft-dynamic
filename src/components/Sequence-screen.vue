<template>
  <transition name="slide">
    <div class="screen" :class="computeClass" :style="computeStyle">
      <p>{{ screenProps.name }}</p>
      <component
        :is="c.name"
        v-for="(c, index) in screenProps.components"
        :key="index"
        :attributes="c"
      />
    </div>
  </transition>
</template>

<script>
import logo from "../widgets/Widget-Logo.vue";

export default {
  name: "SequenceScreen",
  components: {
    logo,
    Clock: () => require("../widgets/Widget-Clock.vue") //,
    // Logo: () => require("../widgets/Widget-Logo.vue")
  },
  props: {
    screenProps: {
      type: Object,
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
      console.log("computeStyle", this.screenProps);
      let styles = [];
      if (this.screenProps.bg) {
        console.log("if this.screenProps.bg", this.screenProps.bg);
        styles.push({ backgroundColor: this.screenProps.bg.color });
        if (this.screenProps.bg.picture) {
          //Syntaxe avec un serveur qui sert les images :
          // styles.push({ background: "url(" + this.screenProps.bg.picture + ")  no-repeat center fixed" });
          styles.push({
            background:
              "url(" +
              require("@/assets/" + this.screenProps.bg.picture) +
              ")   no-repeat center/100% fixed"
          });
        }
      } else {
        console.log("else this.screenProps.bg", this.screenProps.bg);
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
  width: 100%;
  height: 100%;
  border: 2px solid blue;
  margin: 2px;
}

.slide-enter-active {
  animation: slideIn 5s;
}

.slide-leave-active {
  animation: slideOut 5s;
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
  height: 100%;
  width: 100%;
}

.halfscreen {
  height: 100%;
  width: 50%;
}
</style>