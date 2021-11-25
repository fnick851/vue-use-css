# vue-use-css

This is a minimal Vue hook that processes and generates scoped CSS at runtime, making it easy to bundle CSS into JS file using any bundler. You can use it to build component (or micro frontend) that bring its own **scoped CSS that will be cleaned up once the component is unmounted**.

It is based on the [kremling](https://github.com/CanopyTax/kremling) library for React, but adapted for Vue using TypeScript. It does not include the class name helpers like Kremling does, since Vue has built-in equivalents .

## How to use

You need to pass the CSS as a string to the imported hook. For writing scoped CSS, it works the same way as kremling does. You need to prepend any individual CSS selector with the `&` symbol to make it scoped. Or it will become regular global CSS.

For example:

```vue
<script setup lang="ts">
import useCss from "./vue-use-css";

const cssScope = useCss(css);
const css = /*css*/ `
/* global style */
.div {
  margin: 5px;
}
/* scoped styles */
& .my-root {
  border: 1px solid red;
}
& .inner-1, & .inner-2 {
  font-size: 30px;
}
& .my-root #the-btn {
  color: blue;
}
& a {
  color: yellow;
}
& a:hover {
  color: hotpink;
}
@media (max-width: 500px) {
  & a {
    display: none;
  }
}
`;
</script>

<template>
  <div v-bind="cssScope" class="my-root">
    <div class="inner-1">hi</div>
    <div class="inner-2">hello</div>
    <button id="the-btn">click me</button>
    <a>link</a>
  </div>
</template>
```

The CSS output will be scoped to the element where you place the `v-bind="cssScope"` directive, based on a generated unique `data-` attribute.

Some setup allows you to import the content of a `.css` file as a string. So you could also use a separate CSS file if you want.

If you write the CSS string with template literal, it is recommended to use an extension such as [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) to add CSS syntax highlight.
