<template>
  <div :class="[
    bem.b(),
    bem.is('success', validateState == 'success'),
    bem.is('error', validateState == 'error')
  ]">
    <label :class="bem.e('label')"></label>

    <div :class="bem.e('content')">
      <slot></slot>
      <div :class="bem.e('error')">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@miku-ui/utils/create'
import { ref } from "vue"
import type { FormItemValidateState } from './form-item'
import { formItemProps, } from './form-item'

defineOptios({
  name: 'm-form-item'
})
const props = defineProps(formItemProps)

const bem = createNamespace('form-item')

const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('校验失败')
</script>
