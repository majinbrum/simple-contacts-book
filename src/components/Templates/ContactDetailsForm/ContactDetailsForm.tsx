import * as Form from "@radix-ui/react-form";
import * as Toggle from "@radix-ui/react-toggle";

import { ContactDetailsProps } from "../../../types/types";
import style from "./DetailsForm.module.css";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAlertDialog from "../../Molecules/FormAlertDialog/FormAlertDialog";
import Button from "../../Atoms/Button/Button";
import { createContact, deleteContactById, updateContactById } from "../../../../supabase/contactsFunctions";
import { supabaseUrl } from "../../../../supabase/supabaseClient";
import ContactCard from "../../Atoms/ContactCard/ContactCard";
import Loader from "../../Atoms/Loader/Loader";
import { generateRandomAvatar } from "../../../../supabase/functions";
import { FilledStarIcon, RepeatIcon, StarIcon } from "../../../assets/icons";

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
									value={field.value || ""}
									onChange={(e) => {
										setNewContact({ ...newContact, [field.name]: field.name == "tag" ? e.target.value.trim().replace(/ /g, "") : e.target.value.trimStart() });
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
