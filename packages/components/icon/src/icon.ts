// 主要放置的是组件的 props 及公共的方法
import type { ExtractPropTypes, PropType } from "vue";
export const iconProps = {
  size: [Number, String] as PropType<number | string>,
  color: String,
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>;
