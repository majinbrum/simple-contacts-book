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
import { CopyIcon, EnvelopeIcon, FilledStarIcon, RepeatIcon, StarIcon } from "../../../assets/icons";
import InputSelect from "../../Atoms/InputSelect/InputSelect";
import { useGroupsContext } from "../../../providers/GroupsContext";

function ContactDetailsForm(props: ContactDetailsProps) {
	const groups = useGroupsContext();
	const navigate = useNavigate();
	const { contact } = props;

	const [avatar, setAvatar] = useState(contact.avatar);
	const [name, setName] = useState(contact.name);
	const [surname, setSurname] = useState(contact.surname);
	const [phone, setPhone] = useState(contact.phone);
	const [email, setEmail] = useState(contact.email);
	const [tag, setTag] = useState(contact.tag ? contact.tag : "None");
	const [favourite, setFavourite] = useState(contact.favourite);

	const [newContact, setNewContact] = useState(contact);

	const [editMode, setEditMode] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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
		setAvatar(contact.avatar);
		setName(contact.name);
		setSurname(contact.surname);
		setPhone(contact.phone);
		setEmail(contact.email);
		setFavourite(contact.favourite);
		setTag(contact.tag || "None");
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
		const newAvatarPath = await generateRandomAvatar(avatar);
		setAvatar(newAvatarPath);
	};

	const validateForm = (e: FormEvent) => {
		const target = e.target as HTMLElement;
		const form = target.closest("form");

		if (form?.checkValidity()) {
			setNewContact({ ...contact, avatar, name, surname, phone, email, tag: tag === "None" ? null : tag, favourite });
			setIsFormValid(true);
			return true;
		} else {
			setIsFormValid(false);
			setIsLoading(false);
			return false;
		}
	};

	const updateContact = async (e: FormEvent) => {
		setIsLoading(true);
		console.log("click");
		e.preventDefault();
		const formValidation = validateForm(e);
		if (formValidation == true) {
			const data = await updateContactById(contact.id, newContact);
			console.log(data);
			setEditMode(false);
			setIsLoading(false);
		} else {
			return;
		}
	};

	const createNewContact = async (e: FormEvent) => {
		setIsLoading(true);
		e.preventDefault();
		validateForm(e);
		if (!isFormValid) {
			setIsLoading(false);
			return;
		} else {
			const data = await createContact(newContact);
			console.log(data);
			setEditMode(false);
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
				contact={{ ...contact, avatar, name, surname, phone, email, tag, favourite }}
				listType='alphabetical'
			/>
			<Form.Root className={style.formRoot}>
				<div className={style.contactAvatar}>
					<img
						src={`${supabaseUrl}/storage/v1/object/public/avatars/${avatar}`}
						alt={`${name} Avatar`}
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
						{editMode && (
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
						)}
						<div className={style.formInputContainer}>
							<Form.Label className={style.formLabel}>{field.label}</Form.Label>
							<div className={style.formControl}>
								<Form.Control asChild>
									<input
										className={style.input}
										type={field.type}
										value={field.value == null ? "" : field.value}
										onChange={(e) => {
											field.setValue(e.target.value.trimStart());
										}}
										pattern={field.pattern}
										disabled={!!contact.id && !editMode}
										placeholder={field.placeholder}
										required
									/>
								</Form.Control>
								{field.name == "phone" && (
									<Button
										type='button'
										label={CopyIcon}
										className={style.buttonLink}
										onClick={() => navigator.clipboard.writeText(contact.phone)}
										disabled={editMode}
									/>
								)}
								{field.name == "email" && (
									<a
										href={`mailto:${contact.email}`}
										target='_blank'
										className={`${style.buttonLink} ${editMode && style.buttonLinkDisabled}`}>
										{EnvelopeIcon}
									</a>
								)}
							</div>
						</div>
					</Form.Field>
				))}
				<Form.Field
					name='tag'
					className={style.formField}>
					<div className={`${style.formInputContainer} ${style.formInputSelect}`}>
						<Form.Label className={style.formLabel}>#Tag</Form.Label>
						<Form.Control asChild>
							<InputSelect
								name='tag'
								valuesGroups={groups}
								value={tag}
								setValue={setTag}
								disabled={!!contact.id && !editMode}
							/>
						</Form.Control>
					</div>
				</Form.Field>
				<Form.Field
					name='favourite'
					className={style.formField}>
					<div className={style.formInputContainer}>
						<Form.Label className={style.formLabel}>Favourite</Form.Label>
						<Form.Control asChild>
							<Toggle.Root
								className={style.toggle}
								aria-label='Toggle favourite'
								onClick={() => setFavourite(!favourite)}
								disabled={!!contact.id && !editMode}>
								{favourite ? FilledStarIcon : StarIcon}
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
