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
import { AddIcon, SearchIcon } from "../../../assets/icons";

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
