// CSS
import style from "./DetailsForm.module.css";
// React
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// Radix UI components
import * as Form from "@radix-ui/react-form";
import * as Toggle from "@radix-ui/react-toggle";
// Interfaces
import { ContactDetailsProps } from "../../../types/types";
// Components
import FormAlertDialog from "../../Molecules/FormAlertDialog/FormAlertDialog";
import Button from "../../Atoms/Button/Button";
import ContactCard from "../../Atoms/ContactCard/ContactCard";
import Loader from "../../Atoms/Loader/Loader";
import InputSelect from "../../Atoms/InputSelect/InputSelect";
import ErrorBox from "../../Molecules/ErrorBox/ErrorBox";
// Supabase
import { supabaseUrl } from "../../../../supabase/supabaseClient";
import { createContact, deleteContactById, updateContactById } from "../../../../supabase/contactsFunctions";
import { generateRandomAvatar } from "../../../../supabase/functions";
// Context
import { useGroupsContext } from "../../../providers/GroupsContext";
// Assets
import { CopyIcon, EnvelopeIcon, FilledStarIcon, RepeatIcon, StarIcon } from "../../../assets/icons";

function ContactDetailsForm(props: ContactDetailsProps) {
	const groups = useGroupsContext();
	const navigate = useNavigate();
	const { contact } = props;

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

	const deleteContact = async () => {
		try {
			setEditMode(false);
			const data = await deleteContactById(contact.id);
			console.log(data);
		} catch (error: any) {
			setError(error.message);
		} finally {
			navigate("/");
		}
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

	const formAlertDialogInfo = {
		triggerLabel: !contact.id ? "Cancel" : "Delete",
		alertTitle: !contact.id ? "Do you want to cancel this action?" : "Do you want to delete this contact?",
		alertDescription: "This action cannot be undone. Are you sure you want to delete these informations permanently?",
		actionButtonLabel: !contact.id ? "Yes, cancel" : "Yes, delete contact",
		actionButtonFunction: !contact.id ? () => navigate("/") : deleteContact,
	};

	if (error) return <ErrorBox message={error} />;
	if (isLoading) return <Loader />;

	return (
		<>
			<ContactCard
				contact={{ ...newContact, avatar, name, surname, phone, email, tag, favourite }}
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
										onClick={() => navigator.clipboard.writeText(newContact.phone)}
										disabled={editMode}
									/>
								)}
								{field.name == "email" && (
									<a
										href={`mailto:${newContact.email}`}
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
									onClick={(e: FormEvent) => submitContact(e)}
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
									onClick={!contact.id ? (e: FormEvent) => submitContact(e) : (e: FormEvent) => enterEditMode(e)}
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
