<template>
  <div
    id="app"
    class="container-fluid"
  >
    <div class="row tft">
      <sequence
        ref="theSequence"
        class="col-xl"
        :sequence-prop="sampleData.sequence"
      />
    </div>
    <div
      id="debug"
      class="row"
    >
      <b-button-toolbar>
        <b-button-group class="mx-1">
          <b-button
            :pressed="isState0"
            @click="loadState1"
          >
            A l'arret
          </b-button>
        </b-button-group>
        <p class="text-left">
          2 séquences correspondants à 2 états (à l'arrêt et en inter-arret).<br> Les boutons permettent de naviguer de l'un à l'autre.
        </p>
        <hr>
        <p class="text-left">
          une séquence est une liste ordonnée de screens et on passe d'un écran au suivant suivant un temps donné (setInterval).<br> un screen est un ensemble de composants <br> un composant est un logo, un texte, un texte spécial (ex :une horloge),
          un bandeau déroulant, ... <br> le modèle de Composant doit exister au préalable (on ne crée pas dynamiquement un composant), <br> exister = le code le décrivant existe (ie. fichier Component-xxxx.vue).
        </p>
        <b-button-group class="mx-1">
          <b-button
            :pressed="isState1"
            @click="loadState2"
          >
            Inter arret
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>
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
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.tft{
    border: 1px solid red;
    height: 100%;
}
#debug {
    background-color: antiquewhite;
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
