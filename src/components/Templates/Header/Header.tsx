// CSS
import "./Header.css";
// React
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// Assets
import { AddIcon, BackIcon, EditIcon, HomeIcon } from "../../../assets/icons";

const Header = () => {
	const { id } = useParams();
	const path = useLocation();
	const currentPath = path.pathname;
	const currentPathArray = path.pathname.split("/");
	const currentPathLast = currentPathArray[currentPathArray.length - 1];

	const headerLinksMap = [
		{ condition: currentPath.endsWith(currentPathArray[2]) && currentPath !== "/groups/add", linkTo: "/", icon: HomeIcon },
		{ condition: currentPath == "/contacts/add", linkTo: "contacts/all", icon: BackIcon },
		{ condition: currentPathLast == id, linkTo: currentPathArray[2] === "all" || currentPathArray[1] === "groups" ? "/" : `contacts/${currentPathArray[2]}`, icon: BackIcon },
		{ condition: currentPath == "/contacts/all", linkTo: "contacts/add", icon: AddIcon },
		{ condition: currentPath == "/groups/add", linkTo: "/", icon: BackIcon },
		{ condition: currentPath == "/", linkTo: "/groups/edit", icon: EditIcon },
	];

	return (
		<header className={"header"}>
			<h1>
				SCB
				<br />
				CONTACTS
			</h1>
			<div className={"header__nav"}>
				{headerLinksMap.map(
					(headerLink, i) =>
						headerLink.condition && (
							<Link
								key={`HeaderLink${i}`}
								className={"header__nav__button"}
								to={headerLink.linkTo}>
								{headerLink.icon}
							</Link>
						)
				)}
			</div>
		</header>
	);
};

export default Header;
