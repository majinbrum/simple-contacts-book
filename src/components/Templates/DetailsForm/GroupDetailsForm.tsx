// CSS
import style from "./DetailsForm.module.css";
// React
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// Radix UI components
import * as Form from "@radix-ui/react-form";
// Interfaces
import { GroupDetailsProps } from "../../../types/types";
// Supabase
import { supabaseUrl } from "../../../../supabase/supabaseClient";
import { createGroup, deleteGroupById, updateGroupById } from "../../../../supabase/groupsFunctions";
import { generateRandomAvatar } from "../../../../supabase/functions";
// Components
import FormAlertDialog from "../../Molecules/FormAlertDialog/FormAlertDialog";
import Button from "../../Atoms/Button/Button";
import Loader from "../../Atoms/Loader/Loader";
import ErrorBox from "../../Molecules/ErrorBox/ErrorBox";
// Assets
import { RepeatIcon } from "../../../assets/icons";

function GroupDetailsForm(props: GroupDetailsProps) {
	const { group } = props;
	const navigate = useNavigate();

	const [newGroup, setNewGroup] = useState(group);

	const [avatar, setAvatar] = useState(newGroup.avatar);
	const [tag, setTag] = useState(newGroup.tag);

	const [editMode, setEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>();

	const enterEditMode = (e: FormEvent) => {
		e.preventDefault();
		setEditMode(true);
	};

	const handleReset = () => {
		setAvatar(newGroup.avatar);
		setTag(newGroup.tag);
		setEditMode(false);
		console.log("reset");
	};

	const deleteGroup = async () => {
		try {
			setEditMode(false);
			const data = await deleteGroupById(group.id);
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
			const newAvatarPath = await generateRandomAvatar(newGroup.avatar);
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

	const submitGroup = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (validateForm(e)) {
			const tempNewGroup = { ...group, avatar, tag };
			setNewGroup(tempNewGroup);
			try {
				if (group.id) {
					const data = await updateGroupById(group.id, tempNewGroup);
					console.log(data);
				} else {
					const data = await createGroup(tempNewGroup);
					console.log(data);
				}
			} catch (error: any) {
				setError(error.message);
			} finally {
				setEditMode(false);
				setIsLoading(false);
				!group.id && navigate("/");
			}
		} else {
			setIsLoading(false);
		}
	};

	const formAlertDialogInfo = {
		triggerLabel: !group.id ? "Cancel" : "Delete",
		alertTitle: !group.id ? "Do you want to cancel this action?" : "Do you want to delete this group?",
		alertDescription: "This action cannot be undone. The contacts related to this group will lost their relationship to it.",
		actionButtonLabel: !group.id ? "Yes, cancel" : "Yes, delete group",
		actionButtonFunction: !group.id ? () => navigate("/") : deleteGroup,
	};

	if (error) return <ErrorBox message={error} />;
	if (isLoading) return <Loader />;

	return (
		<>
			<Form.Root className={style.formRoot}>
				<div className={style.contactAvatar}>
					<img
						src={`${supabaseUrl}/storage/v1/object/public/avatars/${avatar}`}
						alt={`${tag} Avatar`}
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
					</div>
					<div className={style.formInputContainer}>
						<Form.Label className={style.formLabel}>#Tag</Form.Label>
						<Form.Control asChild>
							<input
								className={style.input}
								type='text'
								value={tag}
								onChange={(e) => {
									setTag(e.target.value.trimStart());
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
									onClick={(e: FormEvent) => submitGroup(e)}
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
									onClick={!group.id ? (e: FormEvent) => submitGroup(e) : (e: FormEvent) => enterEditMode(e)}
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
