import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";

type IFilter = string;
type ISetFilter = Dispatch<SetStateAction<string>>;

export const FilterContext = createContext<IFilter>("");
export const SetFilterContext = createContext<ISetFilter>(() => {});

function FilterProvider({ children }: PropsWithChildren) {
	const [filter, setFilter] = useState<IFilter>("");

	return (
		<FilterContext.Provider value={filter}>
			<SetFilterContext.Provider value={setFilter}>{children}</SetFilterContext.Provider>
		</FilterContext.Provider>
	);
}

export const useFilterContext = () => useContext(FilterContext);
export const useSetFilterContext = () => useContext(SetFilterContext);

export default FilterProvider;
