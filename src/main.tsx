import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Default from "./components/Pages/Default/Default.tsx";
import Contact from "./components/Pages/Contact/Contact.tsx";
import SortByProvider from "./providers/SortByContext.tsx";
import OrderProvider from "./providers/OrderContext.tsx";
import FilterProvider from "./providers/FilterContext.tsx";
import ContactsGroup from "./components/Pages/ContactsGroup/ContactsGroup.tsx";
import ContactsProvider from "./providers/ContactsContext.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Default />,
		children: [
			{
				path: "/",
				element: <App />,
			},
			{
				path: "add",
				element: <Contact />,
			},
			{
				path: "contacts/:group",
				element: <ContactsGroup />,
			},
			{
				path: "contacts/:group/:id",
				element: <Contact />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/* <App /> */}
		<FilterProvider>
			<SortByProvider>
				<OrderProvider>
					<ContactsProvider>
						<RouterProvider router={router} />
					</ContactsProvider>
				</OrderProvider>
			</SortByProvider>
		</FilterProvider>
	</StrictMode>
);
