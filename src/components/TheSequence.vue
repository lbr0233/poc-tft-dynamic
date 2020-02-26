<script>
import clock from "../widgets/Widget-Clock.vue";
import logo from "../widgets/Widget-Logo.vue";
import jlb from "../widgets/Widget-Jlb.vue";

/*Retourne un tableau de VNODE pour remplir une b-row */
function createComposants(createElement, composants) {
  let widgets1 = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  ];
  composants.forEach(c => {
    //pos est un tableau [pos, taille]
    //pos est entre 1 et 12 ; correspond aux cols bootstrap
    //et taille est le nb de col occupé ; 1 par défaut.
    const pos = c.position.substring(c.position.indexOf("-") + 1).split(",");
    if (pos.length == 1) {
      pos[1] = 1;
    }
    if (!isNaN(pos[0])) {
      widgets1[pos[0] - 1] = createElement(
        "b-col",
        { attrs: { cols: pos[1] } },
        [createElement(c.name, { props: { attributes: c } })]
      );
      for (let index = 0; index < pos[1] - 1; index++) {
        widgets1[Number(pos[0]) + Number(index)] = null;
      }
    } else {
      console.log(
        "createComposants : pos[0] is not Number ",
        c.position,
        pos[0]
      );
    }
  });
  //merger les cols vides
  let widgets = [];
  let count = 0;
  widgets1.forEach((w, i) => {
    if (w === undefined) {
      count++;
      // console.log("inc ", count, i, w);
    } else {
      if (w != null) {
        if (i > 0) {
          // console.log("createElement ", count, i, w);
          widgets[i - 1] = createElement("b-col", { attrs: { cols: count } });
        }
        widgets[i] = w;
      }
      count = 0;
    }
  });
  return widgets;
}
export default {
  name: "TheSequence",
  components: { clock, logo, jlb },
  props: {
    //Sequence = un etat, des composants et des screens.
    sequenceProps: { type: Object, required: true }
  },
  computed: {
    getHeaderWidgets() {
      return this.sequenceProps.components.filter(c => {
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
      return this.sequenceProps.components.filter(c => {
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
      return this.sequenceProps.components.filter(c => {
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
  //On préfère créer le template de façon programmable car on ne sait pas d'avance
  // ce qu'on aura à afficher.
  render(createElement) {
    console.log("render");
    const h = createElement(
      "b-row",
      {
        class: "header"
      },
      createComposants(createElement, this.getHeaderWidgets)
    );

    const def = createElement(
      "b-row",
      {
        class: "screen"
      },
      this.$slots.default
    );

    const f = createElement(
      "b-row",
      {
        class: "footer"
      },
      createComposants(createElement, this.getFooterWidgets)
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

<style>
.sequence {
  background-color: aqua;
  /* width: 100%;*/
  height: 100%;
  border: 3px solid green;
  margin: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}
.screen {
  background-color: blueviolet;
  width: 100%;
  /* height: 100%; */
  border: 3px solid black;
  margin: auto;
  padding: 1px;
  flex-grow: 1;
}
.header {
  /* position: absolute; */
  top: 0;
}

.footer {
  /* position: absolute; */
  width: 100%;
  bottom: 0;
}
</style>