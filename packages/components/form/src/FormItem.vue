<template>
  <div :class="[
    bem.b(),
    bem.is('success', validateState == 'success'),
    bem.is('error', validateState == 'error')
  ]">
    <label :class="bem.e('label')">
      <slot name="lable">
        {{ label }}
      </slot>
    </label>

    <div :class="bem.e('content')">
      <slot></slot>
      <div :class="bem.e('error')">
        <slot name="error">
          {{ validateMessage }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@miku-ui/utils/create'
import { provide, reactive, ref, toRefs } from "vue"
import type { FormItemValidateState, FormItemContext } from './form-item'
import { formItemProps, formItemContextKey } from './form-item'

defineOptios({
  name: 'm-form-item'
})
const props = defineProps(formItemProps)

const bem = createNamespace('form-item')

const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('校验失败')

const validate: FormItemContext['validate'] = async (trigger, callback?) => {

}
const context: FormItemContext = reactive({
  ...props,
  validate
})
provide(formItemContextKey, context)
</script>
