<script setup lang="ts">
import useCss from './use-css'
const css = /*css*/ `
& p {
  color: yellow;
  font-size: 30px;
  background-color: blue;
}
`
const cssScope = useCss(css)
</script>

<template>
  <p v-bind="cssScope">just some texts</p>
</template>
