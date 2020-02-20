<template>
  <transition
    name="screen"
  >
    <div
      class="screen"
      :class="computeClass"
      :style="computeStyle"
    >
      <p>{{ screenProps.name }}</p>
      <div
        v-for="c in screenProps.components"
        :key="c.name"
      >
        <screen-component :item-props="c" />
      </div>
    </div>
  </transition>
</template>

<script>
/*
{
  "name": "screen Interarret : prochain arret",
  "size": "full",
  "transitionIN": "fadeIN",
  "transitionOUT": "fadeOUT",
  "bg": { "color": "#00000", "picture": "bg.png" },
  "components": [
    { "name": "clock", "size": "30pt", "position": "top-right" },
    {
      "name": "logo-cg",
      "size": "30pt",
      "position": "bottom-right",
      "resource": "logo1.png"
    },
    {
      "name": "logo-cie",
      "size": "30pt",
      "position": "bottom-left",
      "resource": "logo2.png"
    },
    {
      "name": "text",
      "position": "middle"
    }
  ]
}
*/
import ScreenComponent from "./Screen-component.vue"
export default {
    name: "SequenceScreen",
    components: {
        ScreenComponent
    },
    props: {
        screenProps: { type: Object, default: function() { return {} } }
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
            console.log("computeStyle", this.screenProps)
            let styles = [];
            if (this.screenProps.bg) {
                console.log("if this.screenProps.bg", this.screenProps.bg)
                styles.push({ backgroundColor: this.screenProps.bg.color });
                if (this.screenProps.bg.picture) {
                    //Syntaxe avec un serveur qui sert les images :
                    // styles.push({ background: "url(" + this.screenProps.bg.picture + ")  no-repeat center fixed" });
                    styles.push({ background: "url(" + require("@/assets/" + this.screenProps.bg.picture) + ")   no-repeat center/100% fixed" });
               }
            } else {
                console.log("else this.screenProps.bg", this.screenProps.bg)
            }
            console.log("styles", styles);
            return styles;
        }

    }
}
</script>

<style scoped>
.screen {
    background-color: aquamarine;
    width: 100%;
    height: 100%;
    border: 2px solid blue;
    margin: 2px;
}
.screen-appear-active-class,
.screen-enter-active,
.screen-leave-active {
    transition: opacity 1s;
}

.screen-appear-class,
.screen-enter,
.screen-leave-to {
    opacity: 0;
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