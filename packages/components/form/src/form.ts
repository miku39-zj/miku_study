// form 表单的属性
// model
// rules

import {  ExtractPropTypes, PropType, InjectionKey } from "vue";
import type { Arrayable, FormItemRule } from "./form-item";

export const formProps = {
  model: Object,
  rules: {
    type: Object as PropType<Record<string, Arrayable<FormItemRule>>>
  },
  showMessage: {
    type: Boolean,
    default: true
  }
} as const

export type FromProps = Partial<ExtractPropTypes<typeof formProps>>

export interface FormContext extends FromProps {
  validate: (trigger: string, callback?: (isValid: boolean) => void) => Promise<void>
}
export const FormContextKey: InjectionKey<FromProps> = Symbol()