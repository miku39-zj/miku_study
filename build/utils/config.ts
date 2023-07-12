import path from "path";
import { outDir } from "./paths";

export const buildConfig = {
  esm: {
    module: "ESNext",
    format: "esm",
    output: {
      name: "es",
      path: path.resolve(outDir, "es"),
    },
    bundle: {
      path: "miku-ui/es",
    },
  },
  cjs: {
    module: "Commonjs",
    format: "cjs",
    output: {
      name: "lib",
      path: path.resolve(outDir, "lib"),
    },
    bundle: {
      path: "miku-ui/lib",
    },
  },
};

export type buildConfig = typeof buildConfig;
