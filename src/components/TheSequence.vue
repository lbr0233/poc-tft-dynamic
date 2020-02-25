<script>
export default {
  name: "TheSequence",
  props: {
    nbHeaderWidgets: { type: Number, required: true },
    nbFooterWidgets: { type: Number, required: true },
    nbDefaultWidgets: { type: Number, required: true }
  },
  render(createElement) {
    console.log("render");
    //On a 12 colonnes max (bootstrap)
    //notre slot sera inséré dans une des cols en fonction de sa position

    const hCols = createElement("b-col");
    const h = createElement(
      "b-row",
      {
        class: "header"
      },
      this.$slots.header
    );
    const def = createElement("b-row", this.$slots.default);

    const f = createElement(
      "footer",
      {
        class: "footer"
      },
      this.$slots.footer
    );

    return createElement(
      "div",
      {
        class: "container-fluid sequence"
      },
      [h, def, f]
    );
  }
};
</script>

<style scoped>
.sequence {
  background-color: aqua;
  /* width: 100%;*/
  height: 100%;
  border: 3px solid green;
  margin: 2px;
}

.header {
  /* position: absolute; */
  top: 0;
}

.footer {
  position: absolute;
  bottom: 0;
}
</style>