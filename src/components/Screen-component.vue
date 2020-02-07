<template>
  <div class="item">
    <p>{{ itemProps.name }}</p>
  </div>
</template>
<script>
import ComponentClock from "./Component-Clock.vue"
export default {
  name: "ScreenComponent",
    // components: {
    //     ComponentClock
    // },
  props: {
    itemProps: {type:Object, default:function(){return {}}}
  }
}
</script>
<style>

</style>