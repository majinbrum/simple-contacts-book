import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

const HomeIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 576 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z' />
	</svg>
);

const AddIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 448 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z' />
	</svg>
);

const BackIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 448 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' />
	</svg>
);

const Header = () => {
	const currentPath = useLocation();
	return (
		<header className={style.header}>
			<h1>
				SCB
				<br />
				CONTACTS
			</h1>
			<div className={style.navLinks}>
				<Link
					to={currentPath.pathname === "/" ? "add" : "/"}
					className={style.headerButton}>
					{currentPath.pathname === "/" ? AddIcon : HomeIcon}
				</Link>
				{!currentPath.pathname.endsWith(currentPath.pathname.split("/")[2] || "add") && currentPath.pathname !== "/" && (
					<Link
						to={`contacts/${currentPath.pathname.split("/")[2]}`}
						className={style.headerButton}>
						{BackIcon}
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
