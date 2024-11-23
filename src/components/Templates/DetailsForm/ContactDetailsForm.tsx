// CSS
import "./DetailsForm.css";
// React
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// Radix UI components
import * as Form from "@radix-ui/react-form";
// Interfaces
import { ContactDetailsProps } from "../../../types/types";
// Components
import ContactCard from "../../Atoms/ContactCard/ContactCard";
import Loader from "../../Atoms/Loader/Loader";
import ErrorBox from "../../Atoms/ErrorBox/ErrorBox";
import FormActions from "../../Organisms/FormActions/FormActions";
import FormTextFields from "../../Molecules/FormTextFields/FormTextFields";
import FormAvatarField from "../../Molecules/FormAvatarField/FormAvatarField";
import FormTagField from "../../Organisms/FormTagField/FormTagField";
import FormFavouriteField from "../../Molecules/FormFavouriteField/FormFavouriteField";
// Supabase
import { supabaseUrl } from "../../../../supabase/supabaseClient";
import { createContact, updateContactById } from "../../../../supabase/contactsFunctions";
import { generateRandomAvatar } from "../../../../supabase/functions";

function ContactDetailsForm(props: ContactDetailsProps) {
	const { contact } = props;
	const navigate = useNavigate();

	const [newContact, setNewContact] = useState(contact);

	const [avatar, setAvatar] = useState(newContact.avatar);
	const [name, setName] = useState(newContact.name);
	const [surname, setSurname] = useState(newContact.surname);
	const [phone, setPhone] = useState(newContact.phone);
	const [email, setEmail] = useState(newContact.email);
	const [tag, setTag] = useState(newContact.tag || "None");
	const [favourite, setFavourite] = useState(newContact.favourite);

	const [editMode, setEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>();

	const formFields = [
		{ name: "name", label: "Name", value: name, setValue: setName, type: "text", placeholder: "Bruna" },
		{ name: "surname", label: "Surname", value: surname, setValue: setSurname, type: "text", placeholder: "Alamia" },
		{ name: "phone", label: "Phone", value: phone, setValue: setPhone, type: "tel", placeholder: "+39 320-612-0091", pattern: "[0-9+\\-*#]+" },
		{ name: "email", label: "Email", value: email, setValue: setEmail, type: "email", placeholder: "brunaalamia@gmail.com" },
	];

	const enterEditMode = (e: FormEvent) => {
		e.preventDefault();
		setEditMode(true);
	};

	const handleReset = () => {
		setAvatar(newContact.avatar);
		setName(newContact.name);
		setSurname(newContact.surname);
		setPhone(newContact.phone);
		setEmail(newContact.email);
		setFavourite(newContact.favourite);
		setTag(newContact.tag || "None");
		setEditMode(false);
		console.log("reset");
	};

	const generateNewAvatar = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const newAvatarPath = await generateRandomAvatar(newContact.avatar);
			setAvatar(newAvatarPath);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const validateForm = (e: FormEvent) => {
		const target = e.target as HTMLElement;
		const form = target.closest("form");
		if (form?.checkValidity()) {
			return true;
		} else {
			return false;
		}
	};

	const submitContact = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (validateForm(e)) {
			const tempNewContact = { ...contact, avatar, name, surname, phone, email, tag: tag === "None" ? null : tag, favourite };
			setNewContact(tempNewContact);
			try {
				if (contact.id) {
					const data = await updateContactById(contact.id, tempNewContact);
					console.log(data);
				} else {
					const data = await createContact(tempNewContact);
					console.log(data);
				}
			} catch (error: any) {
				setError(error.message);
			} finally {
				setEditMode(false);
				setIsLoading(false);
				!contact.id && navigate("/");
			}
		} else {
			setIsLoading(false);
		}
	};

	if (error) return <ErrorBox message={error} />;
	if (isLoading) return <Loader />;

	return (
		<>
			<ContactCard
				contact={{ ...newContact, avatar, name, surname, phone, email, tag, favourite }}
				listType='alphabetical'
			/>
			<Form.Root className={"form"}>
				<div className={"form__avatar"}>
					<img
						src={`${supabaseUrl}/storage/v1/object/public/avatars/${avatar}`}
						alt={`${name} Avatar`}
						loading='lazy'
					/>
				</div>
				<FormAvatarField
					onClick={(e) => generateNewAvatar(e)}
					disabled={!!contact.id && !editMode}
				/>
				<FormTextFields
					editMode={editMode}
					formFields={formFields}
					disabled={!!contact.id && !editMode}
				/>
				<FormTagField
					form='contact'
					tag={tag}
					setTag={setTag}
					disabled={!!contact.id && !editMode}
				/>
				<FormFavouriteField
					onClick={() => setFavourite(!favourite)}
					disabled={!!contact.id && !editMode}
					favourite={favourite}
				/>
				<FormActions
					editMode={editMode}
					handleReset={handleReset}
					submitContact={submitContact}
					id={contact.id}
					enterEditMode={enterEditMode}
					setEditMode={setEditMode}
					setError={setError}
				/>
			</Form.Root>
		</>
	);
}

export default ContactDetailsForm;
