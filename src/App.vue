<template>
  <div id="app">
    <Sequence :screens="getScreens" />
    <div id="debug">
      <b-button-toolbar
        key-nav
        aria-label="Toolbar with button groups"
        justify="true"
      >
        <b-button-group class="mx-1">
          <b-button @click="loadState1">
            &lsaquo;
          </b-button>
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button @click="loadState2">
            &rsaquo;
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>
  </div>
</template>

<script>
import Sequence from "./components/Sequence.vue"
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
        getScreens() {
            return this.sampleData.sequence.screens;
        }
    },
    methods: {
        loadState1() {
            this.sampleData = state1;
        },
        loadState2() {
            this.sampleData = state2;
        },
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

#debug {}
</style>
