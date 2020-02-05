<template>
  <div class="screen">
    <div
      v-for="c in attributes.components"
      :key="c.name"
    >
      <Item attributes="c" />
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue"
export default {
    name: "Screen",
    components: {
        Item
    },
    props: {
        attributes: Object
    }
}
</script>

<style>
.screen {
    border-color: aqua;
    border-width: thick;
}
</style>