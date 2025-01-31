import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { AppProviders } from "./providers/app-providers.tsx"
import { Toaster } from "./components/ui/toaster.tsx"

createRoot(document.getElementById('root')!).render(
	<AppProviders>
		<App />
		<Toaster />
	</AppProviders>
)
