import { createApp, DefineComponent } from "vue";
import App from "./app.vue";
import mikuIcon from "@miku-ui/components/icon";
import "@miku-ui/theme-chalk/src/index.scss";

const app = createApp(App);

app.use(mikuIcon);
app.mount("#app");
