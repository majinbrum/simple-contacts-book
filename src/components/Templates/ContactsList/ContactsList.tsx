// CSS
import "./ContactsList.css";
// React
import { useState } from "react";
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
		<div className={"contacts__container"}>
			<div className={"contacts__list__header"}>
				<h2>{title}</h2>
				<Button
					type='button'
					label={showList ? ChevronDownIcon : ChevronLeftIcon}
					onClick={() => setShowList(!showList)}
				/>
			</div>
			{showList && (
				<div className={`${listType === "favourites" ? "contacts__list--favourites" : "contacts__list"} ${order == "descending" ? "order--reverse" : null} ${contacts.length < 2 && "single"}`}>
					{contacts.map((contact, i) => (
						<Link
							to={`/contacts/${group}/${contact.id}`}
							key={`${contact}${i}`}
							className={"card__container"}>
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
