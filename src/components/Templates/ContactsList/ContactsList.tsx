// CSS
import style from "./ContactsList.module.css";
// React
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// Interfaces
import { ContactsListProps } from "../../../types/types";
// Components
import ContactCard from "../../Atoms/ContactCard/ContactCard";
import Button from "../../Atoms/Button/Button";
// Assets
import { ChevronDownIcon, ChevronLeftIcon } from "../../../assets/icons";

const ContactsList = (props: ContactsListProps) => {
	const { group } = useParams();
	const { title, contacts, listType, order } = props;
	const [showList, setShowList] = useState(true);

	return (
		<div className={style.contactsListContainer}>
			<div className={style.contactsListHeader}>
				<h2>{title}</h2>
				<Button
					type='button'
					label={showList ? ChevronDownIcon : ChevronLeftIcon}
					onClick={() => setShowList(!showList)}
				/>
			</div>
			{showList && (
				<div
					className={`${listType === "favourites" ? style.contactsFavouriteGrid : style.contactsList} ${order == "descending" ? style.contactsReverseOrder : null} ${
						contacts.length < 2 && style.oneItem
					}`}>
					{contacts.map((contact, i) => (
						<Link
							to={`/contacts/${group}/${contact.id}`}
							key={`${contact}${i}`}
							className={style.cardContainer}>
							<ContactCard
								key={contact.id}
								contact={contact}
								listType={listType}
							/>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default ContactsList;
