// CSS
import style from "./ContactsGroup.module.css";
// React
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// Components
import SearchBox from "../../Organisms/SearchBox/SearchBox";
import ContactsList from "../../Templates/ContactsList/ContactsList";
import Loader from "../../Atoms/Loader/Loader";
import ErrorBox from "../../Atoms/ErrorBox/ErrorBox";
// Context
import { FilterContext } from "../../../providers/FilterContext";
import { useSetGroupsContext } from "../../../providers/GroupsContext";
// Interfaces
import { IContact } from "../../../types/databaseTypes";
import { IFilteredContacts } from "../../../types/types";
// Supabase
import { readContacts } from "../../../../supabase/contactsFunctions";
// Assets
import { AddIcon, SearchIcon } from "../../../assets/icons";

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const ContactsGroup = () => {
	const { group } = useParams();
	const getGroups = useSetGroupsContext();
	const { filter, sortBy, order } = useContext(FilterContext);

	const [contacts, setContacts] = useState<IContact[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string>();
	const [filteredContacts, setFilteredContacts] = useState<IFilteredContacts | null>(null);

	const renderLists = (contacts: IContact[]) => {
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

	const getAndRenderContacts = async () => {
		if (!group) return;
		try {
			setIsLoading(true);
			const data = await readContacts(group, sortBy, order);
			setContacts(data);
			renderLists(data);
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
		setFilteredContacts(null);
		getAndRenderContacts();
	}, [group]);

	useEffect(() => {
		renderLists(contacts);
	}, [filter, sortBy, order]);

	if (error) return <ErrorBox message={error} />;
	if (isLoading || !filteredContacts) return <Loader />;

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
