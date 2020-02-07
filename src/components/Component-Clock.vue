<template>
  <div class="clock">
    <p :style="getStyle">
      {{ timestamp }}
    </p>
  </div>
</template>

<script>
export default {
    name: "Clock",
    props: {
        clockAttributes: { type: Object, default: function() { return {} } }
    },
    data() {
        return {
            timestamp: "00:00"
        }
    },
    mounted() {
        setInterval(this.getNow, 1000);
    },
    // computed:{
    //     getStyle(){

    //     }
    // },
    methods: {
        getNow() {
            const today = new Date();
            const timM = today.getMinutes();
            const timH = today.getHours();
            const time =
                (timH < 10 ? "0" + timH : timH) + ":" + (timM < 10 ? "0" + timM : timM);
            this.timestamp = time;
        }

    }}
</script>

<style scoped>

</style>