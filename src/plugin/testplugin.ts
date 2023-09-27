import * as esbuild from "esbuild-wasm";

export const Testplugin = () => {
  return {
    name: "Textplugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /^index\.js$/ }, (args: any) => {
        console.log("onResolve", args.path);

        return { path: args.path, namespace: "a" };
      });

      build.onResolve({ filter: /.*/ }, (args: any) => {
        console.log("onResolve", args);

        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `import message from "texteditpack@1.1.0"
            console.log("real",message)
            `,
          };
        }

        const result = await fetch(args.path)
          .then((res) => res.text())
          .then((data) => {
            console.log(data);
            return { data };
          });

        return {
          loader: "jsx",
          contents: result.data,
        };
      });
    },
  };
};
