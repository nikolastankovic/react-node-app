import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";
import HomePage from "./pages/home";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import NotFound from "./pages/not-found";
import AuthenticatedRoute from "./components/authenticated-route";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AuthenticatedRoute />}>
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Route>

				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<HomePage />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
