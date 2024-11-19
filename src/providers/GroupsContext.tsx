import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import { IGroup } from "../types/databaseTypes";
import { readGroups } from "../../supabase/groupsFunctions";
import Loader from "../components/Atoms/Loader/Loader";

type ISetGroups = Dispatch<SetStateAction<IGroup[]>>;

export const GroupsContext = createContext<IGroup[]>([]);
export const SetGroupsContext = createContext<ISetGroups>(() => {});

function GroupsProvider({ children }: PropsWithChildren) {
	const [groups, setGroups] = useState<IGroup[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const getGroups = async () => {
		setIsLoading(true);
		const groups = await readGroups();
		setGroups(groups);
		setIsLoading(false);
	};

	useEffect(() => {
		getGroups();
	}, []);

	if (isLoading) return <Loader />;

	return (
		<GroupsContext.Provider value={groups}>
			<SetGroupsContext.Provider value={setGroups}>{children}</SetGroupsContext.Provider>
		</GroupsContext.Provider>
	);
}

export const useGroupsContext = () => useContext(GroupsContext);
export const useSetGroupsContext = () => useContext(SetGroupsContext);

export default GroupsProvider;
