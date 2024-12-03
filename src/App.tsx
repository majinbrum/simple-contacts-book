// CSS
import "./App.css";
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
			<div className={`${"groups__container"} ${editMode ? editMode : null}`}>
				{!editMode && (
					<Link
						to={"contacts/all"}
						className={"groups__card"}>
						<div className={"groups__card__avatar"}>
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
						className={"groups__card"}>
						<div className={"groups__card__avatar"}>
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
						className={"groups__card"}>
						<div className={"groups__card--add"}>{AddIcon}</div>
						Add group
					</Link>
				)}
			</div>
		</>
	);
};

export default App;
