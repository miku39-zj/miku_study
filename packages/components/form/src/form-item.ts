// form-item 所需的属性
// prop 检验的属性
// label 标题
// rules 表单规则
// show-message 是否显示错误



// 事件  change / blur

import type {RuleItem} from 'async-validator'
import { ExtractPropTypes, InjectionKey, PropType } from 'vue'

export type Arrayable<T> = T | T[]
export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}

export const formItemValidateState = ['success', 'error', ''] as const
export type FormItemValidateState = typeof formItemValidateState[number]
export const formItemProps = {
  prop: String,
  label: String,
  rules: [Object, Array] as  PropType< Arrayable<FormItemRule>>,
  showMessage: {
    type: Boolean,
    default: true
  }
} as const

export type FormItemProps =  Partial<ExtractPropTypes<typeof formItemProps>> 

export interface FormItemContext extends FormItemProps {
  validate: (trigger: string, callback?: (isValid: boolean) => void) => Promise<void>
}
export const formItemContextKey: InjectionKey<FormItemProps> = Symbol()