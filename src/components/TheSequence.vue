<template>
  <div
    class="sequence"
  >
    <p>On est dans l'état : {{ sequenceProp.state }}</p>
    <b-button
      style="position:fixed; right:20px; top:12px"
      @click="changeState()"
    >
      >
    </b-button>

    <screen :screen-props="currentScreen" />
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
        },
        changeState(){
            console.log("CALLINGchangeState ");
            this.$parent.loadNextState();
        }
    }
}
</script>

<style scoped>
.sequence {
    background-color: aqua;
    width: 100%;
    height: 100%;
    border: 3px solid green;
    margin: 2px;
}

</style>