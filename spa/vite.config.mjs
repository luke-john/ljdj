import { defineConfig } from 'npm:vite@^4.3.9'
// import react from 'npm:@vitejs/plugin-react@^4.0.0'
import react from "npm:@vitejs/plugin-react-swc";


import 'npm:react@^18.2.0'
import 'npm:react-dom@^18.2.0/client'
import { viteSingleFile } from "npm:vite-plugin-singlefile";
import denoResolve from 'https://deno.land/x/vite_plugin_deno_resolve/mod.ts';

import { isAbsolute, relative } from "https://deno.land/std@0.177.0/path/mod.ts";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [denoResolve(), react(), viteSingleFile(), removeNPMimportSpecifierPlugin()],
  logLevel: 'silent',
  build: {
    target: "esnext",
    minify: false,
  },
})

function removeNPMimportSpecifierPlugin(opts = {}) {
  return {
      name: 'test-plugin',
      enforce: 'pre',
      resolveId(id, importer) {
        let idWithNpmSpecifierStripped = id.replaceAll(/^npm:|@\d+\.\d+\.\d+$/g, '')

        if (idWithNpmSpecifierStripped !== id) {
          return this.resolve(idWithNpmSpecifierStripped)
        }

        // if (!importer)  {
        //   return id
        // }

        // let idWithExtensionStripped = id.replaceAll(/\.tsx?$|\.js$/g, '');

        // console.log("omg", id, importer)
        // if (id !== idWithExtensionStripped) {
        //   return relative(Deno.cwd(), idWithExtensionStripped)  
        // }
        

      },
      load(id) {
        
      }
  }
}
