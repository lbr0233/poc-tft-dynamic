<template>
  <div class="item">
    <p>{{ attributes.name }}</p>
  </div>
</template>
<script>
export default {
  name: "Item",
  props: {
    attributes: Object
  }
}
</script>
<style>

</style>