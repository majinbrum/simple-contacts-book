import InputText from "../../Atoms/InputText/InputText";
import style from "./SearchBox.module.css";
import InputSelect from "../../Atoms/InputSelect/InputSelect";
import { orderData, sortByData } from "../../../assets/sort";
import { useFilterContext, useSetFilterContext } from "../../../providers/FilterContext";
import { useSetSortByContext, useSortByContext } from "../../../providers/SortByContext";
import { useOrderContext, useSetOrderContext } from "../../../providers/OrderContext";

const SearchIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 512 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
	</svg>
);

const SearchBox = () => {
	const filter = useFilterContext();
	const setFilter = useSetFilterContext();
	const sortBy = useSortByContext();
	const setSortBy = useSetSortByContext();
	const order = useOrderContext();
	const setOrder = useSetOrderContext();

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
