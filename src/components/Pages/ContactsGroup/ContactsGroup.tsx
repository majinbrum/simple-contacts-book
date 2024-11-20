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
import ErrorBox from "../../Molecules/ErrorBox/ErrorBox";
import { useGroupsContext, useSetGroupsContext } from "../../../providers/GroupsContext";

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const defaultFilteredContacts = {
	contacts: [],
};

const ContactsGroup = () => {
	const { group } = useParams();
	const setContacts = useSetContactsContext();
	const groups = useGroupsContext();
	const getGroups = useSetGroupsContext();
	const contacts = useContactsContext();
	const filter = useFilterContext();
	const sortBy = useSortByContext();
	const order = useOrderContext();

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string>();
	const [filteredContacts, setFilteredContacts] = useState<IFilteredContacts>(defaultFilteredContacts);

	const getContacts = async () => {
		if (!group) return;
		try {
			setIsLoading(true);
			const data = await readContacts(group, sortBy, order);
			setContacts(data);
		} catch (error: any) {
			setError(error.message);
			console.dir(error);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		const data = getGroups();
		if (typeof data === "string") {
			setError(data);
		} else {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		console.log(groups);
		console.log(group);
	}, [groups]);

	useEffect(() => {
		setIsLoading(true);
		getContacts();
		setIsLoading(false);
	}, [group]);

	const renderLists = () => {
		setIsLoading(true);
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
		setIsLoading(false);
	};

	useEffect(() => {
		renderLists();
	}, [contacts, filter, sortBy, order]);

	if (isLoading) return <Loader />;

	if (error) return <ErrorBox message={error} />;

	return (
		<>
			<SearchBox />
			<h2>#{group?.toUpperCase()} CONTACTS</h2>
			{!error && contacts.length === 0 && (
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
