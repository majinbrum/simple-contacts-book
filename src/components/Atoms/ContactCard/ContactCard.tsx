// CSS
import style from "./ContactCard.module.css";
// Interface
import { ContactCardProps } from "../../../types/types";
// Supabase
import { supabaseUrl } from "../../../../supabase/supabaseClient";

const ContactCard = (props: ContactCardProps) => {
	const { contact, listType } = props;

	return (
		<div className={listType === "favourites" ? style.favouriteContactCard : style.contactCard}>
			<div className={style.contactName}>
				<span>{contact.name || "Name"} </span>
				<span>{contact.surname || "Surname"}</span>
			</div>
			<div className={style.contactAvatar}>
				<img
					src={`${supabaseUrl}/storage/v1/object/public/avatars/${contact.avatar}`}
					alt={`${contact.name} Avatar`}
					loading='lazy'
				/>
			</div>
		</div>
	);
};

export default ContactCard;
