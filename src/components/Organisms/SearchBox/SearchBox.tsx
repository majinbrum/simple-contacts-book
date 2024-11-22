// React
import { useContext } from "react";
// CSS
import style from "./SearchBox.module.css";
// Components
import InputText from "../../Atoms/InputText/InputText";
import InputSelect from "../../Atoms/InputSelect/InputSelect";
// Context
import { FilterContext } from "../../../providers/FilterContext";
// Assets
import { orderData, sortByData } from "../../../assets/sort";
import { SearchIcon } from "../../../assets/icons";

const SearchBox = () => {
	const { filter, setFilter, sortBy, setSortBy, order, setOrder } = useContext(FilterContext);

	return (
		<div className={style.searchBox}>
			<InputText
				name='filter'
				placeholder='Search contacts...'
				value={filter}
				setValue={setFilter}
				icon={SearchIcon}
			/>
			<div className={style.selectBox}>
				<InputSelect
					label='Sort by'
					name='sort'
					valuesObject={sortByData}
					value={sortBy}
					setValue={setSortBy}
				/>
				<InputSelect
					label='Order'
					name='order'
					valuesObject={orderData}
					value={order}
					setValue={setOrder}
				/>
			</div>
		</div>
	);
};

export default SearchBox;
