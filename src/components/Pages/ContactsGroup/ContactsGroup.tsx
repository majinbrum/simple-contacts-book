import { Link, useParams } from "react-router-dom";
import style from "./ContactsGroup.module.css";
import SearchBox from "../../Organisms/SearchBox/SearchBox";
import ContactsList from "../../Templates/ContactsList/ContactsList";
import { useOrderContext } from "../../../providers/OrderContext";
import { useEffect, useState } from "react";
import { useFilterContext } from "../../../providers/FilterContext";
import { useContactsContext, useSetContactsContext } from "../../../providers/ContactsContext";
import { useSortByContext } from "../../../providers/SortByContext";
import Loader from "../../Atoms/Loader/Loader";
import { IFilteredContacts } from "../../../types/types";
import { readContacts } from "../../../../supabase/contactsFunctions";

const SearchIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 512 512'>
		{/* <!--!Font Awesome Free 6.7.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
	</svg>
);

const AddIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 448 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z' />
	</svg>
);

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const ContactsGroup = () => {
	const { group } = useParams();
	const setContacts = useSetContactsContext();
	const contacts = useContactsContext();
	const filter = useFilterContext();
	const sortBy = useSortByContext();
	const order = useOrderContext();

	const [isLoading, setIsLoading] = useState(false);
	const [filteredContacts, setFilteredContacts] = useState<IFilteredContacts>();

	const renderLists = () => {
		const temp: IFilteredContacts = {};

		temp["FAVOURITES"] = [];
		alphabet.forEach((letter) => (temp[letter] = []));
		temp["#"] = [];

		contacts
			.filter((contact) => (contact.name + " " + contact.surname + " " + contact.email + " " + contact.phone).toLowerCase().includes(filter))
			.map((contact) => {
				const firstLetter = (contact[sortBy as keyof typeof contact] as string)[0].toUpperCase();
				if (contact.favourite) {
					temp["FAVOURITES"].push(contact);
				}
				if (alphabet.includes(firstLetter)) {
					temp[firstLetter].push(contact);
				} else {
					temp["#"].push(contact);
				}
			});

		setFilteredContacts(temp);
	};

	const getContacts = async () => {
		if (group) {
			setIsLoading(true);
			setContacts(await readContacts(group, sortBy, order));
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getContacts();
	}, [group]);

	useEffect(() => {
		renderLists();
	}, [contacts, filter, sortBy, order]);

	if (!filteredContacts || isLoading) return <Loader />;

	return (
		<>
			<SearchBox />
			<h2>#{group?.toUpperCase()} CONTACTS</h2>
			{contacts.length === 0 && (
				<>
					<div className={style.noContactsContainer}>
						<p>There are no contacts in this group yet.</p>
						<div>
							<Link
								className={style.addLink}
								to={"/contacts/add"}>
								<span>{AddIcon}</span>
								New contact
							</Link>
							<Link
								className={style.addLink}
								to={"/contacts/all"}>
								<span>{SearchIcon}</span>
								Search contact
							</Link>
						</div>
					</div>
				</>
			)}
			{filteredContacts["FAVOURITES"].length > 0 && (
				<ContactsList
					title={"FAVOURITES"}
					contacts={filteredContacts["FAVOURITES"]}
					listType='favourites'
				/>
			)}

			<div className={`${style.listsContainer} ${order == "descending" ? style.reverse : null}`}>
				{alphabet.map(
					(letter, i) =>
						filteredContacts[letter].length > 0 && (
							<ContactsList
								key={`list${i}`}
								title={letter}
								contacts={filteredContacts[letter]}
								listType='alphabetical'
								order={order}
							/>
						)
				)}

				{filteredContacts["#"].length > 0 && (
					<ContactsList
						title={"#"}
						contacts={filteredContacts["#"]}
						listType='othersList'
					/>
				)}
			</div>
		</>
	);
};

export default ContactsGroup;
