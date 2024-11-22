// CSS
import style from "./App.module.css";
// React
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Supabase
import { supabaseUrl } from "../supabase/supabaseClient";
// Context
import { useGroupsContext, useSetGroupsContext } from "./providers/GroupsContext";
// Components
import Loader from "./components/Atoms/Loader/Loader";
import ErrorBox from "./components/Atoms/ErrorBox/ErrorBox";
// Assets
import { AddIcon } from "./assets/icons";

const App = () => {
	const path = useLocation();
	const currentPathArray = path.pathname.split("/");
	const currentPathLast = currentPathArray[currentPathArray.length - 1];
	const groups = useGroupsContext();
	const getGroups = useSetGroupsContext();
	const [editMode, setEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>();

	useEffect(() => {
		setIsLoading(true);
		const data = getGroups();
		if (typeof data === "string") {
			setError(data);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		setEditMode(currentPathLast == "edit" ? true : false);
	}, [path]);

	if (error) return <ErrorBox message={error} />;
	if (groups.length < 1 || isLoading) return <Loader />;

	return (
		<>
			<div className={`${style.homeLinkContainer} ${editMode ? style.editMode : null}`}>
				{!editMode && (
					<Link
						to={"contacts/all"}
						className={style.homeLink}>
						<div className={style.homeLinkAvatar}>
							<img
								src={`${supabaseUrl}/storage/v1/object/public/avatars/avatars/avatar4.png`}
								alt='All Avatar'
								loading='lazy'
							/>
						</div>
						All
					</Link>
				)}
				{groups.map((group, i) => (
					<Link
						key={`${i}List`}
						to={editMode ? `${group.id}` : `contacts/${group.tag}`}
						className={style.homeLink}>
						<div className={style.homeLinkAvatar}>
							<img
								src={`${supabaseUrl}/storage/v1/object/public/avatars/${group.avatar}`}
								alt={`${group.tag} Avatar`}
								loading='lazy'
							/>
						</div>
						{group.tag}
					</Link>
				))}
				{!editMode && (
					<Link
						to={"groups/add"}
						className={style.homeLink}>
						<div className={style.homeLinkIcon}>{AddIcon}</div>
						Add group
					</Link>
				)}
			</div>
		</>
	);
};

export default App;
