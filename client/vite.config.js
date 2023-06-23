import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// import million from "million/compiler";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [million.vite()],
// });
