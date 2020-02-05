/* eslint-disable no-console */
<template>
  <div class="sequence">
    <div
      v-for="s in screens"
      :key="s.name"
    >
      <Screen attributes="s" />
    </div>
  </div>
</template>

<script>

import Screen from "./Screen.vue"

export default {
    name: "Sequence",
    components: {
        Screen
    },
    props: {
        screens: Array
    },
    data() {
        return {
            screenDuration: 30, //in seconds
            currentScreenIndex: 0,
            currentScreen: {}
        }
    },
    mounted() {
        setInterval(this.changeScreen, this.screenDuration);
    },
    methods: {
        changeScreen() {
            this.currentScreenIndex++;
            if (this.currentScreenIndex > this.screens.length) {
                this.currentScreenIndex = 0;
            }
            this.currentScreen = this.screens[this.currentScreenIndex];
            console.log("changeScreen ", this.currentScreen);
        }
    }
}
</script>

<style>
.sequence {
    border-color: black;
    border-width: thick;
}
</style>