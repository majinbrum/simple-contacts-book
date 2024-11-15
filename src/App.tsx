import style from "./App.module.css";
import { useEffect, useState } from "react";
import { generateRandomAvatar, readContacts, readContactsGroups } from "../supabase/functions";
import Loader from "./components/Atoms/Loader/Loader";
import { useSortByContext } from "./providers/SortByContext";
import { useOrderContext } from "./providers/OrderContext";
import { Link } from "react-router-dom";
import { useSetContactsContext } from "./providers/ContactsContext";
import { IContactsGroup } from "./types/databaseTypes";
import { supabaseUrl } from "../supabase/supabaseClient";

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [contactsGroups, setContactsGroups] = useState<IContactsGroup[]>();
	const [groupsAvatars, setGroupsAvatars] = useState<string[]>();

	const setContacts = useSetContactsContext();
	const sortBy = useSortByContext();
	const order = useOrderContext();

	useEffect(() => {
		const getContacts = async () => {
			setIsLoading(true);
			setContacts(await readContacts(sortBy, order));
			setContactsGroups(await readContactsGroups());
			setIsLoading(false);
		};

		getContacts();
	}, []);

	useEffect(() => {
		const generateNewAvatars = async () => {
			if (!contactsGroups) return;
			setIsLoading(true);
			const avatarPromises = contactsGroups.map(async () => {
				const endPath = await generateRandomAvatar("avatar");
				return `${supabaseUrl}/storage/v1/object/public/avatars/${endPath}`;
			});
			const avatars = await Promise.all(avatarPromises);
			setGroupsAvatars(avatars);
			setIsLoading(false);
		};

		generateNewAvatars();
	}, [contactsGroups]);

	if (isLoading || !groupsAvatars) return <Loader />;

	return (
		<>
			<div className={style.homeLinkContainer}>
				<Link
					to={"contacts/all"}
					className={style.homeLink}>
					<div className={style.homeLinkAvatar}>
						<img
							src={`${supabaseUrl}/storage/v1/object/public/avatars/avatars/avatar2.png`}
							alt='All Avatar'
							loading='lazy'
						/>
					</div>
					all
				</Link>
				<Link
					to={"contacts/favourites"}
					className={style.homeLink}>
					<div className={style.homeLinkAvatar}>
						<img
							src={`${supabaseUrl}/storage/v1/object/public/avatars/avatars/avatar4.png`}
							alt='Favourites Avatar'
							loading='lazy'
						/>
					</div>
					favourites
				</Link>
				{contactsGroups?.map((group, i) => (
					<Link
						key={`${i}List`}
						to={`contacts/${group}`}
						className={style.homeLink}>
						<div className={style.homeLinkAvatar}>
							<img
								src={groupsAvatars[i]}
								alt={`${group} Avatar`}
								loading='lazy'
							/>
						</div>
						{group}
					</Link>
				))}
			</div>
		</>
	);
};

export default App;
