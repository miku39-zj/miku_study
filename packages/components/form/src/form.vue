<template>
  <div :class="[
    bem.b()
  ]">
    
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from "@miku-ui/utils/create";
import { provide } from "vue";
import { FormContextKey, formProps } from "./form";

const bem = createNamespace('form')
defineOptions({
  name: 'm-form'
})
const props = defineProps(formProps)
const context = {
  ...props
}
provide(FormContextKey, context)
</script>
