<template>
  <div :class="[bem.b()]">
    <label></label>

    <div></div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@miku-ui/utils/create'

const bem = createNamespace('form-item')

</script>
