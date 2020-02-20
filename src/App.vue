<template>
  <div
    id="tft"
    class="container-fluid tft"
  >
    <sequence
      ref="theSequence"
      class="row"
      :sequence-prop="sampleData.sequence"
    />
  </div>
</template>

<script>
import Sequence from "./components/TheSequence.vue"
import state1 from "./assets/state_AtStop.json";
import state2 from "./assets/state_BetweenStops.json";

export default {
    name: "App",
    components: {
        Sequence
    },
    data() {
        return {
            url: "http://HTC/tft/tft.do?pos=true",
            sampleData: state1
        };
    },
    computed: {
        isState0() { return this.sampleData.sequence.state === 0 },
        isState1() { return this.sampleData.sequence.state === 1 }
    },
    methods: {
        loadState1() {
            this.sampleData = state1;
            this.$refs.theSequence.changeScreen(0);
        },
        loadState2() {
            this.sampleData = state2;
            this.$refs.theSequence.changeScreen(0);
        },
        loadNextState(){
          //On devrait faire si state n chargé alors charger state n+1
          //Mais pas pour le POC
          if(this.sampleData.sequence.state === 0){
            //On est dans le state 1 on charge le 2
            this.sampleData = state2;
          }
          if(this.sampleData.sequence.state === 1){
            //on est dans le state 2 on revient au 1
            this.sampleData = state1;
          }
        }
    }
}
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
    margin:2px;
}

#debug {
    background-color: antiquewhite;
    position: absolute;
    bottom: 0;
    width: 100%;
    border: 3px dotted red;
}
</style>
