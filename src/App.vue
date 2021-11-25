<script setup lang="ts">
import useCss from "./use-css";
import css from "./App.css";
import Button from "./Button.vue";

const cssScope = useCss(css);
</script>

<template>
  <div v-bind="cssScope" class="outer">
    outer
    <div class="inner">innner</div>
    <Button></Button>
  </div>
</template>
