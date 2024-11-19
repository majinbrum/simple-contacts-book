import style from "./App.module.css";
import { useEffect, useState } from "react";
import { readGroups } from "../supabase/groupsFunctions";
import Loader from "./components/Atoms/Loader/Loader";
import { Link, useLocation } from "react-router-dom";
import { supabaseUrl } from "../supabase/supabaseClient";
import { useGroupsContext, useSetGroupsContext } from "./providers/GroupsContext";

const AddIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 448 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z' />
	</svg>
);

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
