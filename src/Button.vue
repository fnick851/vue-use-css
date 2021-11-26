<script setup lang="ts">
import useCss from './use-css'
const css = /*css*/ `
& button {
  border: 2px solid red;
}
`
const cssScope = useCss(css)
</script>

<template>
  <button v-bind="cssScope">Toggle Texts</button>
</template>
