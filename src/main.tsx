// CSS
import "./index.css";
// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Components
import App from "./App.tsx";
import Default from "./components/Pages/Default/Default.tsx";
import Contact from "./components/Pages/Contact/Contact.tsx";
import ContactsGroup from "./components/Pages/ContactsGroup/ContactsGroup.tsx";
import Group from "./components/Pages/Group/Group.tsx";
// Context
import SortByProvider from "./providers/SortByContext.tsx";
import OrderProvider from "./providers/OrderContext.tsx";
import FilterProvider from "./providers/FilterContext.tsx";
import ContactsProvider from "./providers/ContactsContext.tsx";
import GroupsProvider from "./providers/GroupsContext.tsx";

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
				path: "groups/edit",
				element: <App />,
			},
			{
				path: "contacts/:group",
				element: <ContactsGroup />,
			},
			{
				path: "groups/add",
				element: <Group />,
			},
			{
				path: "groups/edit/:id",
				element: <Group />,
			},
			{
				path: "contacts/:group/:id",
				element: <Contact />,
			},
			{
				path: "contacts/add",
				element: <Contact />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/*<App />*/}
		<FilterProvider>
			<SortByProvider>
				<OrderProvider>
					<GroupsProvider>
						<ContactsProvider>
							<RouterProvider router={router} />
						</ContactsProvider>
					</GroupsProvider>
				</OrderProvider>
			</SortByProvider>
		</FilterProvider>
	</StrictMode>
);
