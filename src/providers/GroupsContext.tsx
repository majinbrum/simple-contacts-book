import { createContext, PropsWithChildren, useContext, useState } from "react";
import { IGroup } from "../types/databaseTypes";
import { readGroups } from "../../supabase/groupsFunctions";

type ISetGroups = () => Promise<void>;

export const GroupsContext = createContext<IGroup[]>([]);
export const SetGroupsContext = createContext<ISetGroups>(() => Promise.resolve());

function GroupsProvider({ children }: PropsWithChildren) {
	const [groups, setGroups] = useState<IGroup[]>([]);

	const getGroups = async () => {
		try {
			const groups = await readGroups();
			setGroups(groups);
		} catch (error: any) {
			return error.message;
		}
	};

	return (
		<GroupsContext.Provider value={groups}>
			<SetGroupsContext.Provider value={getGroups}>{children}</SetGroupsContext.Provider>
		</GroupsContext.Provider>
	);
}

export const useGroupsContext = () => useContext(GroupsContext);
export const useSetGroupsContext = () => useContext(SetGroupsContext);

export default GroupsProvider;
