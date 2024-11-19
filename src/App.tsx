import style from "./App.module.css";
import { useEffect, useState } from "react";
import { readGroups } from "../supabase/groupsFunctions";
import Loader from "./components/Atoms/Loader/Loader";
import { Link, useLocation } from "react-router-dom";
import { supabaseUrl } from "../supabase/supabaseClient";
import { useGroupsContext, useSetGroupsContext } from "./providers/GroupsContext";
import { AddIcon } from "./assets/icons";

const App = () => {
	const path = useLocation();
	const currentPathArray = path.pathname.split("/");
	const currentPathLast = currentPathArray[currentPathArray.length - 1];
	const setGroups = useSetGroupsContext();
	const groups = useGroupsContext();

	const [editMode, setEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getGroups = async () => {
		setIsLoading(true);
		setGroups(await readGroups());
		setIsLoading(false);
	};

	useEffect(() => {
		getGroups();
	}, []);

	useEffect(() => {
		setEditMode(currentPathLast == "edit" ? true : false);
	}, [path]);

	if (isLoading) return <Loader />;

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
						all
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
				<Link
					to={"groups/add"}
					className={style.homeLink}>
					<div className={style.homeLinkIcon}>{AddIcon}</div>
					Add group
				</Link>
			</div>
		</>
	);
};

export default App;
