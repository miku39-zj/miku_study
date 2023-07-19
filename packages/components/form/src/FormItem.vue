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
import { createNamespace } from "@miku-ui/utils/create";
import { computed, inject, provide, reactive, ref } from "vue"
import { FormContextKey } from "./form";
import type { FormItemValidateState, FormItemContext, FormItemRule, Arrayable } from './form-item'
import { formItemProps, formItemContextKey } from './form-item'
import AsyncValidator from 'async-validator'


defineOptions({
  name: 'm-form-item'
})

const formContext = inject(FormContextKey)
const props = defineProps(formItemProps)

const bem = createNamespace('form-item')

const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('校验失败')

const converArray = (rules: Arrayable<FormItemRule> | undefined): FormItemRule[] => {
  return rules ? Array.isArray(rules) ? rules : [rules] : []
}

const _rules = computed(() => {
  const myRules = converArray(props.rules)
  const formRules = formContext?.rules
  if(formRules && props.prop) {
    const _temp = formRules[props.prop]
    if(_temp) {
      myRules.push(...converArray(_temp))
    }
  }
  return myRules
})
const getRuleFiltered = (trigger: string) => {
  const rules = _rules.value
  return rules.filter(rule => {
    if(!rule.trigger || !trigger) return true
    if(Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
}
const validate: FormItemContext['validate'] = async (trigger, callback?) => {
  const rules = getRuleFiltered(trigger)

  const modelName = props.prop!

  const validator = new AsyncValidator({
    [modelName]: rules
  })
  const model = formContext?.model!
  validator.validate({
    [modelName]: model[modelName]
  }).then(() => {console.log('success')
  }).catch(() =>{})
  console.log(formContext?.model);
  
}
const context: FormItemContext = reactive({
  ...props,
  validate
})
provide(formItemContextKey, context)
</script>
