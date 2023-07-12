// 主要放置的是组件的 props 及公共的方法
import type { ExtractPropTypes } from "vue";
export const iconProps = {
  size: {
    type: Number,
  },
  color: {
    type: String,
  },
};

export type iconProps = ExtractPropTypes<typeof iconProps>;
