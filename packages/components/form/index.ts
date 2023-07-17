// 组件入口
import { withInstall } from "@miku-ui/utils/with-install";
import _FormItem from "./src/FormItem.vue";

const FormItem = withInstall(_FormItem);

export { FormItem };

export default FormItem;

// export type { formItemProps } from './src/form-item'

declare module 'vue' {
  export interface GlobalComponents {
    mFormItem: typeof FormItem
  }
}
