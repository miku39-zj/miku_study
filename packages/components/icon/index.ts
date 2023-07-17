import { withInstall } from "@miku-ui/utils/with-install";
import Icon from "./src/Icon.vue";

const mIcon = withInstall(Icon);

export { mIcon };

export default mIcon;

declare module 'vue' {
  export interface GlobalComponents {
    mIcon: typeof mIcon
  }
}
