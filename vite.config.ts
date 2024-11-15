import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0", // Permette l'accesso da qualsiasi IP
		port: 5173, // Sostituisci con la porta desiderata
	},
});
