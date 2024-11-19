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

const RepeatIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 512 512'>
		{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
		<path d='M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z' />
	</svg>
);

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
