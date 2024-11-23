// CSS
import "./Default.css";
// React
import { Outlet } from "react-router-dom";
// Components
import Header from "../../Templates/Header/Header";

const Default = () => {
	return (
		<>
			<Header />
			<main className={"main"}>
				<Outlet />
			</main>
		</>
	);
};

export default Default;
