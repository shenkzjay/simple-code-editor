import * as esbuild from "esbuild-wasm";
import { FetchPlugin } from "../plugin/fetchplugin";
import { unpkgPathPlugin } from "../plugin/unpkgplugin";

let service: esbuild.Service;
export default async function Bundler(inputText: string) {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm ",
    });
  }

  try {
    let result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [FetchPlugin(inputText), unpkgPathPlugin()],
      // outfile: "out.js",
    });

    return {
      code: result.outputFiles[0].text,
      error: "",
    };
  } catch (error: any) {
    return {
      code: "",
      error: error.message,
    };
  }
}
