# vue-use-css

This is a minimal Vue hook that processes and generates scoped CSS at runtime, making it easy to bundle any CSS into JS file using any bundler. You can use it to build component (or micro frontend) that bring its own scoped CSS that will be cleaned up once the component is unmounted.

It is based on the [kremling](https://github.com/CanopyTax/kremling) library for React, but adapted for Vue using TypeScript. It does not include the class name helpers like Kremling does, since Vue has built-in equivalents .

## How to use

You need to pass CSS as a string to the exported hook. For writing scoped CSS, it works exactly the same way as kremling does. You need to prepend any individual CSS selector with the `&` symbol.

For example:

```vue
<script setup lang="ts">
import useCss from "./vue-use-css";

const cssScope = useCss(css);
const css = /*css*/ `
& .my-root {
  border: 1px solid red;
}
& .inner-1, & .inner-2 {
  font-size: 30px;
}
& .my-root button {
  color: blue;
}
`;
</script>

<template>
  <div v-bind="cssScope" class="my-root">
    <div class="inner-1">hi</div>
    <div class="inner-2">hello</div>
    <button>click me</button>
  </div>
</template>
```

The prrocessed CSS will be scoped to the element where you place the `v-bind="cssScope"` directive, based on a generated unique `data-` attribute.

Some setup allows you to import the content of a `.css` file as a string. So you could also use a separate CSS file if you want.
