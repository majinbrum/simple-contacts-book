import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./Header.module.css";
import { AddIcon, BackIcon, EditIcon, HomeIcon } from "../../../assets/icons";

const Header = () => {
	const { id } = useParams();
	const path = useLocation();
	const currentPath = path.pathname;
	const currentPathArray = path.pathname.split("/");
	const currentPathLast = currentPathArray[currentPathArray.length - 1];

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
