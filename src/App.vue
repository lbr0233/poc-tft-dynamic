<template>
  <div id="tft" class="tft">
    <div class="debug">
      <!-- Pour debug/demo-->
      <p>On est dans l'état : {{ journeyData.sequence.state }}</p>
      <b-button
        style="position:fixed; right:20px; top:7px"
        @click="changeState()"
      >
        Change d'état
      </b-button>
    </div>

    <sequence ref="theSequence" :sequence-props="journeyData.sequence">
      <screen
        v-for="(s, i) in journeyData.sequence.screen.slides"
        v-show="currentSlideIndex == i"
        :key="i"
        :slide-props="s"
        :screen-props="journeyData.sequence.screen"
      />
    </sequence>
  </div>
</template>

<script>
import Sequence from "./components/TheSequence.vue";
import screen from "./components/Sequence-screen.vue";

import state1 from "./assets/state_AtStop.json";
import state2 from "./assets/state_BetweenStops.json";

export default {
  name: "App",
  components: {
    Sequence,
    screen
  },
  data() {
    return {
      url: "http://HTC/tft/tft.do?pos=true",
      journeyData: state1,
      screenDuration: 10, //in seconds
      currentSlideIndex: 0
    };
  },
  mounted() {
    // console.log("mounted ");
    this.initSequencer();
  },
  destroyed() {
    console.log("destroyed ");
    clearInterval(this.t);
    this.t = NaN;
  },
  methods: {
    initSequencer() {
      if (!this.t) {
        this.currentSlideIndex = 0;
        this.t = setInterval(this.changeScreen, this.screenDuration * 1000);
      }
    },
    changeScreen(s) {
      //   console.log("CALLINGchangeScreen ", s);
      if (typeof s === "number") {
        this.currentSlideIndex = s;
      } else {
        this.currentSlideIndex++;
        if (
          this.currentSlideIndex >=
          this.journeyData.sequence.screen.slides.length
        ) {
          this.currentSlideIndex = 0;
        }
      }
      //   console.log("changeScreen ", this.currentSlideIndex);
    },
    loadNextState() {
      console.log("CALLING loadNextState", this.journeyData.sequence.state);
      //On devrait faire si state n chargé alors charger state n+1
      //Mais pas pour le POC
      if (this.journeyData.sequence.state === 0) {
        //On est dans le state 1 on charge le 2
        // console.log(state2.sequence.state);
        this.journeyData = state2;
      } else {
        // if(this.journeyData.sequence.state === 1){
        //on est dans le state 2 on revient au 1
        //  console.log(state1.sequence.state);
        this.journeyData = state1;
      }
      this.currentSlideIndex = 0;
      console.log("after loadNextState", this.journeyData.sequence.state);
    },
    changeState() {
      console.log("CALLINGchangeState ");
      this.loadNextState();
    }
  }
};
</script>
<style>
body,
html {
  min-height: 100vh;
  overflow: hidden;
}
</style>
<style scoped>
.tft {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  border: 3px solid red;
  margin: 2px;
}

.debug {
  background-color: antiquewhite;
  /* position: absolute; */
  /* bottom: 0; */
  width: 100%;
  border: 3px dotted red;
}
</style>
