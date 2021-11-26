<script setup lang="ts">
import { ref } from 'vue'
import useCss from './use-css'
import css from './App.css'
import Button from './Button.vue'
import Texts from './Texts.vue'

const cssScope = useCss(css)
const show = ref(true)
</script>

<template>
  <div v-bind="cssScope" class="outer">
    outer
    <div class="inner">innner</div>
    <Texts v-if="show"></Texts>
    <Button @click="show = !show"></Button>
  </div>
</template>
