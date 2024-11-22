import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

const defaultFilterContext = {
	filter: "",
	setFilter: (() => {}) as Dispatch<SetStateAction<string>>,
	order: "",
	setOrder: (() => {}) as Dispatch<SetStateAction<string>>,
	sortBy: "",
	setSortBy: (() => {}) as Dispatch<SetStateAction<string>>,
};

export const FilterContext = createContext(defaultFilterContext);

function FilterProvider({ children }: PropsWithChildren) {
	const [filter, setFilter] = useState("");
	const [order, setOrder] = useState("ascending");
	const [sortBy, setSortBy] = useState("name");

	return <FilterContext.Provider value={{ filter, setFilter, order, setOrder, sortBy, setSortBy }}>{children}</FilterContext.Provider>;
}

export default FilterProvider;
