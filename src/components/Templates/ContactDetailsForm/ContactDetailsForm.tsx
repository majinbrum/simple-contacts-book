import * as Form from "@radix-ui/react-form";
import * as Toggle from "@radix-ui/react-toggle";

import { ContactDetailsProps } from "../../../types/types";
import style from "./ContactDetailsForm.module.css";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAlertDialog from "../../Molecules/FormAlertDialog/FormAlertDialog";
import Button from "../../Atoms/Button/Button";
import { createContact, deleteContactById, generateRandomAvatar, updateContactById } from "../../../../supabase/functions";
import { supabaseUrl } from "../../../../supabase/supabaseClient";
import ContactCard from "../../Atoms/ContactCard/ContactCard";
import Loader from "../../Atoms/Loader/Loader";

const StarIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 576 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z' />
	</svg>
);

const FilledStarIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 576 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z' />
	</svg>
);

const RepeatIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 512 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z' />
	</svg>
);

function ContactDetailsForm(props: ContactDetailsProps) {
	const { contact } = props;
	const navigate = useNavigate();

	const [editMode, setEditMode] = useState(false);
	const [newContact, setNewContact] = useState(contact);
	const [isFormValid, setIsFormValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const formFields = [
		{ name: "name", label: "Name", value: newContact.name, type: "text", placeholder: "Bruna" },
		{ name: "surname", label: "Surname", value: newContact.surname, type: "text", placeholder: "Alamia" },
		{ name: "phone", label: "Phone", value: newContact.phone, type: "tel", placeholder: "+39 320-612-0091" },
		{ name: "email", label: "Email", value: newContact.email, type: "email", placeholder: "brunaalamia@gmail.com" },
		{ name: "tag", label: "Tag", value: newContact.tag, type: "text", placeholder: "family" },
	];

	const enterEditMode = (e: FormEvent) => {
		e.preventDefault();
		setEditMode(true);
	};

	const handleReset = () => {
		setNewContact(contact);
		setEditMode(false);
		console.log("reset");
	};

	const deleteContact = async () => {
		setEditMode(false);
		const data = await deleteContactById(contact.id);
		console.log(data);
		navigate("/");
	};

	const generateNewAvatar = async (e: FormEvent) => {
		e.preventDefault();
		const newAvatarPath = await generateRandomAvatar(newContact.avatar);
		setNewContact({ ...newContact, avatar: newAvatarPath });
	};

	const validateForm = (e: FormEvent) => {
		const target = e.target as HTMLElement;
		const form = target.closest("form");
		setIsFormValid(form?.checkValidity() ? true : false);
	};

	const updateContact = async (e: FormEvent) => {
		setIsLoading(true);
		e.preventDefault();
		if (!isFormValid) {
			validateForm(e);
			setIsLoading(false);
			return;
		} else {
			setEditMode(false);
			const data = await updateContactById(contact.id, newContact);
			console.log(data);
			setIsLoading(false);
		}
	};

	const createNewContact = async (e: FormEvent) => {
		setIsLoading(true);
		e.preventDefault();
		if (!isFormValid) {
			validateForm(e);
			setIsLoading(false);
			return;
		} else {
			const data = await createContact(newContact);
			console.log(data);
			setIsLoading(false);
			navigate("/");
		}
	};

	const formAlertDialogInfo = {
		triggerLabel: !contact.id ? "Cancel" : "Delete",
		alertTitle: !contact.id ? "Do you want to cancel this action?" : "Do you want to delete this contact?",
		alertDescription: "This action cannot be undone. Are you sure you want to delete these informations permanently?",
		actionButtonLabel: !contact.id ? "Yes, cancel" : "Yes, delete contact",
		actionButtonFunction: !contact.id ? () => navigate("/") : deleteContact,
	};

	if (isLoading) return <Loader />;

	return (
		<>
			<ContactCard
				contact={newContact}
				listType='alphabetical'
			/>
			<Form.Root className={style.formRoot}>
				<div className={style.contactAvatar}>
					<img
						src={`${supabaseUrl}/storage/v1/object/public/avatars/${newContact.avatar}`}
						alt={`${newContact.name} Avatar`}
						loading='lazy'
					/>
				</div>
				<Form.Field
					name='avatar'
					className={style.formField}>
					<div className={style.formInputContainer}>
						<Form.Label className={style.formLabel}>Avatar</Form.Label>
						<Form.Control asChild>
							<Button
								type='button'
								className={style.toggle}
								onClick={(e) => generateNewAvatar(e)}
								disabled={!!contact.id && !editMode}
								label={RepeatIcon}
							/>
						</Form.Control>
					</div>
				</Form.Field>
				{formFields.map((field, i) => (
					<Form.Field
						key={i}
						name={field.name}
						className={style.formField}>
						<div className={style.formMessagesContainer}>
							<Form.Message
								className={style.formMessage}
								match='valueMissing'>
								This field cannot be empty.
							</Form.Message>
							<Form.Message
								className={style.formMessage}
								match={"typeMismatch"}>
								Please provide a valid email.
							</Form.Message>
							<Form.Message
								className={style.formMessage}
								match={"patternMismatch"}>
								The phone number can only contain numbers and symbols.
							</Form.Message>
						</div>
						<div className={style.formInputContainer}>
							<Form.Label className={style.formLabel}>{field.label}</Form.Label>
							<Form.Control asChild>
								<input
									className={style.input}
									type={field.type}
									value={field.value}
									onChange={(e) => {
										setNewContact({ ...newContact, [field.name]: e.target.value.trimStart() });
									}}
									disabled={!!contact.id && !editMode}
									pattern={field.name === "phone" ? "[0-9+*#]*" : undefined}
									placeholder={field.placeholder}
									required
								/>
							</Form.Control>
						</div>
					</Form.Field>
				))}
				<Form.Field
					name='favourite'
					className={style.formField}>
					<div className={style.formInputContainer}>
						<Form.Label className={style.formLabel}>Favourite</Form.Label>
						<Form.Control asChild>
							<Toggle.Root
								className={style.toggle}
								aria-label='Toggle favourite'
								onClick={(e) => setNewContact({ ...newContact, favourite: e.currentTarget.dataset.state === "off" ? false : true })}
								disabled={!!contact.id && !editMode}>
								{newContact.favourite ? FilledStarIcon : StarIcon}
							</Toggle.Root>
						</Form.Control>
					</div>
				</Form.Field>

				<div className={style.formButtons}>
					{editMode ? (
						<>
							<Button
								type='button'
								onClick={handleReset}
								label='Cancel'
							/>
							<Form.Submit asChild>
								<Button
									type='submit'
									className={style.editPrimaryButton}
									onClick={(e: FormEvent) => updateContact(e)}
									label='Save'
								/>
							</Form.Submit>
						</>
					) : (
						<>
							<FormAlertDialog
								triggerLabel={formAlertDialogInfo.triggerLabel}
								alertTitle={formAlertDialogInfo.alertTitle}
								alertDescription={formAlertDialogInfo.alertDescription}
								actionButtonLabel={formAlertDialogInfo.actionButtonLabel}
								actionButtonFunction={formAlertDialogInfo.actionButtonFunction}
							/>
							<Form.Submit asChild>
								<Button
									type={!contact.id ? "submit" : "button"}
									className={style.formPrimaryButton}
									onClick={!contact.id ? (e: FormEvent) => createNewContact(e) : (e: FormEvent) => enterEditMode(e)}
									label={!contact.id ? "Create" : "Edit"}
								/>
							</Form.Submit>
						</>
					)}
				</div>
			</Form.Root>
		</>
	);
}

export default ContactDetailsForm;
