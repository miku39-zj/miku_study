<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
  
</template>

<script lang="ts" setup>
import { createNamespace } from '@miku-ui/utils/create'
import { computed } from 'vue'
import { iconProps } from './icon'

const bem = createNamespace('icon')
const props = defineProps(iconProps)
const style = computed(() =>{
  if(!props.size && !props.color) {
    return ''
  }
  return {
    ...(props.size ? {'font-size': props.size + 'px'} : {}),
    ...(props.color ? {'color': props.color} : {})
  }
})
</script>

