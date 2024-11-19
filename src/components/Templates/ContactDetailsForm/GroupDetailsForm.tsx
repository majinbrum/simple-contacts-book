import * as Form from "@radix-ui/react-form";
import { GroupDetailsProps } from "../../../types/types";
import style from "./DetailsForm.module.css";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAlertDialog from "../../Molecules/FormAlertDialog/FormAlertDialog";
import Button from "../../Atoms/Button/Button";

import { supabaseUrl } from "../../../../supabase/supabaseClient";
import Loader from "../../Atoms/Loader/Loader";
import { createGroup, deleteGroupById, updateGroupById } from "../../../../supabase/groupsFunctions";
import { generateRandomAvatar } from "../../../../supabase/functions";
import { RepeatIcon } from "../../../assets/icons";

function GroupDetailsForm(props: GroupDetailsProps) {
	const { group } = props;
	const navigate = useNavigate();

	const [editMode, setEditMode] = useState(false);
	const [newGroup, setNewGroup] = useState(group);
	const [isFormValid, setIsFormValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const enterEditMode = (e: FormEvent) => {
		e.preventDefault();
		setEditMode(true);
	};

	const handleReset = () => {
		setNewGroup(group);
		setEditMode(false);
		console.log("reset");
	};

	const deleteGroup = async () => {
		setEditMode(false);
		const data = await deleteGroupById(group.id);
		console.log(data);
		navigate("/");
	};

	const generateNewAvatar = async (e: FormEvent) => {
		e.preventDefault();
		const newAvatarPath = await generateRandomAvatar(newGroup.avatar);
		setNewGroup({ ...newGroup, avatar: newAvatarPath });
	};

	const validateForm = (e: FormEvent) => {
		const target = e.target as HTMLElement;
		const form = target.closest("form");
		setIsFormValid(form?.checkValidity() ? true : false);
	};

	const updateGroup = async (e: FormEvent) => {
		setIsLoading(true);
		e.preventDefault();
		if (!isFormValid) {
			validateForm(e);
			setIsLoading(false);
			return;
		} else {
			setEditMode(false);
			const data = await updateGroupById(group.id, newGroup);
			console.log(data);
			setIsLoading(false);
		}
	};

	const createNewGroup = async (e: FormEvent) => {
		setIsLoading(true);
		e.preventDefault();
		if (!isFormValid) {
			validateForm(e);
			setIsLoading(false);
			return;
		} else {
			const data = await createGroup(newGroup);
			console.log(data);
			setIsLoading(false);
			navigate("/");
		}
	};

	const formAlertDialogInfo = {
		triggerLabel: !group.id ? "Cancel" : "Delete",
		alertTitle: !group.id ? "Do you want to cancel this action?" : "Do you want to delete this group?",
		alertDescription: "This action cannot be undone. The contacts related to this group will lost their relationship to it.",
		actionButtonLabel: !group.id ? "Yes, cancel" : "Yes, delete group",
		actionButtonFunction: !group.id ? () => navigate("/") : deleteGroup,
	};

	if (isLoading) return <Loader />;

	return (
		<>
			<Form.Root className={style.formRoot}>
				<div className={style.contactAvatar}>
					<img
						src={`${supabaseUrl}/storage/v1/object/public/avatars/${newGroup.avatar}`}
						alt={`${newGroup.tag} Avatar`}
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
								disabled={!!group.id && !editMode}
								label={RepeatIcon}
							/>
						</Form.Control>
					</div>
				</Form.Field>

				<Form.Field
					name='tag'
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
						<Form.Label className={style.formLabel}>Tag</Form.Label>
						<Form.Control asChild>
							<input
								className={style.input}
								type='text'
								value={newGroup.tag}
								onChange={(e) => {
									setNewGroup({ ...newGroup, tag: e.target.value.trimStart() });
								}}
								disabled={!!group.id && !editMode}
								placeholder='family'
								required
							/>
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
									onClick={(e: FormEvent) => updateGroup(e)}
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
									type={!group.id ? "submit" : "button"}
									className={style.formPrimaryButton}
									onClick={!group.id ? (e: FormEvent) => createNewGroup(e) : (e: FormEvent) => enterEditMode(e)}
									label={!group.id ? "Create" : "Edit"}
								/>
							</Form.Submit>
						</>
					)}
				</div>
			</Form.Root>
		</>
	);
}

export default GroupDetailsForm;
