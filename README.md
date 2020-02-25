# poc-tft-dynamic

## Description

Lit un fichier json avec un objet sequence qui contient une liste ordonnée d'écrans (screen) qui contiennent des composants (widget).
Une séquence peut contenir des widgets qui seront alors commun à tous les screens.
Un widget est un composant simple (`<div>`) placé suivant les règles du CSS sur son composant parent (screen ou sequence).

## Conception

La sequence est un container bootstrap (cf. https://bootstrap-vue.js.org/docs/components/layout)
Elle contient par défaut 3 b-rows (en haut (header), au milieu (default) et en bas (footer)).
Chaque b-row est découpable en 12 b-cols max.
Chaque widget a un attribut position de la forme row-col, où row correspond à la row (header, default, footer) et col correspond à la b-col.
Si row n'est pas défini alors on prend default.
Cf. les rêgles de positionnement des colonnes dans bootstrap (url ci-dessus).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
