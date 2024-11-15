import { useParams } from "react-router-dom";
import style from "./Contact.module.css";
import ContactDetailsForm from "../../Templates/ContactDetailsForm/ContactDetailsForm";
import { useEffect, useState } from "react";
import { IContact } from "../../../types/databaseTypes";
import { readContactById } from "../../../../supabase/functions";
import Loader from "../../Atoms/Loader/Loader";

const defaultContact = {
	avatar: "avatars/avatar1.png",
	favourite: false,
};

const Contact = () => {
	const { id } = useParams();
	const [contact, setContact] = useState<IContact>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (id) {
			const getContactById = async () => {
				setIsLoading(true);
				const data = await readContactById(id);
				setContact(data);
				setIsLoading(false);
			};
			getContactById();
		} else {
			setContact(defaultContact as IContact);
		}
	}, []);

	if (isLoading || !contact) return <Loader />;

	return (
		<div className={style.contactContainer}>
			<ContactDetailsForm contact={contact} />
		</div>
	);
};

export default Contact;
