import { Outlet } from "react-router-dom";
import Header from "../../Templates/Header/Header";
import style from "./Default.module.css";

const Default = () => {
	return (
		<>
			<Header />
			<main className={style.main}>
				<Outlet />
			</main>
		</>
	);
};

export default Default;
