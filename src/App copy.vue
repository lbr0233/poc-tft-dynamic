<template>
  <div
    id="tft"
    class="tft"
  >
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

    <sequence
      ref="theSequence"
      :nb-header-widgets="getNbHeaderWidgets"
      :nb-footer-widgets="getNbFooterWidgets"
      :nb-default-widgets="getNbDefaultWidgets"
    >
      <template v-slot:header>
        <component
          :is="c.name"
          v-for="(c, index) in getHeaderWidgets"
          :key="index"
          :attributes="c"
        />
      </template>
      <screen
        v-for="(s, i) in journeyData.sequence.screens"
        v-show="currentScreenIndex == i"
        :key="s.name"
        :screen-props="s"
      />
      <template v-slot:footer>
        <component
          :is="c.name"
          v-for="(c, index) in getFooterWidgets"
          :key="index"
          :attributes="c"
        />
      </template>
    </sequence>
  </div>
</template>

<script>
import Sequence from "./components/TheSequence.vue";
import screen from "./components/Sequence-screen.vue";
import clock from "./widgets/Widget-Clock.vue";
import logo from "./widgets/Widget-Logo.vue";

import state1 from "./assets/state_AtStop.json";
import state2 from "./assets/state_BetweenStops.json";

export default {
  name: "App",
  components: {
    Sequence,
    screen,
    clock,
    logo
  },
  data() {
    return {
      url: "http://HTC/tft/tft.do?pos=true",
      journeyData: state1,
      screenDuration: 10, //in seconds
      currentScreenIndex: 0
    };
  },
  computed: {
    getHeaderWidgets() {
      return this.journeyData.sequence.components.filter(c => {
        console.log(c);
        if (c.position && c.position.toLowerCase().startsWith("header-")) {
          return c;
        }
      });
    },
    getNbHeaderWidgets() {
      return this.getHeaderWidgets.length;
    },
    getFooterWidgets() {
      return this.journeyData.sequence.components.filter(c => {
        console.log(c);
        if (c.position && c.position.toLowerCase().startsWith("footer-")) {
          return c;
        }
      });
    },
    getNbFooterWidgets() {
      return this.getFooterWidgets.length;
    },
    getDefaultWidgets() {
      return this.journeyData.sequence.components.filter(c => {
        if (
          c.position &&
          !c.position.toLowerCase().startsWith("footer-") &&
          !c.position.toLowerCase().startsWith("header-")
        ) {
          return c;
        }
      });
    },
    getNbDefaultWidgets() {
      return this.getDefaultWidgets.length;
    }
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
        this.currentScreenIndex = 0;
        this.t = setInterval(this.changeScreen, this.screenDuration * 1000);
      }
    },
    changeScreen(s) {
      //   console.log("CALLINGchangeScreen ", s);
      if (typeof s === "number") {
        this.currentScreenIndex = s;
      } else {
        this.currentScreenIndex++;
        if (
          this.currentScreenIndex >= this.journeyData.sequence.screens.length
        ) {
          this.currentScreenIndex = 0;
        }
      }
      //   console.log("changeScreen ", this.currentScreenIndex);
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
      this.currentScreenIndex = 0;
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
  height: 100%;
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
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 3px solid red;
  height: 100%;
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
