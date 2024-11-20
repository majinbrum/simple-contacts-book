import { useParams } from "react-router-dom";
import style from "./Contact.module.css";
import ContactDetailsForm from "../../Templates/DetailsForm/ContactDetailsForm";
import { useEffect, useState } from "react";
import { IContact } from "../../../types/databaseTypes";
import { readContactById } from "../../../../supabase/contactsFunctions";
import Loader from "../../Atoms/Loader/Loader";
import ErrorBox from "../../Molecules/ErrorBox/ErrorBox";

const defaultContact = {
	avatar: "avatars/avatar1.png",
	favourite: false,
};

const Contact = () => {
	const { id } = useParams();
	const [contact, setContact] = useState<IContact>(defaultContact as IContact);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>();

	const getContactById = async () => {
		if (!id) return;
		try {
			setIsLoading(true);
			const data = await readContactById(id);
			setContact(data);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (id) {
			getContactById();
		} else {
			setContact(defaultContact as IContact);
		}
	}, []);

	if (isLoading || (!contact && !error)) return <Loader />;

	if (error) return <ErrorBox message={error} />;

	return (
		<div className={style.contactContainer}>
			<ContactDetailsForm contact={contact} />
		</div>
	);
};

export default Contact;
