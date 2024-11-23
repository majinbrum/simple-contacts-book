// CSS
import "./Contact.css";
// React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Components
import ContactDetailsForm from "../../Templates/DetailsForm/ContactDetailsForm";
import Loader from "../../Atoms/Loader/Loader";
import ErrorBox from "../../Atoms/ErrorBox/ErrorBox";
// Interfaces
import { IContact } from "../../../types/databaseTypes";
// Supabase
import { readContactById } from "../../../../supabase/contactsFunctions";

const defaultContact = {
	avatar: "avatars/avatar1.png",
	favourite: false,
	tag: null,
};

const Contact = () => {
	const { id } = useParams();
	const [contact, setContact] = useState<IContact | null>(null);
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

	if (error) return <ErrorBox message={error} />;
	if (isLoading || !contact) return <Loader />;

	return (
		<div className={"contact__container"}>
			<ContactDetailsForm contact={contact} />
		</div>
	);
};

export default Contact;
