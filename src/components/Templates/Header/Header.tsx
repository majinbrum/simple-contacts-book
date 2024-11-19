import { useLocation, useParams } from "react-router-dom";
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

const EditIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 512 512'>
		{/* <!--!Font Awesome Free 6.7.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z' />
	</svg>
);

const Header = () => {
	const { id } = useParams();
	const path = useLocation();
	const currentPath = path.pathname;
	const currentPathArray = path.pathname.split("/");
	const currentPathLast = currentPathArray[currentPathArray.length - 1];
	console.log(currentPathArray);
	console.log(currentPathArray.length);
	console.log(currentPathLast);

	return (
		<header className={style.header}>
			<h1>
				SCB
				<br />
				CONTACTS
			</h1>
			<div className={style.navLinks}>
				{currentPath.endsWith(currentPathArray[2]) && (
					<Link
						className={style.headerButton}
						to={"/"}>
						{HomeIcon}
					</Link>
				)}
				{currentPath == "/contacts/add" && (
					<Link
						className={style.headerButton}
						to={`contacts/all`}>
						{BackIcon}
					</Link>
				)}
				{currentPathLast == id && (
					<Link
						className={style.headerButton}
						to={currentPathArray[2] === "all" || currentPathArray[1] === "groups" ? "/" : `contacts/${currentPathArray[2]}`}>
						{BackIcon}
					</Link>
				)}
				{currentPath == "/contacts/all" && (
					<Link
						className={style.headerButton}
						to={`contacts/add`}>
						{AddIcon}
					</Link>
				)}
				{currentPath == "/groups/add" && (
					<Link
						className={style.headerButton}
						to={`/`}>
						{BackIcon}
					</Link>
				)}
				{currentPath == "/" && (
					<Link
						className={style.headerButton}
						to={`/groups/edit`}>
						{EditIcon}
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
