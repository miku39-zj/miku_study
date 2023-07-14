import DefaultTheme from 'vitepress/theme'
import mikuIcon from "@miku-ui/components/icon";
import "@miku-ui/theme-chalk/src/index.scss";
export default{
  ...DefaultTheme,
  enhanceApp({app}) {
    app.use(mikuIcon)
  }
}
