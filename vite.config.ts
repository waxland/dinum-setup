import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["style-to-js", "style-to-object"],
    esbuildOptions: {
      plugins: [
        {
          name: "ignore-virtual-zudoku-modules",
          setup(build) {
            build.onResolve({ filter: /^virtual:zudoku/ }, (args) => {
              return { path: args.path, external: true };
            });
          },
        },
      ],
    },
  },
});
