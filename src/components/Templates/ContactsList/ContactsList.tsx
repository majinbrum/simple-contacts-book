import style from "./ContactsList.module.css";
import { Link, useParams } from "react-router-dom";
import { ContactsListProps } from "../../../types/types";
import ContactCard from "../../Atoms/ContactCard/ContactCard";
const ContactsList = (props: ContactsListProps) => {
	const { group } = useParams();

	const { title, contacts, listType, order } = props;

	return (
		<div className={style.contactsListContainer}>
			<h2>{title}</h2>
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
		</div>
	);
};

export default ContactsList;
