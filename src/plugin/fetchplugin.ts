import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

export const FetchPlugin = (inputCode: string) => {
  const fileCache: LocalForage = localforage.createInstance({
    name: "filecache",
  });
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        const cachedFile = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedFile) return cachedFile;

        const sum = await fetch(args.path)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Can't fetch");
            }
            return Promise.all([res.text(), res.url]);
          })
          .then(([textData, urlData]) => {
            return {
              data: textData,
              url: urlData,
            };
          })
          .catch((error) => console.warn(error.message));

        const loader = args.path.match(/\.css$/) ? "css" : "jsx";

        const escaped = sum?.data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents =
          loader === "css"
            ? `
        const style = document.createElement("style")
        style.innerText = '${escaped}'
        document.head.appendChild(style)
        `
            : sum?.data;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", sum?.url).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
