declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const defineComponent: DefineComponent<{}, {}, any>;
  export default defineComponent;
}
