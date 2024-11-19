import style from "./ContactsList.module.css";
import { Link, useParams } from "react-router-dom";
import { ContactsListProps } from "../../../types/types";
import ContactCard from "../../Atoms/ContactCard/ContactCard";
import Button from "../../Atoms/Button/Button";
import { useEffect, useState } from "react";

const ChevronDownIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 512 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
	</svg>
);

const ChevronLeftIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 320 512'>
		{/* <!--!Font Awesome Free 6.7.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z' />
	</svg>
);

const ContactsList = (props: ContactsListProps) => {
	const { group } = useParams();
	const { title, contacts, listType, order } = props;
	const [showFavourites, setShowFavourites] = useState(true);

	useEffect(() => {
		if (title !== "FAVOURITES") {
			setShowFavourites(true);
		}
	}, [contacts]);

	return (
		<div className={style.contactsListContainer}>
			<div className={style.contactsListHeader}>
				<h2>{title}</h2>
				<Button
					type='button'
					label={showFavourites ? ChevronDownIcon : ChevronLeftIcon}
					onClick={() => setShowFavourites(!showFavourites)}
				/>
			</div>
			{showFavourites && (
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
