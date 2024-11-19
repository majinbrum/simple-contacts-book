import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { IGroup } from "../types/databaseTypes";

type ISetGroups = Dispatch<SetStateAction<IGroup[]>>;

export const GroupsContext = createContext<IGroup[]>([]);
export const SetGroupsContext = createContext<ISetGroups>(() => {});

function GroupsProvider({ children }: PropsWithChildren) {
	const [groups, setGroups] = useState<IGroup[]>([]);

	return (
		<GroupsContext.Provider value={groups}>
			<SetGroupsContext.Provider value={setGroups}>{children}</SetGroupsContext.Provider>
		</GroupsContext.Provider>
	);
}

export const useGroupsContext = () => useContext(GroupsContext);
export const useSetGroupsContext = () => useContext(SetGroupsContext);

export default GroupsProvider;
