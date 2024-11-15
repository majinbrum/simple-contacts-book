import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";

type ISortBy = string;
type ISetSortBy = Dispatch<SetStateAction<string>>;

export const SortByContext = createContext<ISortBy>("name");
export const SetSortByContext = createContext<ISetSortBy>(() => {});

function SortByProvider({ children }: PropsWithChildren) {
	const [sortBy, setSortBy] = useState<ISortBy>("name");

	return (
		<SortByContext.Provider value={sortBy}>
			<SetSortByContext.Provider value={setSortBy}>{children}</SetSortByContext.Provider>
		</SortByContext.Provider>
	);
}

export const useSortByContext = () => useContext(SortByContext);
export const useSetSortByContext = () => useContext(SetSortByContext);

export default SortByProvider;
