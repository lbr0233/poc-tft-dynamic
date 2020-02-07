/* eslint-disable no-console */
<template>
  <div
    class="sequence,container-fluid"
  >
    <p>Etat : {{ sequenceProp.state }}</p>
    <transition
      name="screen"
    >
      <div>
        <screen :screen-props="currentScreen" />
      </div>
    </transition>
  </div>
</template>

<script>
import screen from "./Sequence-screen.vue"

export default {
    name: "TheSequence",
    components: {
        screen
    },
    props: {
        sequenceProp: { type: Object, default: function() { return {} } }
    },
    data() {
        return {
            t: NaN,
            screenDuration: 10, //in seconds
            currentScreenIndex: 0,
            currentScreen: {}
        }
    },
    mounted() {
        console.log("mounted ");
        this.initSequencer();
    },
    // updated() {
    //     console.log("updated ");
    //     this.initSequencer();
    // },
    destroyed() {
        clearInterval(this.t);
        this.t = NaN;
    },
    methods: {
        initSequencer() {
            if (!this.t) {
                this.currentScreen = this.sequenceProp.screens[0];
                this.t = setInterval(this.changeScreen, this.screenDuration * 1000);
            }
        },
        changeScreen(s) {
            console.log("CALLINGchangeScreen ", s);
            if (typeof s === "number") {
                this.currentScreenIndex = s;
            } else {
                this.currentScreenIndex++;
                if (this.currentScreenIndex >= this.sequenceProp.screens.length) {
                    this.currentScreenIndex = 0;
                }
            }
            this.currentScreen = this.sequenceProp.screens[this.currentScreenIndex];
            console.log("changeScreen ", this.currentScreenIndex, this.currentScreen);
        }
    }
}
</script>

<style scoped>
.sequence {
    border-color: black;
    border-width: thick;
    background-color: aqua;
    width: 100%;
    height: 100%;
    border: 1px solid green;
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

</style>