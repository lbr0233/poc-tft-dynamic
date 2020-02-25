function computeStyle() {
  console.log('computeStyle', this.screenProps);
  let styles = [];
  if (this.screenProps.bg) {
    console.log('if this.screenProps.bg', this.screenProps.bg);
    styles.push({ backgroundColor: this.screenProps.bg.color });
    if (this.screenProps.bg.picture) {
      //Syntaxe avec un serveur qui sert les images :
      // styles.push({ background: "url(" + this.screenProps.bg.picture + ")  no-repeat center fixed" });
      styles.push({
        background:
          'url(' +
          require('@/assets/' + this.screenProps.bg.picture) +
          ')   no-repeat center/100% fixed'
      });
    }
  } else {
    console.log('else this.screenProps.bg', this.screenProps.bg);
  }
  console.log('styles', styles);
  return styles;
}
export default computeStyle;
